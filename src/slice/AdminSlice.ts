import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {AdminApi} from "../api/AdminApi";
import {AdminNewsLetterSearchDTO} from "../types/adminNewsLetter";

export const getCurrentCountAsync = createAsyncThunk("admin/getCurrentCount",
    (token:string) => executePromise(AdminApi.getCurrentCount(token)));

export const getAdminNewsLettersAsync = createAsyncThunk("admin/getAdminNewsLetters",
    (dto: AdminNewsLetterSearchDTO) => executePromise(AdminApi.getAdminNewsLetters(dto)));