import winston from "winston";
import { isDevelopmentEnv, isUatEnv } from "../helper/env";

const myCustomLevels: winston.config.AbstractConfigSetLevels = {
  fatal: 0,
  error: 1,
  info: 2,
  debug: 3,
};

interface CustomLevels extends winston.Logger {
  info: winston.LeveledLogMethod;
  error: winston.LeveledLogMethod;
  fatal: winston.LeveledLogMethod;
  debug: winston.LeveledLogMethod;
}

const transports: winston.transport[] = [];

if (isDevelopmentEnv() || isUatEnv()) {
  transports.push(new winston.transports.Console({ level: "debug" }));
}

const winstonLogger: CustomLevels = <CustomLevels>winston.createLogger({
  levels: myCustomLevels,
  transports: transports,
});

export default winstonLogger;
