import { format, transports, createLogger } from "winston";
const { combine, timestamp, label, printf } = format;

const facilityCode = localStorage.getItem("facilityCode");
const orgName = localStorage.getItem("orgName");
const userRole = localStorage.getItem("userRole");
const { REACT_APP_ENV }: any = process.env;

const extraOptions = {
  facilityCode,
  orgName,
  userRole,
  platform: window?.navigator?.platform,
  apiENV: REACT_APP_ENV,
};

console.log(extraOptions);

const myFormat = printf(({ level, message, label, timestamp }) => {
  //   return `${timestamp} [${level}]: ${message}`;
  return `${timestamp} [${level}]: ${message} ${extraOptions.facilityCode}`;
});

const getDevLogger = () => {
  return createLogger({
    level: "info",
    format: combine(timestamp({ format: "HH:mm:ss" }), myFormat),
    transports: [
      // new transports.File({ filename: "logger/error.log", level: "debug" }),
      new transports.Console(),
    ],
  });
};

export default getDevLogger;
