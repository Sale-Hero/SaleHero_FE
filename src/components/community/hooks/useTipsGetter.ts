import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getTips} from "../../../slice/tipsSlice";
import {PageResponseDTO, ResponseDTO} from "../../../slice/common";

export function useTipsGetter() {
    const [tips, setTips] = useState<PageResponseDTO>();
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch<any>();
    // @ts-ignore
    const getTip = useCallback(async () => {
        try {
            const result: ResponseDTO = await dispatch(getTips()).unwrap();

            setTips(result.result)
            return result;
        } catch (e) {
            console.log('error message : ', e)
        }finally {
            setIsLoaded(true)
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!tips) {
            getTip().then();
        }
        // eslint-disable-next-line
    }, []);
    return{
        getTip, tips, isLoaded
    }
}