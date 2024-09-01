import { StatusCodes } from "../../constant/status-codes";
import { Exception } from "./exception";

export class InvalidParameter extends Exception {
  constructor(message?: string, errorCode?: number) {
    super(message || "Invalid parameter.", StatusCodes.BadRequest, errorCode);
  }
}
