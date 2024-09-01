import { StatusCodes } from "../../constant/status-codes";
import { Exception } from "./exception";

export class BusinessException extends Exception {
  constructor(message?: string, errorCode?: number, subErrorCode?: number) {
    super(
      message || "Bad Request",
      StatusCodes.Ok,
      errorCode,
      undefined,
      subErrorCode
    );
  }
}
