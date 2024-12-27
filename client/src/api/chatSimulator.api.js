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
 * Send a message to the chat simulator.
 * @param {Object} params - The parameters for the message.
 * @param {string} params.message - The message to send.
 * @returns {Object} The response from the chat simulator.
 * @throws Will throw an error if the request fails.
 */
export const sendMessage = async ({ message }) => {
  try {
    const response = await axios.post(`${API_URL}/simulate-chat`, { message }, {
      responseType: "arraybuffer",
    });

    const contentType = response.headers["content-type"];
    if (contentType.includes("audio")) {
      return {
        type: "audio",
        data: new Blob([response.data], { type: contentType }),
      };
    }

    return { type: "text", data: JSON.parse(new TextDecoder().decode(response.data)) };
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

