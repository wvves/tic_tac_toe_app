export class API {
  readonly baseUrl: BaseUrl;

  readonly headers?: RequestInit['headers'];

  constructor(
    baseUrl: BaseUrl,
    config?: { headers?: RequestInit['headers'] }
  ) {
    this.baseUrl = baseUrl;
    this.headers = config?.headers ?? {};
  }

  async request<T>(endpoint: string, options: RequestInit = {}) {
    const defaultConfig: RequestInit = {
      ...options,
      headers: { ...(!!options?.headers && options.headers), ...this.headers}
    };

    const config = defaultConfig;

    const response = await fetch(this.baseUrl + endpoint, config).catch((e) => ({
      ok: false,
      statusText: e.message,
      headers: config.headers,
      redirected: false,
      status: 503,
      type: 'error',
      url: this.baseUrl + endpoint,
      json: () => null
    }));

    return <T>(response as Response);
  }
  
  post<T>(endpoint: string, body: Record<string, any>, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      ...(!!body && { body: JSON.stringify(body)})
    });
  }

  get<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }
}