import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {SubscribeApi} from "../api/SubscribeApi";
import {UnSubscribeDTO} from "../types/subscribe";

export const unSubscribeAsync =
    createAsyncThunk("subscribe/unSubscribe", (dto: UnSubscribeDTO) =>
        executePromise(SubscribeApi.unSubscribe(dto)));
