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

import Groq from "groq-sdk";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, "../.env");
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const { GROQ_API_KEY } = envConfig;

/**
 * Class representing a GPT service that utilizes the Groq SDK.
 */
class GPT {
    /**
     * Creates an instance of the GPT class.
     * Initializes the Groq client with the provided API key from the environment variables.
     */
    constructor() {
        this.groq = new Groq({ apiKey: GROQ_API_KEY });
    }

    /**
     * Retrieves chat completion from the Groq service based on the provided prompt.
     * 
     * @param {string} prompt - The user prompt for the chat completion.
     * @param {string} [overrideSystemPrompt] - An optional system prompt to override the default.
     * @returns {Promise<Object>} A promise that resolves to the chat completion response from the Groq API.
     */
    async getGroqChatCompletion(prompt, overrideSystemPrompt) {
        logger.debug("Creating chat completion...")
        const systemPrompt = overrideSystemPrompt || config.systemPrompt;

        return this.groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            model: config.model,
            max_tokens: config.max_tokens,
        });
    }
}

export default GPT;