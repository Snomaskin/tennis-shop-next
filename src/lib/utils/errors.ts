function getErrorMessage<T>(e: T): string {
  return (e instanceof Error) ? e.message : String(e);
}

export { getErrorMessage }