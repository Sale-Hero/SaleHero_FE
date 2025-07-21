import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {PageResponse} from "../../../types/common";
import {ArticleResponseDTO, ArticleSearchDTO} from "types/adminArticle";
import {getUserArticlesAsync} from "../../../slice/ArticleSlice";

export function useArticleGetter() {
    const dispatch = useDispatch<any>();
    const [articleList, setArticleList] = useState<PageResponse<ArticleResponseDTO>>();
    const [totalElements, setTotalElements] = useState(0);

    const getUserArticles = useCallback(async (
        dto: ArticleSearchDTO
    ) => {
        const result = await dispatch(getUserArticlesAsync(dto)).unwrap();
        setArticleList(result);
        setTotalElements(result.totalElement);
    }, [dispatch]);

    return {
        getUserArticles,
        articleList,
        totalElements,
    };
}
