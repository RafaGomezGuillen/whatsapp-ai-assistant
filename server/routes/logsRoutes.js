/*
Copyright (C) 2024 Rafael Gómez

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

/**
 * API endpoint to retrieve the latest log message.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get("/stream-logs", (req, res) => {
  const logFilePath = path.join(__dirname, "../logger/logs/combined.log");

  fs.readFile(logFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading log file:", err);
      return res.status(500).json({ error: "Failed to retrieve logs." });
    }

    const logs = data
      .split("\n")
      .filter((line) => line) // Remove empty lines
      .map((line) => JSON.parse(line)); // Parse JSON logs if stored in JSON format

    res.json(logs);
  });
});

router.get("/logs", (req, res) => {
  const logFilePath = path.join(__dirname, "../logger/logs/combined.log");
  const {
    page = 1,
    limit = 10,
    level,
    startTime,
    endTime,
    order = "asc",
  } = req.query;

  fs.readFile(logFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading log file:", err);
      return res.status(500).json({ error: "Failed to retrieve logs." });
    }

    try {
      const logs = data
        .split("\n")
        .filter((line) => line) // Remove empty lines
        .map((line) => JSON.parse(line)); // Parse JSON logs if stored in JSON format

      // Filter logs by level
      let filteredLogs = logs;
      if (level) {
        filteredLogs = filteredLogs.filter((log) => log.level === level);
      }

      // Filter logs by timestamp
      if (startTime) {
        const start = new Date(startTime).getTime();
        filteredLogs = filteredLogs.filter(
          (log) => new Date(log.timestamp).getTime() >= start
        );
      }

      if (endTime) {
        const end = new Date(endTime).getTime();
        filteredLogs = filteredLogs.filter(
          (log) => new Date(log.timestamp).getTime() <= end
        );
      }

      // Sort logs by creation date
      filteredLogs.sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return order === "desc" ? dateB - dateA : dateA - dateB;
      });

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit, 10);
      const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

      res.json({
        totalLogs: filteredLogs.length,
        totalPages: Math.ceil(filteredLogs.length / limit),
        currentPage: parseInt(page, 10),
        pageSize: parseInt(limit, 10),
        logs: paginatedLogs,
      });
    } catch (parseError) {
      console.error("Error parsing log file:", parseError);
      return res.status(500).json({ error: "Failed to parse log file." });
    }
  });
});

export default router;
