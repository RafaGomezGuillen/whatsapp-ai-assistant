import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

// --------------------------------------------
//  GET METHODS
// --------------------------------------------

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
 * Fetch the current auth configuration from the server.
 * @returns {Object} The current auth configuration.
 * @throws Will throw an error if the request fails.
 */
export const fetchAuthStatus = async () => { 
  try {
    const response = await axios.get(`${API_URL}/auth-status`);
    return response.data;
  } catch (error) {
    console.error("Error fetching auth status:", error);
    throw error;
  }
};

/**
 * Get the GROQ_API_KEY and BING_COOKIE fields from the .env file.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const getEnv = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-env`);
    return response.data;
  } catch (error) {
    console.error("Error fetching environment variables:", error);
    throw error;
  }
};

/**
 * Fetch the logs from the server.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
  */
export const getLogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/stream-logs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

// --------------------------------------------
//  POST METHODS
// --------------------------------------------

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
 * Logout from whatsapp.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

/**
 * Update the GROQ_API_KEY and BING_COOKIE fields in the .env file.
 * @param {string} groqApiKey - The new GROQ_API_KEY value.
 * @param {string} bingCookie - The new BING_COOKIE value.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const updateEnv = async (groqApiKey, bingCookie) => {
  try {
    const payload = { GROQ_API_KEY: groqApiKey, BING_COOKIE: bingCookie };
    const response = await axios.post(`${API_URL}/update-env`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating environment variables:", error);
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