class LSApi {
  saveToken (token: string | null): void {
    if (token) {
      localStorage.setItem('wtw-token', token);
    } else {
      localStorage.removeItem('wtw-token');
    }
  }

  readToken (): string | null {
    return localStorage.getItem('wtw-token');
  }
}

export const lsApi = new LSApi();
