import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {PageResponse} from "../../../../types/common";
import {RawNewsLetterDTO, RawNewsLetterSearchDTO} from "../../../../types/rawNewsLetter";
import {getRawNewsLettersAsync} from "../../../../slice/AdminSlice";

export function useRawNewsLetterGetter() {
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const [rawNewsLetter, setRawNewsLetter] = useState<PageResponse<RawNewsLetterDTO>>()
    const [totalElements, setTotalElements] = useState(0)

    const getRawNewsLetters = useCallback(async (
            dto: RawNewsLetterSearchDTO
        ) => {
            setLoading(true);
            try {
                const result: PageResponse<RawNewsLetterDTO> = await dispatch(
                    getRawNewsLettersAsync(dto)).unwrap();

                console.log(result)
                setTotalElements(result.totalElement)
                setRawNewsLetter(result);
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false);
            }
        },
        [dispatch]
    );

    return{
        getRawNewsLetters, rawNewsLetter, totalElements,loading
    }
}