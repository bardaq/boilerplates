import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
});

if (process.env.NODE_ENV === "production") {
  const fileFormat = format.combine(format.timestamp(), format.json());
  const errTransport = new transports.File({
    filename: "./logs/error.log",
    format: fileFormat,
    level: "error",
  });
  const infoTransport = new transports.File({
    filename: "./logs/combined.log",
    format: fileFormat,
  });
  logger.add(errTransport);
  logger.add(infoTransport);
} else {
  const errorStackFormat = format((info) => {
    if (info.stack) {
      console.log(info.stack);
      return false;
    }
    return info;
  });
  const consoleTransport = new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
      errorStackFormat()
    ),
  });
  logger.add(consoleTransport);
}

export default logger;
