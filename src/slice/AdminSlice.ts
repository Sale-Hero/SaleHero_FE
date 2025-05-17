import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {AdminApi} from "../api/AdminApi";
import {AdminNewsLetterSearchDTO, NewsLetterDeleteDTO} from "../types/adminNewsLetter";
import {RawNewsLetterPutDTO, RawNewsLetterSearchDTO} from "../types/rawNewsLetter";

export const getCurrentCountAsync = createAsyncThunk("admin/getCurrentCount",
    (token:string) => executePromise(AdminApi.getCurrentCount(token)));

export const getAdminNewsLettersAsync = createAsyncThunk("admin/getAdminNewsLetters",
    (dto: AdminNewsLetterSearchDTO) => executePromise(AdminApi.getAdminNewsLetters(dto)));



// 뉴스레터 로우데이터 ㅡㅡㅡㅡㅡㅡㅡ
export const getRawNewsLettersAsync = createAsyncThunk("admin/getRawNewsLetters",
    (dto: RawNewsLetterSearchDTO) => executePromise(AdminApi.getRawNewsLetters(dto)));

export const modifyRawNewsLetterAsync = createAsyncThunk("admin/modifyRawNewsLetter",
    (dto: RawNewsLetterPutDTO) => executePromise(AdminApi.modifyRawNewsLetter(dto)));

export const deleteRawNewsLetterAsync = createAsyncThunk("admin/deleteRawNewsLetter",
    (dto: NewsLetterDeleteDTO) => executePromise(AdminApi.deleteRawNewsLetter(dto)));