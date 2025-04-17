import {useCookieFunctions} from "../../../components/common/hooks/useCookieFunctions";
import {useNavigate} from "react-router-dom";

export function useCommonFunctions() {
    /**
     * 공통 사용 함수들 정의
     */

    const { getCookie } = useCookieFunctions();
    const navigate = useNavigate();

    const checkAuth = () => {
        const accessToken = getCookie('accessToken');
        const isNotLogin = accessToken === null;

        if (isNotLogin) {
            alert("로그인 후 접근해주세요.");
            navigate('/signin');
        }
    };

    return{
        checkAuth
    }

}