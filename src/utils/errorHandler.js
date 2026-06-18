export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const handleApiError = (error) => {
  // 401 handling is done by httpClient (calls logout → ProtectedRoute redirects)
  // No hard redirect here to avoid competing with that flow

  if (import.meta.env.DEV) {
    // API Error logged in development
  }

  return error;
};

export const getErrorMessage = (error) => {
  if (error instanceof ApiError) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "An unexpected error occurred";
};
