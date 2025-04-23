import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {CommunitySearchDTO} from "../types/community";
import {CommunityAPI} from "../api/CommunityAPI";

export const getArticlesAsync =
    createAsyncThunk("community/getArticles", (dto: CommunitySearchDTO) =>
        executePromise(CommunityAPI.getArticles(dto)));