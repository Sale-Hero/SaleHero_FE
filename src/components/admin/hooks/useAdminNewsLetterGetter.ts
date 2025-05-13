import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {PageResponse} from "../../../types/common";
import {getAdminNewsLettersAsync} from "../../../slice/AdminSlice";
import {AdminNewsLetterSearchDTO, NewsLetterResponseDTO} from "../../../types/adminNewsLetter";

export function useAdminNewsLetterGetter() {
    const dispatch = useDispatch<any>();
    const [newsLetter, setNewsLetter] = useState<PageResponse<NewsLetterResponseDTO>>()
    const [totalElements, setTotalElements] = useState(0)

    const getAdminNewsLetters = useCallback(async (
            dto: AdminNewsLetterSearchDTO
        ) => {

            try {
                const result: PageResponse<NewsLetterResponseDTO> = await dispatch(
                    getAdminNewsLettersAsync(dto)).unwrap();

                console.log(result)
                setTotalElements(result.totalElement)
                setNewsLetter(result);
            } catch (e) {
                console.log(e)
            }
        },
        [dispatch]
    );

    return {
        getAdminNewsLetters,
        newsLetter, totalElements,
    }
}