import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {PageResponse} from "../../../types/common";
import {getUserNewsLetterAsync, getUserNewsLettersAsync} from "../../../slice/userNewsLetterSlice";
import {UserNewsLetterDTO} from "../../../types/deal";

export function useUserNewsLetterGetter() {
    const dispatch = useDispatch<any>();
    const [newsLetters, setNewsLetters] = useState<PageResponse<UserNewsLetterDTO>>()
    const [newsLetter, setNewsLetter] = useState<UserNewsLetterDTO>()
    const [totalPages, setTotalPages] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getNewsLetters = useCallback(
        async () => {
            setIsLoading(true);
            try {
                const result = await dispatch(getUserNewsLettersAsync());
                const postList: PageResponse<UserNewsLetterDTO> = result.payload;
                setNewsLetters(postList);
                setTotalPages(postList.totalPages);
            } catch (e) {
                console.error("데이터 로딩 실패:", e);
            } finally {
                setIsLoading(false);
            }
        },
        [dispatch]
    );

    const getNewsLetter = useCallback(
        async (idx: string) => {
            setIsLoading(true);
            try {
                const result = await dispatch(getUserNewsLetterAsync(idx));
                setNewsLetter(result.payload)
            } catch (e) {
                console.error("데이터 로딩 실패:", e);
            } finally {
                setIsLoading(false);
            }
        },
        [dispatch]
    );

    return {
        getNewsLetters,
        newsLetters, totalPages,
        isLoading,

        getNewsLetter, newsLetter
    };
}