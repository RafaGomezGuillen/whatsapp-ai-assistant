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


import { promises as fs } from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import MessageMedia from 'whatsapp-web.js/src/structures/MessageMedia.js';

/**
 * Class representing a service for Text-to-Speech (TTS) audio generation and handling.
 */
class TTSService {
    /**
     * Creates an instance of the TTSService class.
     * 
     * @param {string} audioDir - The directory where audio files will be saved.
     */
    constructor(audioDir) {
        this.audioDir = audioDir;
    }

    /**
     * Creates a directory for saving audio files if it does not already exist.
     * 
     * @returns {Promise<void>} A promise that resolves when the directory has been created.
     */
    async createDirectory() {
        await fs.mkdir(this.audioDir, { recursive: true });
        logger.debug(`Directory created: ${this.audioDir}`);
    }

    /**
     * Downloads a file from the specified URL and saves it to the given file path.
     * 
     * @param {string} url - The URL of the file to download.
     * @param {string} filepath - The path where the downloaded file will be saved.
     * @returns {Promise<string>} A promise that resolves to the file path of the saved file.
     */
    async downloadFile(url, filepath) {
        const response = await fetch(url);
        const buffer = await response.buffer();
        await fs.writeFile(filepath, buffer);
        logger.debug(`${filepath} saved.`);
        return filepath;
    }

    /**
     * Generates audio from the given text using a TTS service and sends it to the specified message client.
     * 
     * @param {string} text - The text to convert to audio.
     * @param {Object} msg - The message object to reply to.
     * @param {Object} client - The client used to send the audio message.
     * @returns {Promise<void>} A promise that resolves when the audio has been sent.
     * @throws {Error} Throws an error if the audio generation or sending fails.
     */
    async generateAndSendAudio(text, msg, client) {
        const ttsUrl = `https://cache-a.oddcast.com/tts/genC.php?EID=2&LID=2&VID=7&TXT=${encodeURIComponent(text)}&EXT=mp3&FNAME=&ACC=15679&SceneID=2692826&HTTP_ERR=`;
        const audioFilename = `audio.mp3`;
        const audioPath = path.join(this.audioDir, audioFilename);

        try {
            await this.createDirectory();
            await this.downloadFile(ttsUrl, audioPath);

            const audioData = await fs.readFile(audioPath);
            const media = new MessageMedia('audio/mp3', audioData.toString('base64'), audioFilename);
            await client.sendMessage(msg.from, media, { sendAudioAsVoice: true });

        } catch (error) {
            logger.error("Error generating or sending audio " + error);
            msg.reply("Hubo un problema generando el audio, intenta de nuevo.");
        }
    }
}

export default TTSService;