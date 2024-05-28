import cacheService from './cacheService';
import type { TokenPayload, TokenDetails } from '../model/tokenDetails';

const JWT_TOKEN_KEY = 'JWT_TOKEN';

class JwtService {
  storeJwt(token: string): void {
    cacheService.storeLocal(JWT_TOKEN_KEY, token);
  }

  getJwt(): string | null {
    return cacheService.fetchLocal(JWT_TOKEN_KEY);
  }

  clearJwt(): void {
    cacheService.removeLocal(JWT_TOKEN_KEY);
  }

  decodeTokenPayload(token: string): TokenPayload | string {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token');
      }
      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch (error) {
      return 'Invalid token. Please log in again.';
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeTokenPayload(token);
    if (typeof decoded === 'string') {
      return true;
    }
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  }

  getAuthToken(): string | null {
    const token = this.getJwt();
    if (token && !this.isTokenExpired(token)) {
      return token;
    }
    this.clearJwt();
    return null;
  }
}

export default new JwtService();



