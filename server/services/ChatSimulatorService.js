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

class ChatSimulatorService {
  /**
   * Creates an instance of the ChatSimulatorService class.
   *
   * @param {Object} gptService - The service for generating responses from GPT.
   * @param {Object} imageService - The service for generating and downloading images.
   * @param {Object} ttsService - The service for text-to-speech audio generation.
   * @param {Object} promptService - The service for generating prompts.
   */
  constructor(gptService, imageService, ttsService, promptService) {
    this.gptService = gptService;
    this.imageService = imageService;
    this.ttsService = ttsService;
    this.promptService = promptService;
    this.isProcessing = false;
  }

  /**
   * Simulates handling a message by determining its intent and directing it
   * to the appropriate handler (TTS, image generation, or GPT response).
   *
   * @param {string} message - The input message to simulate.
   * @returns {Promise<Object>} The simulated response.
   */
  async simulateMessage(message) {
    const lowerMessage = message.toLowerCase();
    const botName = config.botName.toLowerCase();

    if (lowerMessage.includes(botName)) {
      if (this.isCommand(lowerMessage, config.commands.speak)) {
        return this.handleTTSRequest(message);
      } else if (this.isCommand(lowerMessage, config.commands.image)) {
        return this.handleImageRequest(message);
      } else {
        return this.handleGeneralGPTRequest(message);
      }
    }

    return {
      error: `Message does not contain a valid command or bot reference. Remember to include the bot name (${config.botName}) in your message.`,
    };
  }

  /**
   * Checks if the provided message contains any of the commands in the command list.
   *
   * @param {string} message - The message to check.
   * @param {Array<string>} commandList - The list of commands to search for.
   * @returns {boolean} True if the message contains a command; otherwise, false.
   */
  isCommand(message, commandList) {
    const nomarlizedCommands = this.removeAccentFromList(commandList);
    return nomarlizedCommands.some((command) => message.includes(command));
  }

  /**
   * Removes accents from a list of strings.
   *
   * @param {Array<string>} list - The list of strings to remove accents from.
   * @returns {Array<string>} The list of strings with accents removed.
   */
  removeAccentFromList(list) {
    return list.map((str) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
  }

  /**
   * Simulates a Text-to-Speech (TTS) request.
   *
   * @param {string} message - The message for TTS.
   * @returns {Promise<Object>} The TTS response or error.
   */
  async handleTTSRequest(message) {
    const botName = config.botName.toLowerCase();
    const speechText = message.toLowerCase().split(botName)[1].trim();
    const prompt = this.promptService.generateSpeechPrompt(
      config.ttsPrefix + speechText
    );

    try {
      const response = await this.gptService.getResponse(prompt);
      const audioPath = await this.ttsService.generateAudio(response);
      return { audioPath, response };
    } catch (error) {
      logger.error("Error handling TTS request", error);
      return { error: config.errorMessages.ttsError };
    }
  }

  /**
   * Simulates an image generation request.
   *
   * @param {string} message - The message for image generation.
   * @returns {Promise<Object>} The image paths or error.
   */
  async handleImageRequest(message) {
    const prompt = this.promptService.generateImagePrompt(message);
    try {
      const response = await this.imageService.generateLinkImages(prompt);
      return { response };
    } catch (error) {
      logger.error("Error generating image:", error);
      return { error: config.errorMessages.imageError };
    }
  }

  /**
   * Simulates a general GPT request.
   *
   * @param {string} message - The message for GPT response.
   * @returns {Promise<Object>} The GPT response or error.
   */
  async handleGeneralGPTRequest(message) {
    const prompt = this.promptService.generateGeneralPrompt(message);

    try {
      const response = await this.gptService.getResponse(prompt);
      return { response };
    } catch (error) {
      logger.error("Error handling GPT request", error);
      return { error: config.errorMessages.generalError };
    }
  }
}

export default ChatSimulatorService;
