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

/**
 * Class representing a service for file operations, specifically for managing directories.
 */
class FileService {
    /**
     * Creates a directory at the specified path.
     * If the directory already exists, no error is thrown.
     * 
     * @param {string} dir - The path of the directory to create.
     * @returns {Promise<void>} A promise that resolves when the directory has been created.
     * @throws {Error} Throws an error if the directory creation fails.
     */
    static async createDirectory(dir) {
        try {
            await fs.mkdir(dir, { recursive: true });
            logger.debug(`Directory created: ${dir}`);
        } catch (error) {
            logger.error(`Error creating directory: ${error.message}`);
        }
    }

    /**
     * Removes a directory at the specified path, along with its contents.
     * 
     * @param {string} dir - The path of the directory to remove.
     * @returns {Promise<void>} A promise that resolves when the directory has been removed.
     * @throws {Error} Throws an error if the directory removal fails.
     */
    static async removeDirectory(dir) {
        try {
            await fs.rm(dir, { recursive: true, force: true });
        } catch (error) {
            logger.error(`Error removing directory: ${error.message}`);
        }
    }
}

export default FileService;