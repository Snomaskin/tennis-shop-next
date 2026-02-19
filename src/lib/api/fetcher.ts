interface FetcherArgs {
  url: string;
  options?: RequestInit;
}

async function fetcher({ url, options }: FetcherArgs): Promise<Response> {
  const res = await fetch(url, options);

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`API error: ${res.status} ${message}`);
  }

  return res;
}

async function get(endpoint: string, options?: RequestInit): Promise<Response> {
  return fetcher({
    url: endpoint,
    options: {
      method: "GET",
      ...options,
    },
  });
}

async function post(endpoint: string, options?: RequestInit & { data?: object }): Promise<Response> {
  const { data, ...fetchOptions } = options || {};

  return fetcher({
    url: endpoint,
    options: {
      method: "POST",
      body: JSON.stringify(data ?? {}),
      headers: {
        "Content-Type": "application/json",
        ...(fetchOptions?.headers ?? {}),
      },
      ...options,
    },
  });
}

async function del(endpoint: string, options?: RequestInit & { data?: object }): Promise<Response> {
  const { data, ...fetchOptions } = options || {};

  return fetcher({
    url: endpoint,
    options: {
      method: "DELETE",
      body: JSON.stringify(data ?? {}),
      headers: {
        "Content-Type": "application/json",
        ...(fetchOptions?.headers ?? {}),
      },
      ...options,
    },
  });
}

async function patch(endpoint: string, options?: RequestInit & { data?: object }): Promise<Response> {
  const { data, ...fetchOptions } = options || {};

  return fetcher({
    url: endpoint,
    options: {
      method: "PATCH",
      body: JSON.stringify(data ?? {}),
      headers: {
        "Content-Type": "application/json",
        ...(fetchOptions?.headers ?? {}),
      },
      ...options,
    },
  });
}

export { get, post, del, patch }