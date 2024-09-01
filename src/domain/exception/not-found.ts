import { StatusCodes } from "../../constant/status-codes";
import { Exception } from "./exception";

export class NotFound extends Exception {
  constructor(message?: string, errorCode?: number) {
    super(message || "Not found.", StatusCodes.NotFound, errorCode);
  }
}
