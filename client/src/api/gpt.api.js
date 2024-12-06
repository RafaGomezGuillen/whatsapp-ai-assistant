import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

// Function to handle GET requests for configuration
export const fetchConfig = async () => {
  try {
    const response = await axios.get(`${API_URL}/current-config`);
    return response.data;
  } catch (error) {
    console.error("Error fetching configuration:", error);
    throw error;
  }
};

// Function to handle POST requests for general configuration fields
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

// Function to handle POST requests for image configuration fields
export const saveImageConfig = async (imagePromptPrefix, systemImagePrompt) => {
  try {
    const response = await axios.post(`${API_URL}/save-config`, {
      imagePromptPrefix,
      systemImagePrompt,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving image configuration:", error);
    throw error;
  }
};

// Function to handle POST requests for error message fields
export const saveErrorConfig = async (
  processingError,
  generalError,
  imageError,
  ttsError
) => {
  try {
    const response = await axios.post(`${API_URL}/save-config`, {
      processingError,
      generalError,
      imageError,
      ttsError,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving error configuration:", error);
    throw error;
  }
};
