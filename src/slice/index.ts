import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import CompanyInformationSlice from "./companyInformationSlice";

export const store = configureStore({
    reducer: {
        emoji: CompanyInformationSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;