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

// Import services
import { chatSimulator } from "../index.js";

const router = express.Router();

/**
 * Simulate a chat interaction and return responses.
 * @param {Object} req - The request object containing user input.
 * @param {Object} res - The response object.
 */
router.post("/simulate-chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const response = await chatSimulator.simulateMessage(message);

    // Check if the response contains audio
    if (response.audioPath) {
      return res.download(response.audioPath);
    }

    // Send the regular JSON response
    res.json(response);
  } catch (error) {
    console.error("Error processing simulated message:", error);
    res.status(500).json({
      error: "An error occurred while processing the message.",
    });
  }
});

export default router;
