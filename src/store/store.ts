import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import communityReducer from './community/communitySlice';
import companyReducer from './company/companySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    community: communityReducer,
    company: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
