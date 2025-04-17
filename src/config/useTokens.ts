import {useCookies} from "react-cookie";
import {MainApi} from "../api/MainApi";

export function useTokens() {
    const [cookie] = useCookies(['accessToken', 'refreshToken']);
    const accessToken = cookie.accessToken;
    const refreshToken = cookie.refreshToken;

    const setToken = () => {
        if (accessToken) {
            document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60};`;
            MainApi.getInstance().setToken(accessToken);
        }
        if (refreshToken) {
            document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${60 * 60 * 24 * 7};`;
        }
    }

    return{
        accessToken, refreshToken,
        setToken,

    }
}