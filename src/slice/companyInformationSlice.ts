import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { executePromise } from "../util/sliceUtil";
import { CompanyInformationApi } from "../api/CompanyInformationApi";
import { CompanyInformationDTO } from "../types/companyInformation";

export enum Status {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
}

interface CompanyInformationState {
    isApiCalled: boolean;
    test: string;
    status: Status;
    companyInformation: CompanyInformationDTO[] | null;
}

export const getCompanyInformation = createAsyncThunk("company/getCompanyInformation",
    ({ country, location }: { country: string; location: string }) =>
        executePromise<CompanyInformationDTO[]>(CompanyInformationApi.getCompanyLists(country, location))
);

const initialState: CompanyInformationState = {
    isApiCalled: true,
    test: "TEST",
    status: Status.IDLE,
    companyInformation: null,
};

export const companyInformationSlice = createSlice({
    name: "companyInformation",
    initialState,
    reducers: {
        setApiCalled: (state) => {
            state.isApiCalled = !state.isApiCalled;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompanyInformation.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getCompanyInformation.rejected, (state) => {
                state.status = Status.FAILED;
            })
            .addCase(getCompanyInformation.fulfilled, (state, action) => {
                state.status = Status.SUCCEEDED;
                state.companyInformation = action.payload;
            });
    },
});

export const { setApiCalled } = companyInformationSlice.actions;
export default companyInformationSlice.reducer;