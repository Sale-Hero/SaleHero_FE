import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {unSubscribeAsync} from "../../../slice/subscribeSlice";
import {UnSubscribeDTO} from "../../../types/subscribe";

export function useSubscribeActions() {
    const dispatch = useDispatch<any>();

    const unSubscribe = useCallback(
        async ({email, token}: { email: string, token: string }) => {
            try {
                const dto:UnSubscribeDTO = {
                    email, token
                }
                await dispatch(unSubscribeAsync(dto));
            } catch (e) {
                console.error("데이터 로딩 실패:", e);
            }
        },
        [dispatch]
    );
    return{
        unSubscribe
    }
}
