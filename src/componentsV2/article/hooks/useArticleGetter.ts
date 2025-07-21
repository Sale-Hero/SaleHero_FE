import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {PageResponse} from "../../../types/common";
import {ArticleResponseDTO, ArticleSearchDTO} from "types/adminArticle";
import {getUserArticlesAsync} from "../../../slice/ArticleSlice";

export function useArticleGetter() {
    const dispatch = useDispatch<any>();
    const [article, setArticle] = useState<PageResponse<ArticleResponseDTO>>();
    const [totalElements, setTotalElements] = useState(0);

    const getUserArticles = useCallback(async (
        dto: ArticleSearchDTO
    ) => {
        const result = await dispatch(getUserArticlesAsync(dto)).unwrap();
        setArticle(result);
        setTotalElements(result.totalElement);
    }, [dispatch]);

    return {
        getUserArticles,
        article,
        totalElements,
    };
}
