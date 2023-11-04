

export function createNewToast(message: string, severity: 'success' | 'info' | 'warn' | 'error', sticky?: boolean, life?: number, title?: string) {
  return {
    detail: message,
    summary: title ?? severity.toUpperCase(),
    severity: severity,
    sticky: sticky,
    life: life ?? 5000,
  };
}
