import React from "react";
import {UserDTO, UserRole} from "../../types/auth";

export interface UserInfoContextType {
    id: number;
    role: UserRole;
    nickName: String;
    userEmail: string;
    setUserInfo: (_: UserDTO) => void;
}

export const UserContext = React.createContext<UserInfoContextType>({
    id: 0,
    role: UserRole.USER,
    nickName: '',
    userEmail: '',
    setUserInfo: () => {}
});