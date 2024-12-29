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

import { generateImageFiles, generateImagesLinks } from "bimg";
import { promises as fs } from "fs";
import path from "path";
import logger from "../logger/Logger.js";

/**
 * Class representing a service for interacting with the Bing API for image generation and downloading.
 */
class BingService {
  /**
   * Creates an instance of the BingService class.
   *
   * @param {string} saveDir - The directory where downloaded images will be saved.
   */
  constructor(saveDir) {
    this.saveDir = saveDir;
  }

  /**
   * Creates a directory for saving images if it does not already exist.
   *
   * @returns {Promise<void>} A promise that resolves when the directory has been created.
   */
  async createDirectory() {
    await fs.mkdir(this.saveDir, { recursive: true });
    logger.debug(`Directory created: ${this.saveDir}`);
  }

  /**
   * Saves the provided image files to the specified directory.
   *
   * @param {Object[]} imageFiles - The image files to save.
   * @returns {void}
   */
  async saveImages(imageFiles) {
    await this.createDirectory();

    for (const [index, file] of imageFiles.entries()) {
      if (index >= 1 && index <= 4) {
        const filePath = path.join(this.saveDir, `image_${index}.jpeg`);
        await fs.writeFile(filePath, Buffer.from(file.data, "base64"));
      }
    }
  }

  /**
   * Generates images based on the provided prompt and downloads them.
   *
   * @param {string} prompt - The prompt for generating images.
   * @returns {Promise<string[]>} A promise that resolves to an array of filenames of the downloaded images.
   */
  async generateAndDownloadImages(prompt) {
    const imageFiles = await generateImageFiles(prompt);
    this.saveImages(imageFiles);

    const files = await fs.readdir(this.saveDir);
    logger.info(`Generating images: ${files}`);
    return files;
  }

  /**
   * Generates link of images based on the provided prompt and downloads them.
   *
   * @param {string} prompt - The prompt for generating images.
   * @returns {Promise<string[]>} A promise that resolves to an array of link of images.
   */
  async generateLinkImages(prompt) {
    const imageLinks = await generateImagesLinks(prompt);

    logger.info("Images generated successfully.");
    return imageLinks;
  }
}

export default BingService;
