import {ChildrenProp} from "../../types/common";
import React, {useState} from "react";
import {UserContext} from "./UserContext";
import {UserDTO, UserRole} from "../../types/auth";

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
    const setUserInfo = (
        dto: UserDTO
    ) =>{
        setId(dto.id);
        setNickName(dto.nickName)
        setUserEmail(dto.userEmail)
        setRole(dto.role)
    }

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
