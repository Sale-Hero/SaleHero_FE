import {executePromise} from "../util/sliceUtil";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {TipsApi} from "../api/TipsApi";

export const getTips = createAsyncThunk("tips/getTips",
    () => executePromise(TipsApi.getTips())
);
