import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {AdminArticlePostDTO, ArticleDeleteDTO} from "../../../types/adminArticle";
import {deleteAdminArticleAsync, postAdminArticleAsync, putAdminArticleAsync} from "../../../slice/AdminSlice";

export function useArticleActions() {
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false);

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

    const updateArticle = useCallback(
        async ({formData,articleId}: {formData:AdminArticlePostDTO, articleId: number}) => {
        setLoading(true);
        try {
            await dispatch(putAdminArticleAsync({dto: formData, articleId}));
            return true;
        } catch (e) {
            return false;
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const deleteArticles = useCallback(
        async (dto: ArticleDeleteDTO) => {
        setLoading(true);
        try {
            await dispatch(deleteAdminArticleAsync(dto));
            return true;
        } catch (e) {
            return false;
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    return {
        saveArticle,
        updateArticle,
        deleteArticles,
        loading
    };
}
