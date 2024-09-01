import winstonLogger from "./log";
require("express-async-errors");

export const handleFatalErrors = () => {
  process.on("unhandledRejection", (ex) => {
    winstonLogger.fatal("unhandledRejection error occured...", ex);
    throw ex;
  });

  process.on("uncaughtException", (ex) => {
    winstonLogger.fatal("uncaughtException error occured...", ex);
    throw ex;
  });
};
