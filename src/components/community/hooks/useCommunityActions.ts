import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {CommunityPostDTO} from "../../../types/community";
import {postArticleAsync} from "../../../slice/communitySlice";
import {useTokens} from "../../../config/useTokens";

export function useCommunityActions() {
    const dispatch = useDispatch<any>();
    const {setToken} = useTokens();

    const postArticle = useCallback(
        async (dto: CommunityPostDTO) => {
            try {
                setToken();
                await dispatch(postArticleAsync(dto));
            } catch (e) {
                console.error("데이터 로딩 실패:", e);
            }
        },
        [dispatch]
    );

    return {
        postArticle
    }
}