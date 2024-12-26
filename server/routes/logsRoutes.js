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
 * API endpoint to retrieve the latest logs.
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

export default router;
