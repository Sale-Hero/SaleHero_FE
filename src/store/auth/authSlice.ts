import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthResponse, AuthState, LoginCredentials, SignUpCredentials, User} from './types';
import axios from '../../config/api';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', {
        user_email: credentials.user_email,
        password: credentials.password
      });
      
      if (!response.data) {
        throw new Error('Empty response received from server');
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data?.message || 'Login failed');
      } else if (error.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue(error.message || 'Login failed');
      }
    }
  }
);

export const signup = createAsyncThunk<AuthResponse, SignUpCredentials>(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/register', {
        user_email: credentials.user_email,
        username: credentials.username,
        password: credentials.password,
        nation: credentials.nation
      });

      if (!response.data) {
        throw new Error('Empty response received from server');
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data?.message || 'Signup failed');
      } else if (error.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue(error.message || 'Signup failed');
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user as User;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Login failed';
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null; // Just show success message, don't auto-login
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Signup failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
