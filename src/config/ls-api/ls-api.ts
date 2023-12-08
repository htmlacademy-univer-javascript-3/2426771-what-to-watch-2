class LSApi {
  saveToken (token: string | null): void {
    if (token) {
      localStorage.setItem('userToken', token);
    } else {
      localStorage.removeItem('userToken');
    }
  }

  readToken (): string | null {
    return localStorage.getItem('userToken');
  }
}

export const lsApi = new LSApi();
