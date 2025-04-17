import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CompanyState, CompanyInformation } from './types';
import axios from 'axios';

const initialState: CompanyState = {
  companies: [],
  selectedCompany: null,
  loading: false,
  error: null,
};

export const fetchCompanies = createAsyncThunk<CompanyInformation[]>(
  'company/fetchCompanies',
  async () => {
    const { data } = await axios.get('/api/companies') as { data: CompanyInformation[] };
    return data;
  }
);

export const fetchCompanyById = createAsyncThunk<CompanyInformation, string>(
  'company/fetchCompanyById',
  async (id) => {
    const { data } = await axios.get(`/api/companies/${id}`) as { data: CompanyInformation };
    return data;
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    clearSelectedCompany: (state) => {
      state.selectedCompany = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch companies';
      })
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch company';
      });
  },
});

export const { clearSelectedCompany } = companySlice.actions;
export default companySlice.reducer;
