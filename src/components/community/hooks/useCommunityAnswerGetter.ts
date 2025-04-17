import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {CommunityAnswerDetailDTO} from "../../../types/community";
import {JsonResponseDTO} from "../../../types/common";

export function useCommunityAnswerGetter() {
    const dispatch = useDispatch<any>();
    const [answerResult, setAnswerResult] = useState<JsonResponseDTO<CommunityAnswerDetailDTO>>();

    // @ts-ignore
    const getAnswerById = useCallback(async (
            {postId, token}: { postId: number, token: string; }
        ) => {
            try {

                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/answer-question/answer/${postId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    }
                );

                const data = await response.json();
                setAnswerResult(data);
            } catch (e) {
                console.log(e)
            }
        },
        [dispatch]
    );

    return {
        getAnswerById, answerResult
    }

}