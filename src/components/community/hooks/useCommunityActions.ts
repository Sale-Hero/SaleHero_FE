import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {CommunityPostDTO} from "../../../types/community";
import {postArticleAsync} from "../../../slice/communitySlice";

export function useCommunityActions() {
    const dispatch = useDispatch<any>();
    const [, setIsLoading] = useState<boolean>(false);

    const postArticle = useCallback(
        async (dto: CommunityPostDTO) => {
            setIsLoading(true);
            try {
                 await dispatch(postArticleAsync(dto));
            } catch (e) {
                console.error("데이터 로딩 실패:", e);
            } finally {
                setIsLoading(false);
            }
        },
        [dispatch]
    );

    return{
        postArticle
    }
}