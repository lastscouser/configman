import { StatusCodes } from "../../constant/status-codes";
import { Exception } from "./exception";

export class Forbidden extends Exception {
  constructor(message?: string, errorCode?: number) {
    super(message || "Forbidden", StatusCodes.Forbidden, errorCode);
  }
}
