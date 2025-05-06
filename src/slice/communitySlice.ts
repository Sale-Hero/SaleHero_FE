import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {CommunityPostDTO, CommunitySearchDTO} from "../types/community";
import {CommunityAPI} from "../api/CommunityAPI";

export const getArticlesAsync =
    createAsyncThunk("community/getArticles", (dto: CommunitySearchDTO) =>
        executePromise(CommunityAPI.getArticles(dto)));

export const postArticleAsync =
    createAsyncThunk("community/postArticle", (dto: CommunityPostDTO) =>
        executePromise(CommunityAPI.postArticle(dto)));