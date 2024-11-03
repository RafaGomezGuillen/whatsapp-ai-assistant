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


import { BingApi } from "bing-nodejs";
import { promises as fs } from 'fs';
import path from 'path';
import fetch from 'node-fetch';

/**
 * Class representing a service for interacting with the Bing API for image generation and downloading.
 */
class BingService {
    /**
     * Creates an instance of the BingService class.
     * 
     * @param {string} cookie - The Bing API cookie for authentication.
     * @param {string} saveDir - The directory where downloaded images will be saved.
     */
    constructor(cookie, saveDir) {
        this.bing = new BingApi({ cookie });
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
     * Downloads an image from a given URL and saves it to the specified filename.
     * 
     * @param {string} url - The URL of the image to download.
     * @param {string} filename - The name under which to save the downloaded image.
     * @returns {Promise<string>} A promise that resolves to the file path of the saved image.
     */
    async downloadImage(url, filename) {
        const response = await fetch(url);
        const buffer = await response.buffer();
        const filePath = path.join(this.saveDir, filename);
        await fs.writeFile(filePath, buffer);
        logger.debug(`${filename} saved.`);
        return filePath;
    }

    /**
     * Downloads multiple images from an array of URLs.
     * 
     * @param {string[]} urls - An array of URLs of the images to download.
     * @returns {Promise<void>} A promise that resolves when all images have been downloaded.
     */
    async downloadImages(urls) {
        await this.createDirectory();
        const downloadPromises = urls.map((url, index) => {
            const filename = `image${index + 1}.png`;
            return this.downloadImage(url, filename);
        });
        await Promise.all(downloadPromises);
        logger.debug('All images downloaded.');
    }

    /**
     * Generates images based on the provided prompt and downloads them.
     * 
     * @param {string} prompt - The prompt for generating images.
     * @returns {Promise<string[]>} A promise that resolves to an array of filenames of the downloaded images.
     */
    async generateAndDownloadImages(prompt) {
        const imageUrls = await this.bing.createImage(prompt);
        await this.downloadImages(imageUrls.urls);
        return fs.readdir(this.saveDir);
    }
}

export default BingService;
