import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../domain/api-response";
import winstonLogger from "../startup/log";
import {
  BusinessException,
  ConfigException,
  Exception,
  InvalidParameter,
  Unauthorized,
} from "../domain/exception";
import { StatusCodes } from "../constant/status-codes";

export async function error(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let isErrorToBeLogged = err && !(err instanceof BusinessException);
  if (
    process.env.NODE_ENV !== "test" &&
    isErrorToBeLogged &&
    !(err instanceof InvalidParameter) &&
    !(err instanceof Unauthorized) &&
    !(err instanceof ConfigException)
  ) {
    winstonLogger.error(err.message, err);
  }

  if (err instanceof Unauthorized) {
    res.clearCookie("token");
  }

  const { apiError, statusCode } = await getApiError(err, req);

  if (isErrorToBeLogged) {
    //logger.logRequestError(req, err);
  }

  return res.status(statusCode).send(apiError);
}

async function getApiError(err: Error, req: Request) {
  const apiError: ApiResponse<any> = {
    isError: true,
    success: {},
    error: {
      errorData: {
        stackTrace: process.env.NODE_ENV !== "production" ? err.stack : "",
      },
      errorCode: 0,
      errorMessage: "",
    },
    sessionId: req.sessionId,
  };

  let statusCode: number = StatusCodes.InternalServerError;

  if (err && err instanceof Exception) {
    const exception: Exception = err;
    statusCode = exception.status;

    const errorMessage = exception.message;
    const errorCode = exception.errorCode;

    apiError.error.errorCode = errorCode;
    apiError.error.errorMessage = errorMessage;
    apiError.error.errorKey = exception.message;

    return { apiError: apiError, statusCode: statusCode };
  } else {
    apiError.error.errorMessage = err.message;
    return { apiError: apiError, statusCode: statusCode };
  }
}
