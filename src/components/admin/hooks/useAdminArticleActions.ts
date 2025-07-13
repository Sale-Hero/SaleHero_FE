import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {AdminArticlePostDTO, ArticleDeleteDTO} from "../../../types/adminArticle";
import {postAdminArticleAsync} from "../../../slice/AdminSlice";

export function useArticleActions() {
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false);

    // 실제로는 dispatch(saveArticleAsync(formData, id)) 등으로 API 연동 필요
    const saveArticle = useCallback(async (formData: AdminArticlePostDTO) => {
        setLoading(true);
        try {
            await dispatch(postAdminArticleAsync(formData));
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
