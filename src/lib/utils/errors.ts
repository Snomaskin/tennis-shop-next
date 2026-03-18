function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (e instanceof Response) return e.statusText || `HTTP ${e.status}`;
  return String(e);
}

async function getErrorMessageAsync(e: unknown): Promise<string> {
  if (e instanceof Response) {
    try {
      const json = await e.json();
      return json.message || JSON.stringify(json);
    } catch {
      return getErrorMessage(e);
    }
  }

  return getErrorMessage(e);
}
export { getErrorMessage, getErrorMessageAsync };
