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
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const envPath = path.join(__dirname, '../.env');

/**
 * Return the current auth status.
 * @param {Object} req - The request object.
 * @param {Boolean} res - The response object.
 */
router.get("/auth-status", (req, res) => {
  res.json({ is_auth, qr_code });
});

/**
 * Get the GROQ_API_KEY and BING_IMAGE_COOKIE fields from the .env file.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send feedback.
 */
router.get("/get-env", (req, res) => {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  const { GROQ_API_KEY, BING_IMAGE_COOKIE } = envConfig;

  res.json({ GROQ_API_KEY, BING_IMAGE_COOKIE });
});

/**
 * Overwrite the GROQ_API_KEY and BING_IMAGE_COOKIE fields in the .env file.
 * @param {Object} req - The request object containing the new values.
 * @param {Object} res - The response object to send feedback.
 */
router.post("/update-env", (req, res) => {
  const { GROQ_API_KEY, BING_IMAGE_COOKIE } = req.body;
  const envConfig = dotenv.parse(fs.readFileSync(envPath));

  envConfig.GROQ_API_KEY = GROQ_API_KEY;
  envConfig.BING_IMAGE_COOKIE = BING_IMAGE_COOKIE;

  const updatedEnv = Object.entries(envConfig)
    .map(([key, value]) => `${key}=\"${value}\"`)
    .join('\n');

  fs.writeFileSync(envPath, updatedEnv);

  res.send("Environment variables updated successfully.");
});

export default router;