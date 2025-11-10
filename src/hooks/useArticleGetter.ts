import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { PageResponse } from "../types/common";
import { ArticleResponseDTO, ArticleSearchDTO } from "../types/adminArticle";
import { getUserArticlesAsync } from "../slice/ArticleSlice";

export function useArticleGetter() {
    const dispatch = useDispatch<any>();
    const [articles, setArticles] = useState<PageResponse<ArticleResponseDTO>>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getArticles = useCallback(
        async (dto: ArticleSearchDTO = { page: 0, size: 5 }) => {
            setIsLoading(true);
            try {
                const result = await dispatch(getUserArticlesAsync(dto));
                const articleList: PageResponse<ArticleResponseDTO> = result.payload;
                setArticles(articleList);
            } catch (e) {
                console.error("Article data loading failed:", e);
            } finally {
                setIsLoading(false);
            }
        },
        [dispatch]
    );

    return {
        getArticles,
        articles,
        isLoading,
    };
}
