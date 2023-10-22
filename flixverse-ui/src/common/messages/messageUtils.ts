
export function createNewMessage(message: string, severity: 'success' | 'info' | 'warn' | 'error', sticky?: boolean) {
  return {
    detail: message,
    summary: severity.toUpperCase(),
    severity: severity,
    sticky: sticky
  };
}
