import { LoginData, RegisterData, AuthResponse } from '../types/auth.types';

// Mock veritabanı
const mockUsers = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
  },
];

// Simüle edilmiş API gecikmesi
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockAuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    // 1 saniye gecikme (gerçek API çağrısı simüle etmek için)
    await delay(1000);

    const user = mockUsers.find(u => u.email === data.email);

    if (!user || user.password !== data.password) {
      throw new Error('E-posta veya şifre yanlış');
    }

    const mockToken = 'mock-jwt-token-' + Date.now() + '-' + Math.random().toString(36).substring(7);

    return {
      token: mockToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: new Date().toISOString(),
      },
    };
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    // 1 saniye gecikme (gerçek API çağrısı simüle etmek için)
    await delay(1000);

    // Email zaten mevcut mu kontrol et
    if (mockUsers.some(u => u.email === data.email)) {
      throw new Error('Bu e-posta zaten kayıtlı');
    }

    // Username zaten mevcut mu kontrol et
    if (mockUsers.some(u => u.username === data.username)) {
      throw new Error('Bu kullanıcı adı zaten kullanılıyor');
    }

    // Yeni kullanıcı oluştur
    const newUser = {
      id: 'user-' + Date.now(),
      email: data.email,
      password: data.password,
      username: data.username,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
    };

    mockUsers.push(newUser);

    const mockToken = 'mock-jwt-token-' + Date.now() + '-' + Math.random().toString(36).substring(7);

    return {
      token: mockToken,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        createdAt: new Date().toISOString(),
      },
    };
  }

  async logout(): Promise<void> {
    await delay(500);
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

export const mockAuthService = new MockAuthService();
