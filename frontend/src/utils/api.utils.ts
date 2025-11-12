import { ApiError } from "@/types";

type Options = {
  throwOnError?: boolean;
};

export async function enhancedFetch<T>(
  url: string,
  requestInit?: RequestInit,
  options?: Options
): Promise<T | undefined> {
  const { throwOnError = false } = options || {};

  try {
    const response = await fetch(url, requestInit);

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;

      try {
        const errorData = await response.json();
        if (errorData.message) errorMessage = errorData.message;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }

      const error = new ApiError(errorMessage, {
        status: response.status,
        statusText: response.statusText,
        url,
      });

      if (throwOnError) {
        throw error;
      }

      return Promise.reject(error);
    }

    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return undefined;
    }

    return await response.json();
  } catch (error) {
    if (throwOnError && error instanceof ApiError) {
      throw error;
    }

    const networkErrorMessage =
      error instanceof Error ? error.message : "Network error occurred";
    const networkErrorOptions = {
      url,
    };
    const networkError = new ApiError(networkErrorMessage, networkErrorOptions);

    if (throwOnError) {
      throw networkError;
    }

    return Promise.reject(networkError);
  }
}
