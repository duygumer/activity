import { LoginData, RegisterData, AuthResponse } from '../types/auth.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class AuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Giriş başarısız');
    }

    const result = await response.json();
    
    // Token'ı localStorage'a kaydet
    if (result.token) {
      localStorage.setItem('token', result.token);
    }

    return result;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Kayıt başarısız');
    }

    const result = await response.json();
    
    // Token'ı localStorage'a kaydet
    if (result.token) {
      localStorage.setItem('token', result.token);
    }

    return result;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
