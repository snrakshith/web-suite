import getDevLogger from "./devLogger";
import getProdLogger from "./prodLogger";

let logger: any = null;

const { REACT_APP_ENV }: any = process.env;

// For Local
if (REACT_APP_ENV === "local") {
  logger = getDevLogger();
}

// For Dev
if (REACT_APP_ENV === "dev") {
  logger = getDevLogger();
}

// For Prod
if (REACT_APP_ENV === "prod") {
  logger = getProdLogger();
}

export default logger;
