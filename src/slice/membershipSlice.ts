import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MembershipState {
  currentPlan: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MembershipState = {
  currentPlan: null,
  isLoading: false,
  error: null,
};

export const subscribeToPlan = createAsyncThunk(
  'membership/subscribe',
  async (planName: string, { rejectWithValue }) => {
    try {
      // API call will be implemented here
      return planName;
    } catch (error) {
      return rejectWithValue('구독 신청 중 오류가 발생했습니다.');
    }
  }
);

export const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    setCurrentPlan: (state, action: PayloadAction<string>) => {
      state.currentPlan = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToPlan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPlan = action.payload;
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPlan, clearError } = membershipSlice.actions;

export default membershipSlice.reducer; 