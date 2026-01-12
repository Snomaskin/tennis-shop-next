interface FetcherOptions extends RequestInit {
  url: string;
  cookies?: string;
};

async function fetcher({ url, cookies, ...options }: FetcherOptions) {
  try {
    console.log("url", url)
    const res = await fetch(url, {
      ...options,
      headers:{
        "Content-Type": "application/json",
        ...(cookies ? { cookie: cookies } : {}),
        ...(options.headers ?? {})
      },
      credentials: options.credentials ?? "include"
    });
    if (!res.ok) {
      const message = await res.text();
      throw new Error(`API error: ${res.status} ${message}`);
    }
    return res;
  } catch (e) {
    console.error("Server error", e);
    
    if (e instanceof Error) throw e;
    throw new Error(String(e));
  }
}

async function get(endpoint: string) {
  return fetcher({
    url: endpoint, 
    method: "GET",
  });
}

async function post(endpoint: string, data: object) {
  return fetcher({
    url: endpoint, 
    method: "POST",
    body: JSON.stringify(data)
  });
}

export { get, post }