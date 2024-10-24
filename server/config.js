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

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, 'config.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

global.config = {};
global.qr_code = "";
global.is_auth = false;
/**
 * Load configuration from a JSON file.
 */
function loadConfig() {
    try {
        const data = fs.readFileSync(configPath, 'utf-8');
        config = JSON.parse(data);
    } catch (error) {
        console.error('Error loading config:', error);
        config = {};
    }
}

/**
 * Save the updated configuration back to the JSON file.
 * @param {Object} newConfig - The new configuration object to save.
 */
function saveConfig(newConfig) {
    try {
        fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), 'utf-8');
        config = newConfig;
    } catch (error) {
        console.error('Error saving config:', error);
    }
}

// Load the initial config
loadConfig();

/**
 * Serve the HTML form to edit specific config parameters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/', (req, res) => {
    res.render('form', { config, qr_code, is_auth });
});

/**
 * Handle form submission and update the configuration.
 * @param {Object} req - The request object containing form data.
 * @param {Object} res - The response object to send feedback.
 */
app.post('/save-config', (req, res) => {
    const { 
        botName,
        processingError, 
        generalError, 
        imageError, 
        ttsError, 
        ttsPrefix, 
        imagePromptPrefix, 
        systemPrompt, 
        systemImagePrompt, 
        maxTokens 
    } = req.body;

    const updatedConfig = {
        ...config,
        botName,
        errorMessages: {
            ...config.errorMessages,
            processing: processingError,
            generalError: generalError,
            imageError: imageError,
            ttsError: ttsError,
        },
        ttsPrefix,
        imagePromptPrefix,
        systemPrompt,
        systemImagePrompt,
        max_tokens: parseInt(maxTokens),
    };
    config = updatedConfig;
    saveConfig(updatedConfig);

    res.send('Configuration updated successfully! <a href="/">Go Back</a>');
});

app.get('/auth-status', (req, res) => {
    res.json({ is_auth });
});

const port = global.config.server_port || 3000;
app.listen(port, () => {
    logger.info(`Admin server running at http://localhost:${port}`);
});