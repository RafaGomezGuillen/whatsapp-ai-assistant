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

import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch the current configuration from the server.
 * @returns {Object} The current configuration.
 * @throws Will throw an error if the request fails.
 */
export const fetchConfig = async () => {
  try {
    const response = await axios.get(`${API_URL}/current-config`);
    return response.data;
  } catch (error) {
    console.error("Error fetching configuration:", error);
    throw error;
  }
};

/**
 * Save the general configuration to the server.
 * @param {string} botName - The name of the bot.
 * @param {number} maxTokens - The maximum number of tokens.
 * @param {string} systemPrompt - The system prompt.
 * @param {string} model - The selected AI model.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const saveGeneralConfig = async (botName, maxTokens, systemPrompt, model) => {
  try {
    const payload = { botName, max_tokens: maxTokens, systemPrompt, model };
    const response = await axios.post(`${API_URL}/save-config`, payload);
    return response.data;
  } catch (error) {
    console.error("Error saving general configuration:", error);
    throw error;
  }
};

/**
 * Function to handle POST requests for error message fields.
 * @param {string} generalError - The error message for general errors.
 * @param {string} imageError - The error message for image errors.
 * @param {string} ttsError - The error message for TTS errors.
 * @param {string} ttsPrefix - The prefix for TTS messages.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const saveErrorConfig = async (
  generalError,
  imageError,
  ttsError,
  ttsPrefix
) => {
  try {
    const payload = {
      errorMessages: {
        generalError: generalError,
        imageError: imageError,
        ttsError: ttsError,
        ttsPrefix: ttsPrefix,
      },
    };

    const response = await axios.post(`${API_URL}/save-config`, payload);
    return response.data;
  } catch (error) {
    console.error("Error saving error configuration:", error);
    throw error;
  }
};

/**
 * Function to handle POST requests for commands fields.
 * @param {Array} imageCommands - The image command array.
 * @param {Array} audioCommands - The audio command array.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const saveCommandsConfig = async (
  imageCommands,
  audioCommands,
) => {
  try {
    const payload = {
      commands: {
        speak: audioCommands,
        image: imageCommands
      },
    };

    const response = await axios.post(`${API_URL}/save-config`, payload);
    return response.data;
  } catch (error) {
    console.error("Error saving error configuration:", error);
    throw error;
  }
};

/**
 * Save the chrome installation path configuration to the server.
 * @param {string} chromePath - the chrome installation path.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const saveChromePath = async (chromePath) => {
  try {
    const payload = { chrome_path: chromePath };
    const response = await axios.post(`${API_URL}/save-config`, payload);
    return response.data;
  } catch (error) {
    console.error("Error saving chrome installation path:", error);
    throw error;
  }
};