import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { SliceState, Status } from "../types/common";
import { AxiosResponse } from "axios";

export const addCases = <T extends SliceState>(
  builder: ActionReducerMapBuilder<T>,
  asyncThunk: AsyncThunk<any, any, {}>
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.status = Status.LOADING;
    })
    .addCase(asyncThunk.rejected, (state) => {
      state.status = Status.FAILED;
    })
    .addCase(asyncThunk.fulfilled, (state) => {
      state.status = Status.IDLE;
    });
};

export const executePromise = async <T>(f: () => Promise<AxiosResponse<T>>) => {
  try {
    return await f();
  } catch (error: any) {
    throw new Error(JSON.stringify(error?.response?.data));
  }
};
