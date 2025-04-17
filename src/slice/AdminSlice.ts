import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {AdminApi} from "../api/AdminApi";

export const getCurrentCountAsync = createAsyncThunk("admin/getCurrentCount",
    (token:string) => executePromise(AdminApi.getCurrentCount(token)));