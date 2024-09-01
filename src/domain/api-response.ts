export interface ApiResponse<T> {
  success: T;
  error: ApiResponseError;
  isError: boolean;
  sessionId?: string;
}

export interface ApiResponseError {
  errorCode: number;
  errorMessage: string;
  errorKey?: string;
  errorData: any;
}
