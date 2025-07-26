import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {
    deleteAdminAnnouncementAsync,
    postAdminAnnouncementAsync,
    putAdminAnnouncementAsync
} from "../../../slice/AdminSlice";
import {AdminAnnouncementPostDTO, AnnouncementDeleteDTO} from "../../../types/adminAnnouncement";

export function useAnnouncementActions() {
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false);

    const saveAnnouncement = useCallback(async (formData: AdminAnnouncementPostDTO) => {
        setLoading(true);
        try {
            await dispatch(postAdminAnnouncementAsync(formData));
            return true;
        } catch (e) {
            return false;
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const updateAnnouncement = useCallback(
        async ({formData, announcementId}: {formData: AdminAnnouncementPostDTO, announcementId: number}) => {
        setLoading(true);
        try {
            await dispatch(putAdminAnnouncementAsync({dto: formData, announcementId}));
            return true;
        } catch (e) {
            return false;
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const deleteAnnouncements = useCallback(
        async (dto: AnnouncementDeleteDTO) => {
        setLoading(true);
        try {
            await dispatch(deleteAdminAnnouncementAsync(dto));
            return true;
        } catch (e) {
            return false;
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    return {
        saveAnnouncement,
        updateAnnouncement,
        deleteAnnouncements,
        loading
    };
}
