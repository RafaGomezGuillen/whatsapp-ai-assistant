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


import GPT from "../gpt/Core.js"

/**
 * Class representing a service for interacting with the GPT model.
 */
class GPTService {
    /**
     * Creates an instance of the GPTService class.
     * 
     * @param {Object} config - The configuration object for the GPT instance.
     */
    constructor(config) {
        this.gpt = new GPT(config);
    }

    /**
     * Gets a response from the GPT model based on the provided prompt.
     * 
     * @param {string} prompt - The prompt to send to the GPT model.
     * @param {string} person - An optional parameter to override the system prompt.
     * @returns {Promise<string>} A promise that resolves to the content of the response from the GPT model.
     * @throws {Error} Throws an error if the response retrieval fails.
     */
    async getResponse(prompt, person) {
        return this.gpt.getGroqChatCompletion(prompt, person)
            .then(res => res.choices[0].message.content)
            .catch(err => {
                logger.error(err);
                throw err;
            });
    }
}

export default GPTService;