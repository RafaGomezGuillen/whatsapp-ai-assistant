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

import pkg from "whatsapp-web.js";
import { promises as fs } from "fs";
import path from "path";

const { Client, LocalAuth, MessageMedia } = pkg;

/**
 * Class representing a WhatsApp client that interacts with various services
 * like GPT, Bing, and TTS for processing messages.
 */
class WhatsAppClient {
  /**
   * Creates an instance of the WhatsAppClient class.
   *
   * @param {Object} gptService - The service for generating responses from GPT.
   * @param {Object} bingService - The service for generating and downloading images.
   * @param {Object} ttsService - The service for text-to-speech audio generation.
   * @param {Object} promptService - The service for generating prompts.
   */
  constructor(gptService, bingService, ttsService, promptService) {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: false,
        executablePath: config.chrome_path,
        headless: true,
      },
    });

    this.gptService = gptService;
    this.bingService = bingService;
    this.ttsService = ttsService;
    this.promptService = promptService;
    this.isProcessing = false;
    this.lastMsg = null;
    this.lastGeneratedMsg = "";

    this.setupEvents();
  }

  /**
   * Sets up event listeners for the WhatsApp client.
   * Listens for QR code generation, client readiness, and incoming messages.
   */
  setupEvents() {
    this.client.on("qr", (qr) => {
      logger.info(`Got QR code -> ${qr}`);
      qr_code = qr;
    });

    this.client.on("ready", () => {
      logger.info("WhatsApp Client is ready!");
      is_auth = true;
    });

    this.client.on("message", async (msg) => {
      if (msg.body !== this.lastGeneratedMsg) {
        this.lastMsg = msg;
        logger.debug(`Got message -> ${msg.body}`);
        await this.handleMessage(msg);
      }
    });

    this.client.on("disconnected", async (reason) => {
      logger.info(`Client was logged out: ${reason}`);
      is_auth = false;
      this.renewSession();
    });

    this.client.initialize();
  }

  /**
   * Handles incoming messages by determining their intent and directing them
   * to the appropriate handler (TTS, image generation, or GPT response).
   *
   * @param {Object} msg - The incoming message object.
   */
  async handleMessage(msg) {
    const lowerMsg = msg.body.toLowerCase();
    const botName = config.botName.toLowerCase();

    if (lowerMsg.includes(botName)) {
      if (this.isCommand(lowerMsg, config.commands.speak)) {
        logger.info("Handling GPT TTS Request");
        await this.handleTTSRequest(msg);
      } else if (this.isCommand(lowerMsg, config.commands.image)) {
        logger.info("Handling GPT image request");
        await this.handleImageRequest(msg);
      } else {
        logger.info("Handling regular GPT request");
        await this.handleGeneralGPTRequest(msg);
      }
    }
  }

  /**
   * Checks if the provided message contains any of the commands in the command list.
   *
   * @param {string} message - The message to check.
   * @param {Array<string>} commandList - The list of commands to search for.
   * @returns {boolean} True if the message contains a command; otherwise, false.
   */
  isCommand(message, commandList) {
    return commandList.some((command) => message.includes(command));
  }

  /**
   * Handles Text-to-Speech (TTS) requests by generating audio from the given message
   * and sending it back as a reply.
   *
   * @param {Object} msg - The incoming message object.
   */
  async handleTTSRequest(msg) {
    const botName = config.botName.toLowerCase();
    const speechText = msg.body.toLowerCase().split(botName)[1].trim();
    const prompt = this.promptService.generateSpeechPrompt(
      config.ttsPrefix + speechText
    );

    try {
      const response = await this.gptService.getResponse(prompt);
      await this.ttsService.generateAndSendAudio(response, msg, this.client);
    } catch (error) {
      logger.error("Error handling TTS request");
      msg.reply(config.errorMessages.ttsError);
    }
  }

  /**
   * Handles image generation requests by creating images based on the provided message
   * and sending them back as replies.
   *
   * @param {Object} msg - The incoming message object.
   */
  async handleImageRequest(msg) {
    if (this.isProcessing) {
      const errorPrompt = this.promptService.generateErrorPrompt();
      await this.gptService.getResponse(errorPrompt);
      msg.reply(config.errorMessages.processing);
      return;
    }

    this.isProcessing = true;

    try {
      const prompt = this.promptService.generateImagePrompt(
        config.imagePromptPrefix + msg.body
      );
      const imgres = await this.gptService.getResponse(
        prompt,
        config.systemImagePrompt
      );
      const files = await this.bingService.generateAndDownloadImages(imgres);

      for (const file of files) {
        const filePath = path.join(this.bingService.saveDir, file);
        const fileData = await fs.readFile(filePath);
        const media = new MessageMedia(
          "image/png",
          fileData.toString("base64"),
          file
        );
        await this.client.sendMessage(msg.from, media);
      }
    } catch (error) {
      logger.error(`Error generating image: ${error}`);
      msg.reply(config.errorMessages.imageError);
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Handles general GPT requests by generating a response based on the user's message,
   * conversation history with timestamps, and sending it back as a reply.
   *
   * @param {Object} msg - The incoming message object.
   */
  async handleGeneralGPTRequest(msg) {
    const userName = msg._data.notifyName || "User";
    const prompt = this.promptService.generateGeneralPrompt(
      `estas respondiendo a ${userName} por lo que si te preguntan por su nombre es ese, ${msg.body}`
    );

    logger.debug(prompt);

    try {
      const response = await this.gptService.getResponse(prompt);
      this.lastGeneratedMsg = response;
      logger.info(`Generated GPT response: ${response}`);
      msg.reply(response);
    } catch (error) {
      logger.error("Error handling GPT request " + error);
      msg.reply(config.errorMessages.generalError);
    }
  }

  /**
   * on exit send error message
   *
   */
  async alertExit() {
    if (this.lastMsg) await this.lastMsg.reply(config.errorMessages.imageError);
  }

  /**
   * Force QR code regeneration, destrorying the current client instance and reinitializing it.
   *
   */
  async renewSession() {
    logger.info("Forcing QR code regeneration...");
    
    try {
      // Destroy the current client instance
      await this.client.destroy();

      // Reinitialize the client
      this.client = new Client(); // Recreate the client with the same configuration
      this.setupEvents(); // Re-bind event listeners
      this.client.initialize(); // Reinitialize the client
    } catch (error) {
      logger.error("Error while forcing QR code regeneration:", error);
    }
  }
}

export default WhatsAppClient;
