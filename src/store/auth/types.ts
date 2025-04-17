export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  email: string;
  username: string;
  nation: string;
}

export interface LoginCredentials {
  user_email: string;
  password: string;
}

export interface SignUpCredentials {
  user_email: string;
  username: string;
  password: string;
  nation: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
