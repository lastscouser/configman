import { StatusCodes } from "../../constant/status-codes";
import { Exception } from "./exception";

export class TimeOut extends Exception {
  constructor(message?: string, errorCode?: number) {
    super(message || "timeout", StatusCodes.GatewayTimeout, errorCode);
  }
}
