import {createAsyncThunk} from "@reduxjs/toolkit";
import {ArticleSearchDTO} from "../types/adminArticle";
import {executePromise} from "../util/sliceUtil";
import {ArticleApi} from "../api/ArticleApi";

export const getUserArticlesAsync = createAsyncThunk("user/getUserArticles",
    (dto: ArticleSearchDTO) => executePromise(ArticleApi.getUserArticles(dto)));

export const getUserArticleDetailAsync = createAsyncThunk("user/getUserArticleDetail",
    (articleId: number) => executePromise(ArticleApi.getUserArticleDetail(articleId)));
