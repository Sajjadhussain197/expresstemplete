import { createLogger, format, transports } from "winston";
import { blue, yellow, red, green } from "colorette";

// Define color functions for different log levels
const colors = {
  info: blue,
  warn: yellow,
  error: red,
  debug: green,
};

// Create a custom format for colorizing log messages
const colorizeFormat = format.printf(({ level, message }) => {
  const colorFn = colors[level as keyof typeof colors];
  if (colorFn) {
    return colorFn(`[${level.toUpperCase()}] ${message}`);
  }
  return `[${level.toUpperCase()}] ${message}`;
});

// Create a custom logger instance with colorized output
const logger = createLogger({
  level: "debug", // Set log level
  format: format.combine(
    format.timestamp(), // Add timestamp to log messages
    colorizeFormat, // Apply color formatting
  ),
  transports: [new transports.Console()], // Log to console
});

// Export the custom logger instance
export default logger;
