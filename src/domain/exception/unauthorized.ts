import { StatusCodes } from "../../constant/status-codes";
import { Exception } from "./exception";

export class Unauthorized extends Exception {
  constructor(message?: string, errorCode?: number) {
    super(message || "Unauthorized", StatusCodes.Unauthorized, errorCode);
  }
}
