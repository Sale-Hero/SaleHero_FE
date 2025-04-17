import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { executePromise } from "../util/sliceUtil";
import { SignInApi } from "../api/SignInApi";
import { LoginDTO } from "../types/signIn";

interface AuthState {
  user_email: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user_email: null,
  isAuthenticated: false,
};

export const login = createAsyncThunk(
    "auth/login",
    (user: LoginDTO) => executePromise(SignInApi.loginUser(user))
);

const signInSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<{ user_email: string }>) => {
      state.user_email = action.payload.user_email;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user_email = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user_email = action.payload.user_email;
      state.isAuthenticated = true;
    });
  },
});

export const { setAuthUser, clearAuth } = signInSlice.actions;
export default signInSlice.reducer;
