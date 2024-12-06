/*
Copyright (C) 2024 Miguel Álvarez

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
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";
import { exec } from 'child_process';
import lodash from "lodash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, "config.json");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());

global.config = {};
global.qr_code = "";
global.is_auth = false;

/**
 * Load configuration from a JSON file.
 */
function loadConfig() {
  try {
    const data = fs.readFileSync(configPath, "utf-8");
    config = JSON.parse(data);
  } catch (error) {
    console.error("Error loading config:", error);
    config = {};
  }
}

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

// Load the initial config
loadConfig();

/**
 * Serve the HTML form to edit specific config parameters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/", (req, res) => {
  res.render("form", { config, qr_code, is_auth });
});

/**
 * API endpoint to return configuration fields as JSON.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/current-config", (req, res) => {
  try {
    res.json(config);
  } catch (error) {
    console.error("Error retrieving config:", error);
    res.status(500).json({ error: "Failed to retrieve configuration" });
  }
});

/**
 * Return the current auth status.
 * @param {Object} req - The request object.
 * @param {Boolean} res - The response object.
 */
app.get("/auth-status", (req, res) => {
  res.json({ is_auth, qr_code });
});

/**
 * Handle form submission and update the configuration.
 * @param {Object} req - The request object containing form data.
 * @param {Object} res - The response object to send feedback.
 */
app.post("/save-config", (req, res) => {
  try {
    const newFields = req.body;
    const updatedConfig = lodash.merge({}, config, newFields);
    saveConfig(updatedConfig);
    res.send('Configuration updated successfully! <a href="/">Go Back</a>');
  } catch (error) {
    console.error("Error handling POST /save-config:", error);
    res.status(500).send("Error saving configuration.");
  }
});

/**
 * Execute the clean.sh file.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send feedback.
 */
app.post("/logout", (req, res) => {
  exec('sh clean.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing clean.sh: ${error}`);
      return res.status(500).send(`Error executing clean.sh: ${error}`);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
    res.send("clean.sh executed successfully.");
  });
});

const port = global.config.server_port || 3000;
app.listen(port, () => {
  logger.info(`Admin server running at http://localhost:${port}`);
});
