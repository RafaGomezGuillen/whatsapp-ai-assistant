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

import "./server/config.js";
import GPTService from "./services/GPTService.js";
import BingService from "./services/BingService.js";
import TTSService from "./services/TTSService.js";
import PromptService from "./services/PromptService.js";
import WhatsAppClient from "./services/WhatsApp.js";
import ChatSimulatorService from "./services/ChatSimulatorService.js";
import logger from "./logger/Logger.js";

let whatsappClient;
let chatSimulator;

/**
 * Initializes the required services.
 *
 * @throws {Error} Throws an error if required configuration values are missing.
 * @returns {{ gptService: GPTService, bingService: BingService, ttsService: TTSService, promptService: PromptService }} The initialized services.
 */
const initializeServices = () => {
  const { IMAGES_DIR, AUDIO_DIR } = config;

  if (!IMAGES_DIR || !AUDIO_DIR) {
    throw new Error("Missing required configuration values");
  }

  const gptService = new GPTService();
  const bingService = new BingService(IMAGES_DIR);
  const ttsService = new TTSService(AUDIO_DIR);
  const promptService = new PromptService();
  chatSimulator = new ChatSimulatorService(
    gptService,
    bingService,
    ttsService,
    promptService
  );
  logger.info("Services started...");
  return { gptService, bingService, ttsService, promptService };
};

/**
 * Initializes the WhatsApp client with the provided services.
 *
 * @param {{ gptService: GPTService, bingService: BingService, ttsService: TTSService, promptService: PromptService }} services - The initialized services.
 * @returns {WhatsAppClient} The initialized WhatsApp client.
 */
const initializeWhatsAppClient = ({
  gptService,
  bingService,
  ttsService,
  promptService,
}) => {
  return new WhatsAppClient(gptService, bingService, ttsService, promptService);
};

/**
 * Handles program errors by logging them, alerting the exit via WhatsApp,
 * and terminating the process with an exit code of 1.
 *
 * @param {Error} error - The error object caught by the process
 */
const handleError = async (error) => {
  logger.error(error); // Log the error using the logger
  await whatsappClient.alertExit(); // Send an alert via WhatsApp
  setTimeout(function () {
    process.exit(1);
  }, 2e3); // Exit the process with status code 1
};

/**
 * Listen for uncaught exceptions in the process and handle them.
 */
process.on("uncaughtException", (error) => {
  handleError(error);
});

/**
 * Listen for unhandled promise rejections and handle them.
 */
process.on("unhandledRejection", (error) => {
  handleError(error);
});

/**
 * Main loop of the program
 */
try {
  const services = initializeServices();
  whatsappClient = initializeWhatsAppClient(services);
} catch (error) {
  logger.error(error);
  process.exit(1);
}

export { chatSimulator };
