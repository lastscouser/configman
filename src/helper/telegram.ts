import { Telegraf } from "telegraf";
import config from "../config/config";
import { ConfigStatus } from "../config/dev";
import winstonLogger from "../startup/log";

async function sendNotification(message: string) {
  try {
    if (
      !config.telegram.key ||
      !config.telegram.groupId ||
      config.telegram.key === ConfigStatus.NotDefined ||
      config.telegram.groupId === ConfigStatus.NotDefined
    ) {
      return;
    }

    const bot = new Telegraf(config.telegram.key);

    let maxLength = 4096;
    let messageCount =
      message.length % maxLength == 0
        ? message.length / maxLength
        : message.length / maxLength + 1;

    for (let i = 1; i <= messageCount; i++) {
      const messagePart = message.substring((i - 1) * maxLength, maxLength * i);
      await bot.telegram.sendMessage(config.telegram.groupId, messagePart, {
        parse_mode: "HTML",
      });
    }
  } catch (err) {
    winstonLogger.error("Telegram sendNotification error", err);
  }
}

const TelegramService = { sendNotification: sendNotification };

export default TelegramService;
