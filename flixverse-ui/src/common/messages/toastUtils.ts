

export function createNewToast(message: string, severity: 'success' | 'info' | 'warn' | 'error', sticky?: boolean, life?: number) {
  return {
    detail: message,
    summary: severity.toUpperCase(),
    severity: severity,
    sticky: sticky,
    life: life ?? 5000
  };
}
