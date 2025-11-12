type ApiErrorOptions = {
  status?: number;
  statusText?: string;
  message?: string;
  url?: string;
};

export class ApiError extends Error {
  status?: number;
  statusText?: string;
  url?: string;

  constructor(message: string, options?: ApiErrorOptions) {
    super(message);
    this.name = "ApiError";
    this.status = options?.status;
    this.statusText = options?.statusText;
    this.url = options?.url;
  }
}
