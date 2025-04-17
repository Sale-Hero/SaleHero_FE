import {executePromise} from "../util/sliceUtil";
import {AuthApi} from "../api/AuthApi";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getCurrentUserAsync = createAsyncThunk("users/getCurrentUser",
    () => executePromise(AuthApi.getCurrentUser()));