export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const handleApiError = (error) => {
  if (error?.response?.status === 401 || error?.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Add other auth-related keys as needed
      window.location.href = "/login";
    }
  }

  if (import.meta.env.DEV) {
    console.error("API Error:", error);
  }

  return error;
};

export const getErrorMessage = (error) => {
  if (error instanceof ApiError) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "An unexpected error occurred";
};
