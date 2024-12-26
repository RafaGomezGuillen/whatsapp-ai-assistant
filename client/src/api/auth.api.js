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
 * Get the GROQ_API_KEY and BING_IMAGE_COOKIE fields from the .env file.
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
 * Update the GROQ_API_KEY and BING_IMAGE_COOKIE fields in the .env file.
 * @param {string} groqApiKey - The new GROQ_API_KEY value.
 * @param {string} bingCookie - The new BING_IMAGE_COOKIE value.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const updateEnv = async (groqApiKey, bingCookie) => {
  try {
    const payload = { GROQ_API_KEY: groqApiKey, BING_IMAGE_COOKIE: bingCookie };
    const response = await axios.post(`${API_URL}/update-env`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating environment variables:", error);
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