import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {ArticleDTO, ArticleDeleteDTO} from "../../../types/adminArticle";

export function useArticleActions() {
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false);

    // 실제로는 dispatch(saveArticleAsync(formData, id)) 등으로 API 연동 필요
    const saveArticle = useCallback(async (formData: ArticleDTO, articleId?: number) => {
        setLoading(true);
        try {
            // TODO: 실제 API 연동 필요
            // 예시: await dispatch(saveArticleAsync({formData, articleId}));
            return true;
        } catch (e) {
            return false;
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    // 실제로는 dispatch(deleteArticlesAsync(dto)) 등으로 API 연동 필요
    const deleteArticles = useCallback(async (dto: ArticleDeleteDTO) => {
        setLoading(true);
        try {
            // TODO: 실제 API 연동 필요
            // 예시: await dispatch(deleteArticlesAsync(dto));
            return true;
        } catch (e) {
            return false;
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    return {
        saveArticle,
        deleteArticles,
        loading
    };
} 