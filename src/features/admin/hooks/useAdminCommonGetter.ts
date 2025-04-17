import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {getCurrentCountAsync} from "../../../slice/AdminSlice";
import {AdminCurrentCount} from "../../../types/adminUser";
import {useCookieFunctions} from "../../../components/common/hooks/useCookieFunctions";
import {JsonResponseDTO} from "../../../types/common";

export function useAdminCommonGetter() {

    const dispatch = useDispatch<any>();
    const [currentCount, setCurrentCount] = useState<AdminCurrentCount>()
    const { getCookie } = useCookieFunctions();

    const getCompanyInfo = useCallback(async () => {
            try {
                const accessToken = getCookie('accessToken');
                if (accessToken) {
                    const result: JsonResponseDTO<AdminCurrentCount> = await dispatch(
                        getCurrentCountAsync(accessToken)).unwrap();

                    setCurrentCount(result.data);
                }
            } catch (e) {
                console.log(e)
            }
        },
        [dispatch]
    );
    return ({
        getCompanyInfo, currentCount,

    });
}