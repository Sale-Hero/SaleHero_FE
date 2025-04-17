import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {createCommentAsync} from "../../../slice/commentSlice";
import {CommentPostDTO} from "../../../types/post";

export function useCommentFunctions() {
    const dispatch = useDispatch<any>();

    const createComment = useCallback(async (dto:CommentPostDTO) => {
            try {
                const result = await dispatch(createCommentAsync(dto)).unwrap();
                console.log(result)
                return result
            } catch (e){
                console.log(e)
                alert('일시적인 문제가 발생했습니다.\n다시 시도해주세요.')
            }
        },
        [dispatch]
    );

    return {
        createComment
    }
}