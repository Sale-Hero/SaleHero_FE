import {ThemeProvider, CssBaseline} from '@mui/material';
import {Outlet, useLocation} from "react-router-dom";
import theme from './theme';
import {useEffect, useLayoutEffect} from 'react';
import {AuthProvider} from "./components/common/AuthProvider";
import {UserProvider} from "./hooks/userinfo/UserProvider";
import {HeaderV2} from "./componentsV2/common/HeaderV2";
import {FooterV2} from "./componentsV2/common/FooterV2";

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    // 페이지 이동 시 스크롤 처리
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // 새로고침 시 스크롤 처리
    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AuthProvider>
                <UserProvider>
                    <div className="App">
                        {!isAdminRoute && <HeaderV2/>}
                        <Outlet/>
                        {!isAdminRoute && <FooterV2/>}
                    </div>
                </UserProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
