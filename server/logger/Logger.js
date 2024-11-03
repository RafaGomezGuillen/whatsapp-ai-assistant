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

import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'winston';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

/**
 * Custom format for console output to enhance readability.
 * Includes timestamp, log level, and message, along with any additional metadata.
 */
const customConsoleFormat = format.printf(({ timestamp, level, message, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message} `;
    if (metadata && Object.keys(metadata).length) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

/**
 * Logger configuration using Winston for logging messages in the application.
 * This logger will capture messages at the 'debug' level and above.
 */
const logger = winston.createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss' // Format the timestamp for better readability.
        }),
        format.errors({ stack: true }), // Capture stack traces for error messages.
        format.splat(), // Allows for string interpolation in log messages.
        format.json() // Output logs in JSON format for structured logging.
    ),
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.colorize(), // Add color to console output for different log levels.
                customConsoleFormat // Use the custom console format defined above.
            ),
        }),
        new winston.transports.File({
            filename: path.join(__dirname, 'logs/error.log'), // Log errors to a separate file.
            level: 'error',
            format: format.json() // Store error logs in JSON format.
        }),
        new winston.transports.File({
            filename: path.join(__dirname, 'logs/combined.log'), // Log all messages to a combined log file.
            format: format.json() // Store all logs in JSON format.
        }),
    ],
});

/**
 * Adding log rotation to manage log file sizes and maintain history.
 * Old logs will be compressed and kept for a limited time.
 */
logger.add(new winston.transports.File({
    filename: path.join(__dirname, 'logs/combined-%DATE%.log'), // Use date in filename for clarity.
    datePattern: 'YYYY-MM-DD', // Format the date in the filename.
    zippedArchive: true, // Compress old log files to save space.
    maxSize: '20m', // Set maximum size for each log file.
    maxFiles: '14d', // Keep logs for 14 days before deletion.
}));

global.logger = logger; // Make logger globally accessible in the application.

export default logger; // Export the logger for use in other modules.