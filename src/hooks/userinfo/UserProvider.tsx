import {ChildrenProp} from "../../types/common";
import React, {useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import {UserDTO, UserRole} from "../../types/auth";
import {useCookieFunctions} from "../../components/common/hooks/useCookieFunctions";
import {jwtDecode} from "jwt-decode";

declare global {
    interface Window {
        openUrl: any;
        dataLayer: Record<string, any>[];
        gtag: (...args: any[]) => void;
    }
}

export function UserProvider({ children }: ChildrenProp) {
    const [id, setId] = useState(0);
    const [nickName, setNickName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [role, setRole] = useState(UserRole.USER)

    const { getCookie } = useCookieFunctions();

    // JWT 토큰에서 사용자 정보 추출
    const extractUserInfoFromToken = (token: string) => {
        try {
            const decoded: any = jwtDecode(token);

            // 토큰 페이로드에 있는 정보 사용
            setId(decoded.id || 0);
            setNickName(decoded.nickName || "");
            setUserEmail(decoded.sub || "");
            setRole(decoded.role || UserRole.USER);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    };

    const setUserInfo = (dto: UserDTO) => {
        setId(dto.id);
        setNickName(dto.nickName);
        setUserEmail(dto.userEmail);
        setRole(dto.role);
    };

    // 컴포넌트 마운트 또는 쿠키 변경 시 토큰 확인
    useEffect(() => {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
            extractUserInfoFromToken(accessToken);
        }
    }, [getCookie]);

    return (
        <UserContext.Provider
            value={{
                id: id,
                role: role,
                nickName: nickName,
                userEmail: userEmail,
                setUserInfo: setUserInfo,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
