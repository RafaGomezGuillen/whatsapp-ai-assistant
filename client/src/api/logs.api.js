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