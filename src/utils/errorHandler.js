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
      const path = window.location.pathname;
      const isAuthPath = path.includes('/auth/login') ||
        path.includes('/auth/admin/login') ||
        path.includes('/auth/signup');

      // Don't redirect if we're already on an auth page or if the error is from a login attempt
      if (!isAuthPath) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth/login";
      }
    }
  }

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
