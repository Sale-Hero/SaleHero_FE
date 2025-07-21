import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {PageResponse} from "../../../types/common";
import {ArticleSearchDTO, ArticleResponseDTO} from "../../../types/adminArticle";
import {getAdminArticlesAsync} from "../../../slice/AdminSlice";

export function useAdminArticleGetter() {
    const dispatch = useDispatch<any>();
    const [article, setArticle] = useState<PageResponse<ArticleResponseDTO>>();
    const [totalElements, setTotalElements] = useState(0);

    const getAdminArticles = useCallback(async (
        dto: ArticleSearchDTO
    ) => {
        const result = await dispatch(getAdminArticlesAsync(dto)).unwrap();
        setArticle(result);
        setTotalElements(result.totalElement);
    }, [dispatch]);

    return {
        getAdminArticles,
        article,
        totalElements,
    };
}
