import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {AdminApi} from "../api/AdminApi";
import {AdminNewsLetterSearchDTO, NewsLetterDeleteDTO} from "../types/adminNewsLetter";
import {RawNewsLetterPutDTO, RawNewsLetterSearchDTO} from "../types/rawNewsLetter";
import {AdminArticlePostDTO, ArticleSearchDTO, ArticleDeleteDTO} from "../types/adminArticle";
import {
    AdminAnnouncementPostDTO,
    AnnouncementDeleteDTO,
    AnnouncementSearchDTO
} from "../types/adminAnnouncement";

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


// 아티클
export const getAdminArticlesAsync = createAsyncThunk("admin/getAdminArticles",
    (dto: ArticleSearchDTO) => executePromise(AdminApi.getAdminArticles(dto)));

export const postAdminArticleAsync = createAsyncThunk("admin/postAdminArticle",
    (dto: AdminArticlePostDTO) => executePromise(AdminApi.postAdminArticle(dto)));

export const putAdminArticleAsync = createAsyncThunk("admin/putAdminArticle",
    ({dto, articleId}: { dto:AdminArticlePostDTO, articleId: number }) => executePromise(AdminApi.putAdminArticle({
        dto,
        articleId
    })));

export const deleteAdminArticleAsync = createAsyncThunk("admin/deleteAdminArticle",
    (dto: ArticleDeleteDTO) => executePromise(AdminApi.deleteAdminArticle(dto)));



// Announcement
export const getAdminAnnouncementsAsync = createAsyncThunk("admin/getAdminAnnouncements",
    (dto: AnnouncementSearchDTO) => executePromise(AdminApi.getAdminAnnouncements(dto)));

export const postAdminAnnouncementAsync = createAsyncThunk("admin/postAdminAnnouncement",
    (dto: AdminAnnouncementPostDTO) => executePromise(AdminApi.postAdminAnnouncement(dto)));

export const putAdminAnnouncementAsync = createAsyncThunk("admin/putAdminAnnouncement",
    ({dto, announcementId}: { dto:AdminAnnouncementPostDTO, announcementId: number }) => executePromise(AdminApi.putAdminAnnouncement({
        dto,
        announcementId
    })));

export const deleteAdminAnnouncementAsync = createAsyncThunk("admin/deleteAdminAnnouncement",
    (dto: AnnouncementDeleteDTO) => executePromise(AdminApi.deleteAdminAnnouncement(dto)));
