import {useContext} from "react";
import {UserContext} from "./userinfo/UserContext";

export const useUserInfo = () => useContext(UserContext);