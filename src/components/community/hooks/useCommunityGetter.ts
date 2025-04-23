import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {PageResponse} from "../../../types/common";
import {getArticlesAsync} from "../../../slice/communitySlice";
import {CommunityCategory, CommunityDTO, CommunitySearchDTO} from "../../../types/community";

export function useCommunityGetter() {
    const dispatch = useDispatch<any>();
    const [posts, setPosts] = useState<PageResponse<CommunityDTO>>();
    const [totalPages, setTotalPages] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getArticles = useCallback(
        async (dto: CommunitySearchDTO) => {
            setIsLoading(true);
            try {
                // dto 객체 복사
                const requestDto = { ...dto };

                // 카테고리가 ALL이면 category 속성 제거
                if (requestDto.category === CommunityCategory.ALL) {
                    delete requestDto.category;
                }

                // 수정된 DTO로 요청
                const result = await dispatch(getArticlesAsync(requestDto));
                const postList: PageResponse<CommunityDTO> = result.payload;
                setPosts(postList);
                setTotalPages(postList.totalPages);
            } catch (e) {
                console.error("데이터 로딩 실패:", e);
            } finally {
                setIsLoading(false);
            }
        },
        [dispatch]
    );

    return {
        getArticles,
        posts, totalPages,
        isLoading
    };
}