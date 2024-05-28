class CacheService {
    private static instance: CacheService;
  
    private constructor() {}
  
    public static getInstance(): CacheService {
      if (!CacheService.instance) {
        CacheService.instance = new CacheService();
      }
      return CacheService.instance;
    }
  
    public setToken(token: string): void {
      localStorage.setItem('auth_token', token);
    }
  
    public getToken(): string | null {
      return localStorage.getItem('auth_token');
    }
  
    public removeToken(): void {
      localStorage.removeItem('auth_token');
    }
  }
  
  export default CacheService.getInstance();
  