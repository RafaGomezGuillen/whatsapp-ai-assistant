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
import lodash from "lodash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, "../server/config.json");
const router = express.Router();

/**
 * API endpoint to return configuration fields as JSON.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get("/current-config", (req, res) => {
  try {
    res.json(global.config);
  } catch (error) {
    console.error("Error retrieving config:", error);
    res.status(500).json({ error: "Failed to retrieve configuration" });
  }
});

/**
 * Handle form submission and update the configuration.
 * @param {Object} req - The request object containing form data.
 * @param {Object} res - The response object to send feedback.
 */
router.post("/save-config", (req, res) => {
  try {
    const newFields = req.body;
    const updatedConfig = lodash.merge({}, global.config, newFields);

    saveConfig(updatedConfig);
  } catch (error) {
    console.error("Error handling POST /save-config:", error);
    res.status(500).send("Error saving configuration.");
  }
});


/**
 * Save the updated configuration back to the JSON file.
 * @param {Object} newConfig - The new configuration object to save.
 */
function saveConfig(newConfig) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), "utf-8");
    config = newConfig;
  } catch (error) {
    console.error("Error saving config:", error);
  }
}

export default router;
