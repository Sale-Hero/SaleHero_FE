import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {UserNewsLetterApi} from "../api/UserNewsLetterApi";

export const getUserNewsLettersAsync =
    createAsyncThunk("deal/getUserNewsLetters", () =>
        executePromise(UserNewsLetterApi.getUserNewsLetters()));

export const getUserNewsLetterAsync =
    createAsyncThunk("deal/getUserNewsLetter", (idx: string) =>
        executePromise(UserNewsLetterApi.getUserNewsLetter(idx)));