import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {PageResponse} from "../../../types/common";
import {AnnouncementDTO, AnnouncementSearchDTO} from "../../../types/adminAnnouncement";
import { getAdminAnnouncementsAsync } from "slice/AdminSlice";

export function useAdminAnnouncementGetter() {
    const dispatch = useDispatch<any>();
    const [announcements, setAnnouncements] = useState<PageResponse<AnnouncementDTO>>();
    const [totalElements, setTotalElements] = useState(0)
    const [loading, setLoading] = useState(false);

    const getAdminAnnouncements = useCallback(async (
            dto: AnnouncementSearchDTO
        ) => {
            setLoading(true);
            try {
                const result: PageResponse<AnnouncementDTO> = await dispatch(
                    getAdminAnnouncementsAsync(dto)).unwrap();
                setAnnouncements(result);
                setTotalElements(result.totalElement);
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false);
            }
        },
        [dispatch]
    );

    return {
        getAdminAnnouncements,
        announcements,
        totalElements,
        loading
    }
}
