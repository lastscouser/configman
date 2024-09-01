import { StatusCodes } from "../../constant/status-codes";
import { Exception } from "./exception";

export class ConfigException extends Exception {
  constructor(message?: string, errorCode?: number) {
    super(
      message || "something wrong with system",
      StatusCodes.InternalServerError,
      errorCode
    );
  }
}
