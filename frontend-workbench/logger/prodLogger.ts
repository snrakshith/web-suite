import { format, transports, createLogger } from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const getProdLogger = () => {
  return createLogger({
    level: "info",
    format: combine(timestamp(), myFormat),
    transports: [new transports.Console()],
  });
};

export default getProdLogger;
