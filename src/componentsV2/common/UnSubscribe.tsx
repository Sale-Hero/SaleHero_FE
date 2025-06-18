import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSubscribeActions} from "./hooks/useSubscribeActions";

export function UnSubscribe() {

    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const email = window.location.pathname.split('/').pop();
    const token = params.get('token');

    const { unSubscribe } = useSubscribeActions();

    useEffect(() => {
        if (email === undefined || token === null) {
            alert("일시적인 문제가 발생했습니다. 다시 시도해주세요.");
            navigate("/");
            return;
        }

        unSubscribe({email, token})
            .then(() => {
                alert('구독이 취소되었습니다.');
                navigate('/');
            })
            .catch(() => {
                alert('구독 취소에 실패했습니다.');
                navigate('/');
            });
    }, []);

    return(
        <>
            구독 취소중입니다...
        </>
    )
}
