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

/**
 * Class representing a service for generating various prompts.
 */
class PromptService {
    /**
     * Creates an instance of the PromptService class.
     * Initializes the default context using the system prompt from the configuration.
     */
    constructor() {
        this.defaultContext = config.systemPrompt;
    }

    /**
     * Generates a prompt by combining a user message with a specified context.
     * 
     * @param {string} message - The user message to include in the prompt.
     * @param {string} [context=this.defaultContext] - The context to append to the message. Defaults to the system prompt.
     * @returns {string} The generated prompt combining the message and context.
     */
    generatePrompt(message, context = this.defaultContext) {
        logger.debug("Generating prompt...")
        return `${message}. ${context}`;
    }

    /**
     * Generates an image prompt by prepending a base message to the user message.
     * 
     * @param {string} message - The user message for the image prompt.
     * @returns {string} The generated image prompt.
     */
    generateImagePrompt(message) {
        logger.debug("Generating image prompt...")
        const baseMessage = config.imagePromptPrefix;
        return this.generatePrompt(baseMessage + message);
    }

    /**
     * Generates a speech prompt by prepending a TTS prefix to the user message.
     * 
     * @param {string} message - The user message for the speech prompt.
     * @returns {string} The generated speech prompt.
     */
    generateSpeechPrompt(message) {
        logger.debug("Generating speech prompt...")
        return `${config.ttsPrefix} ${message}`;
    }

    /**
     * Generates an error prompt using the processing error message from the configuration.
     * 
     * @returns {string} The generated error prompt.
     */
    generateErrorPrompt() {
        logger.debug("Generating error prompt...")
        return this.generatePrompt(config.errorMessages.processing);
    }

    /**
     * Generates a general prompt from the user message.
     * 
     * @param {string} userMessage - The user message for the general prompt.
     * @returns {string} The generated general prompt.
     */
    generateGeneralPrompt(userMessage) {
        logger.debug("Generating general prompt...")
        return this.generatePrompt(userMessage);
    }
}

export default PromptService;