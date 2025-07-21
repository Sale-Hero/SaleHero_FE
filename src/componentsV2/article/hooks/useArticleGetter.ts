import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {PageResponse} from "../../../types/common";
import {ArticleResponseDTO, ArticleSearchDTO} from "types/adminArticle";
import {getUserArticleDetailAsync, getUserArticlesAsync} from "../../../slice/ArticleSlice";

export function useArticleGetter() {
    const dispatch = useDispatch<any>();
    const [articleList, setArticleList] = useState<PageResponse<ArticleResponseDTO>>();
    const [articleDetail, setArticleDetail] = useState<ArticleResponseDTO>()
    const [totalElements, setTotalElements] = useState(0);

    const getUserArticles = useCallback(async (
        dto: ArticleSearchDTO
    ) => {
        const result = await dispatch(getUserArticlesAsync(dto)).unwrap();
        setArticleList(result);
        setTotalElements(result.totalElement);
    }, [dispatch]);

    const getUserArticleDetail = useCallback(async (
        articleId: number
    ) => {
        const result = await dispatch(getUserArticleDetailAsync(articleId)).unwrap();
        setArticleDetail(result);

    },[dispatch])

    return {
        getUserArticles, articleList,
        getUserArticleDetail, articleDetail,
        totalElements,
    };
}
