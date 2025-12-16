interface FetcherOptions extends RequestInit {
  url: string;
};

async function fetcher<T>({ url, ...options }: FetcherOptions): Promise<T> {
  try {
    console.log("url", url)
    const res = await fetch(url, {
      ...options,
      headers:{
        "Content-Type": "application/json",
        ...(options.headers ?? {})
      },
      credentials: options.credentials ?? "include"
    });
    if (!res.ok) {
      const message = await res.text();
      throw new Error(`API error: ${res.status} ${message}`);
    }
    return res.json() as Promise<T>;
  } catch (e) {
    console.error("Server error", e);
    
    if (e instanceof Error) throw e;
    throw new Error(String(e));
  }
}

async function get<T>(endpoint: string): Promise<T> {
  return fetcher<T>({
    url: endpoint, 
    method: "GET",
  });
}

async function post<T>(endpoint: string, data: object): Promise<T> {
  return fetcher<T>({
    url: endpoint, 
    method: "POST",
    body: JSON.stringify(data)
  });
}

export { get, post }