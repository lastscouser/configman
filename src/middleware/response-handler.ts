import { ApiResponse, ApiResponseError } from "../domain/api-response";

import winstonLogger from "../startup/log";

export function transform(body: any, req: any, res: any) {
  try {
    //logger.logResponse(req, res, body);
  } catch (err) {
    winstonLogger.error("response log error", err);
  }

  if (req && req.doNotFormatBody) {
    return body;
  }

  if (body && body.isError === undefined) {
    const response: ApiResponse<any> = {
      isError: false,
      success: body,
      error: {} as ApiResponseError,
      sessionId: req.sessionId,
    };
    body = response;
  }
  return body;
}
