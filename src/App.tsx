import {ThemeProvider, CssBaseline} from '@mui/material';
import {Outlet, useLocation} from "react-router-dom";
import {Header} from "./components/common/Header";
import {Footer} from "./components/common/Footer";
import theme from './theme';
import {useEffect, useLayoutEffect} from 'react';
import {AuthProvider} from "./components/common/AuthProvider";

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
                <div className="App">
                    {!isAdminRoute && <Header/>}
                    <Outlet/>
                    {!isAdminRoute && <Footer/>}
                </div>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
