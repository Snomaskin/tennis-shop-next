export default function createUrlWithQuery(baseUrl: string, params?: Record<string, string | number>): string {
  const url = new URL(baseUrl);
  if (params) {
    Object.entries(params).forEach(([key, value]) => 
      url.searchParams.append(key, value.toString())
    );
  }
  
  return url.toString();
}