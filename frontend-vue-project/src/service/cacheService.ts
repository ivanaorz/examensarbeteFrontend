
class CacheService {
  storeLocal(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  fetchLocal(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeLocal(key: string): void {
    localStorage.removeItem(key);
  }
}

export default new CacheService();

  