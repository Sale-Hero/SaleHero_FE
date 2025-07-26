import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {PageResponse} from "../../../types/common";
import {ArticleSearchDTO} from "../../../types/adminArticle";
import {getAdminAnnouncementsAsync} from "../../../slice/AdminSlice";
import {AnnouncementDTO} from "../../../types/adminAnnouncement";

export function useAdminAnnouncementGetter() {
    const dispatch = useDispatch<any>();
    const [adminAnnouncementList, setAdminAnnouncementList] = useState<PageResponse<AnnouncementDTO>>();
    const [totalElements, setTotalElements] = useState(0);

    const getAdminAnnouncements = useCallback(async (
        dto: ArticleSearchDTO
    ) => {
        const result = await dispatch(getAdminAnnouncementsAsync(dto)).unwrap();
        setAdminAnnouncementList(result);
        setTotalElements(result.totalElement);
    }, [dispatch]);

    return {
        getAdminAnnouncements,
        adminAnnouncementList,
        totalElements,
    };
}
