import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentPostDTO} from "../types/post";
import {executePromise} from "../util/sliceUtil";
import {CommentApi} from "../api/CommentApi";

export const createCommentAsync = createAsyncThunk("user/createComment",
    (dto: CommentPostDTO) => executePromise(CommentApi.createComment(dto)));