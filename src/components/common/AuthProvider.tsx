import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
} from 'react';
import { useCookieFunctions } from "../../components/common/hooks/useCookieFunctions";

interface AuthProviderProps {
    children: ReactNode;
}
// Define the type for the AuthContext value
interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    refreshAccessToken: () => Promise<void>;
    logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
    refreshAccessToken: async () => {},
    logout: () => {}
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const { getCookie, setCookie, removeCookie } = useCookieFunctions();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 앱 시작 시 인증 상태 확인
    useEffect(() => {
        const checkAuth = () => {
            const accessToken = getCookie('accessToken');
            const refreshToken = getCookie('refreshToken');

            if (accessToken) {
                setIsAuthenticated(true);
            } else if (refreshToken) {
                // 액세스 토큰이 없지만 리프레시 토큰이 있는 경우
                refreshAccessToken();
            } else {
                setIsAuthenticated(false);
            }

            setIsLoading(false);
        };

        checkAuth();
    }, [getCookie]);

    const refreshAccessToken = async () => {
        try {
            const refreshToken = getCookie('refreshToken');
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
                credentials: 'include' // 쿠키 포함을 위해 추가
            });

            if (response.ok) {
                const data = await response.json();
                setCookie('accessToken', data.accessToken, {
                    maxAge: 60 * 60 // 1시간
                });
                setIsAuthenticated(true);
            } else {
                // 리프레시 실패
                logout();
            }
        } catch (error) {
            console.error('Failed to refresh token:', error);
            logout();
        }
    };

    const logout = () => {
        removeCookie('accessToken');
        // removeCookie('refreshToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            refreshAccessToken,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);