import {executePromise} from "../util/sliceUtil";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {SignupApi} from "../api/SignupApi";
import {UserPostDTO} from "../types/signup";

export const register = createAsyncThunk("user/register",
    (user: UserPostDTO) => executePromise(SignupApi.register(user))
);
export const duplicateCheck = createAsyncThunk("user/duplicateCheck", (email: string) =>
    executePromise(SignupApi.duplicateCheck(email)));

export const googleLogin = createAsyncThunk("user/googleLogin", () =>
    executePromise(SignupApi.googleLogin())
);
