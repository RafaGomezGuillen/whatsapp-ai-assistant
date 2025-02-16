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

import axios from "axios";
import { promises as fsPromise } from "fs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import logger from "../logger/Logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, "../.env");
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const { UNSPLASH_ACCESS_KEY } = envConfig;

/**
 * Class representing a service for interacting with the stable diffusion API for image generation and downloading.
 */
class ImageService {
  /**
   * Creates an instance of the ImageService class.
   *
   * @param {string} saveDir - The directory where downloaded images will be saved.
   */
  constructor(saveDir) {
    this.unsplashAccessKey = UNSPLASH_ACCESS_KEY;
    this.saveDir = saveDir;
  }

  /**
   * Creates a directory for saving images if it does not already exist.
   *
   * @returns {Promise<void>} A promise that resolves when the directory has been created.
   */
  async createDirectory() {
    await fsPromise.mkdir(this.saveDir, { recursive: true });
    logger.debug(`Directory created: ${this.saveDir}`);
  }

  /**
   * Generates 4 images based on the provided prompt and saves it.
   *
   * @param {string} prompt - The prompt for generating the images.
   * @returns {Promise<string[]>} A promise that resolves to an array of file paths of the saved images.
   */
  async generateAndDownloadImages(prompt) {
    await this.createDirectory();

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: prompt,
            per_page: 4,
          },
          headers: {
            Authorization: `Client-ID ${this.unsplashAccessKey}`,
          },
        }
      );

      const imageLinks = response.data.results.map((image) => image.urls.raw);

      // Download and save images locally
      const downloadPromises = imageLinks.map(async (url, index) => {
        const imagePath = path.join(this.saveDir, `image${index + 1}.jpg`);
        const writer = fs.createWriteStream(imagePath);
        const imageResponse = await axios({
          url,
          method: "GET",
          responseType: "stream",
        });
        imageResponse.data.pipe(writer);
        return new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
      });

      await Promise.all(downloadPromises);

      const files = await fsPromise.readdir(this.saveDir);
      logger.info(`Downloaded images about ${prompt}.`);
      return files;
    } catch (error) {
      logger.error("Error getting images from unsplash:", error);
      throw new Error("Error getting images from unsplash.");
    }
  }

  /**
   * Generates link of images based on the provided prompt.
   *
   * @param {string} prompt - The prompt for generating images.
   * @returns {Promise<string[]>} A promise that resolves to an array of link of images.
   */
  async generateLinkImages(prompt) {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: prompt,
        per_page: 4,
      },
      headers: {
        Authorization: `Client-ID ${this.unsplashAccessKey}`,
      },
    });

    logger.info("Images generated successfully.");
    const imageLinks = response.data.results.map((image) => image.urls.raw);
    return imageLinks;
  }
}

export default ImageService;
