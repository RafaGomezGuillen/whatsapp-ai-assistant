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

// Import routes
import authRoutes from "../routes/authRoutes.js";
import configRoutes from "../routes/configRoutes.js";
import logsRoutes from "../routes/logsRoutes.js";

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

// Load the initial config
loadConfig();

// Use the routes
app.use(authRoutes);
app.use(configRoutes);
app.use(logsRoutes);

const port = global.config.server_port || 3000;

app.listen(port, () => {
  console.log(`Admin server running at http://localhost:${port}`);
});
