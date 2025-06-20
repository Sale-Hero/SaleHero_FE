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
            .then((result) => {
                alert(result?.message || '구독이 취소되었습니다.');
                navigate('/');
            })
            .catch(() => {
                alert('구독 취소에 실패했습니다.');
                navigate('/');
            });
    }, []);

    return (
        <div style={{minHeight: '100vh'}} className="flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                {/* 로딩 스피너 */}
                <div className="flex justify-center mb-12">
                    <div style={{width: '6rem', height: '6rem'}} className="border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>

                {/* 메시지 */}
                <div>
                    <h1 style={{fontSize: '3rem'}} className="font-semibold text-gray-800 mb-6">
                        구독 취소중입니다
                    </h1>
                    <p style={{fontSize: '1.25rem'}} className="text-gray-600">
                        잠시만 기다려주세요
                    </p>
                </div>
            </div>
        </div>
    );
}
