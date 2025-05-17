import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {RawNewsLetterPutDTO} from "../../../../types/rawNewsLetter";
import {deleteRawNewsLetterAsync, modifyRawNewsLetterAsync} from "../../../../slice/AdminSlice";
import {NewsLetterDeleteDTO} from "../../../../types/adminNewsLetter";

export function useRawNewsLetterActions() {
    const dispatch = useDispatch<any>();

    const modifyRawNewsLetters = useCallback(
        async (dto: RawNewsLetterPutDTO) => {
            try {
                const result = await dispatch(modifyRawNewsLetterAsync(dto)).unwrap();

                console.log(result)
            } catch (e) {
                console.log(e)
            }
        },
        [dispatch]
    );

    const deleteRawNewsLetter = useCallback(
        async (dto: NewsLetterDeleteDTO) => {

            try {
                const result = await dispatch(deleteRawNewsLetterAsync(dto)).unwrap();
                console.log(result)
            } catch (e) {
                console.log(e)
            }
        },
        [dispatch]
    );

    return{
        modifyRawNewsLetters, deleteRawNewsLetter,
    }
}