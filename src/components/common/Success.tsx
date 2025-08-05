import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getCurrentUserAsync} from "../../slice/AuthSlice";
import {MainApi} from "../../api/MainApi";
import {UserDTO} from "types/auth";
import {AppDispatch} from "../../store/store";
import {useUserInfo} from "../../hooks/hooks";

export function Success() {
    const location = useLocation(); // 현재 URL 정보를 가져옴
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { setUserInfo } = useUserInfo();

    const getCookie = (name: string): string | null => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [key, value] = cookie.trim().split('=');
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    };

    useEffect(() => {
        const setup = async () => {
            const accessToken = getCookie('accessToken');

            if (accessToken) {
                MainApi.getInstance().setToken(accessToken);
            }

            try {
                // 쿠키의 토큰을 직접 읽지 말고 API로 검증
                const result:UserDTO = await dispatch(getCurrentUserAsync()).unwrap();
                setUserInfo(result);
                navigate('/', {replace: true});
            } catch (error) {
                console.error('토큰 검증 실패:', error);
                navigate('/login');
            }
        };

        setup();
    }, [location, dispatch, navigate]);

    return (
        <>
        </>
    )
}
