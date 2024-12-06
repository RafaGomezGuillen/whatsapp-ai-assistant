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
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const saveGeneralConfig = async (botName, maxTokens, systemPrompt) => {
  try {
    const payload = { botName, maxTokens, systemPrompt };
    const response = await axios.post(`${API_URL}/save-config`, payload);
    return response.data;
  } catch (error) {
    console.error("Error saving general configuration:", error);
    throw error;
  }
};

/**
 * Save the image configuration to the server.
 * @param {string} imagePromptPrefix - The prefix for the image prompt.
 * @param {string} systemImagePrompt - The system image prompt.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const saveImageConfig = async (imagePromptPrefix, systemImagePrompt) => {
  try {
    const payload = { imagePromptPrefix, systemImagePrompt };
    const response = await axios.post(`${API_URL}/save-config`, payload);
    return response.data;
  } catch (error) {
    console.error("Error saving image configuration:", error);
    throw error;
  }
};

/**
 * Function to handle POST requests for error message fields.
 * @param {string} processingError - The error message for processing errors.
 * @param {string} generalError - The error message for general errors.
 * @param {string} imageError - The error message for image errors.
 * @param {string} ttsError - The error message for TTS errors.
 * @param {string} ttsPrefix - The prefix for TTS messages.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const saveErrorConfig = async (
  processingError,
  generalError,
  imageError,
  ttsError,
  ttsPrefix
) => {
  try {
    const payload = {
      errorMessages: {
        processing: processingError,
        generalError: generalError,
        imageError: imageError,
        ttsError: ttsError,
      },
      ttsPrefix,
    };

    const response = await axios.post(`${API_URL}/save-config`, payload);
    return response.data;
  } catch (error) {
    console.error("Error saving error configuration:", error);
    throw error;
  }
};
