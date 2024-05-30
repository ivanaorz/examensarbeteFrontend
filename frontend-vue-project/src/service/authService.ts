import axios from 'axios';
import jwtService from './jwtService';
import { useRouter } from 'vue-router';
import type { AuthDetails } from '../model/authDetails';

const BASE_AUTH_URL = 'http://127.0.0.1:5000/auth/';

class AuthService {
  async register(authDetails: AuthDetails): Promise<string> {
    try {
      const response = await axios.post(BASE_AUTH_URL + 'register', authDetails);
      return response.data.message;
    } catch (err) {
      const error = err as any;
      console.error('Error during registration:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async login(email: string, password: string, username: string, author_name: string): Promise<string> {
    try {
      const response = await axios.post(BASE_AUTH_URL + 'login', { email, password, username, author_name });
      const token = response.data.token;
      jwtService.storeJwt(token);
      return 'Login successfully';
    } catch (err) {
      const error = err as any;
      console.error('Error during login:', error.response?.data?.message || error.message);
      if (error.response?.status === 401 && error.response?.data?.message === 'Invalid credentials') {
        throw new Error('Account does not exist');
      }
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }


  async logout(): Promise<void> {
    try {
      const token = jwtService.getJwt();
      if (token) {
        await axios.post(BASE_AUTH_URL + 'logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        jwtService.clearJwt();
        const router = useRouter();
        await router.push('/login');
      }
    } catch (err) {
      const error = err as any;
      console.error('Error during logout:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  }

  isAuthenticated(): boolean {
    return jwtService.getAuthToken() !== null;
  }
}

export default new AuthService();


