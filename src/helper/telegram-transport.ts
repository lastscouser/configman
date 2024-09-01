import Transport from "winston-transport";
import winstonLogger from "../startup/log";
import TelegramService from "./telegram";

class TelegramTransport extends Transport {
  constructor(opts: any) {
    super(opts);
  }

  async log(info: any, callback: any) {
    try {
      TelegramService.sendNotification(info.message);
    } catch (error) {
      winstonLogger.error("Telegram log error", error);
    }

    callback();
  }
}

export default TelegramTransport;
