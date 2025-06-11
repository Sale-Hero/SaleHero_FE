import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookieFunctions} from '../../components/common/hooks/useCookieFunctions';
import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
    Badge,
    Avatar,
    Menu,
    MenuItem,
    alpha,
    styled,
} from '@mui/material';
import {motion} from 'framer-motion';
import {
    Forum,
    Login,
    Logout,
    Menu as MenuIcon,
    Person,
    Notifications,
    Home,
    ShoppingBag,
    ContactSupport,
    ArrowForward
} from '@mui/icons-material';
import logo from '../../assets/img/sale_hero_ico.png';
import {HeaderStatus} from 'types/common';
import {useUserInfo} from "../../hooks/hooks";

// 스타일 컴포넌트 정의
const GlassAppBar = styled(AppBar)(({ theme }) => ({
    background: 'rgba(7, 11, 20, 0.8)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

interface GradientButtonProps {
    component?: React.ElementType;
    [key: string]: any;
}

const GradientButton = styled(Button)<GradientButtonProps>(({ theme }) => ({
    background: 'linear-gradient(90deg, #F29727 0%, #FFA41B 100%)',
    color: 'white',
    borderRadius: '50px',
    padding: '8px 24px',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 20px rgba(242, 151, 39, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 25px rgba(242, 151, 39, 0.4)',
        background: 'linear-gradient(90deg, #F29727 0%, #FFCD00 100%)',
    }
}));

interface GlassCardProps {
    component?: React.ElementType;
    [key: string]: any;
}

const GlassCard = styled(Box)<GlassCardProps>(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
}));

const GradientText = styled(Typography)`
    background: linear-gradient(90deg, #F29727 0%, #FFCD00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
`;

const NavButton = styled(Button)(({ theme, active }: { theme: any, active: boolean }) => ({
    color: active ? '#FFA41B' : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '8px 16px',
    marginLeft: '8px',
    marginRight: '8px',
    fontWeight: active ? 600 : 500,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(242, 151, 39, 0.15)',
        color: '#FFCD00',
        '& .MuiSvgIcon-root': {
            color: '#FFCD00',
        },
        '&::after': {
            transform: 'scaleX(1)',
        }
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, #F29727 0%, #FFCD00 100%)',
        transform: active ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'bottom left',
        transition: 'transform 0.3s ease',
    },
    '& .MuiSvgIcon-root': {
        color: active ? '#FFA41B' : 'rgba(255, 255, 255, 0.6)',
        transition: 'color 0.2s ease',
        marginRight: '6px',
    },
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
    padding: '10px 16px',
    margin: '4px 8px',
    borderRadius: '8px',
    '&:hover': {
        background: 'rgba(242, 151, 39, 0.15)',
    },
}));

const DrawerItemButton = styled(ListItemButton)(({ theme, active }: { theme: any, active: boolean }) => ({
    padding: '12px 16px',
    borderRadius: '12px',
    margin: '8px 12px',
    marginBottom: '8px',
    '&:hover': {
        background: 'rgba(242, 151, 39, 0.15)',
        color: '#FFCD00',
        '& .MuiListItemIcon-root': {
            color: '#FFCD00',
        }
    },
    ...(active && {
        background: 'rgba(242, 151, 39, 0.2)',
        color: '#FFCD00',
        '& .MuiListItemIcon-root': {
            color: '#FFCD00',
        }
    })
}));

interface MenuItem {
    label: string;
    icon: JSX.Element;
    path: string;
    status: HeaderStatus;
}

const menuItems: MenuItem[] = [
    {
        label: '홈',
        icon: <Home/>,
        path: '/',
        status: HeaderStatus.NONE,
    },
    {
        label: '할인정보',
        icon: <ShoppingBag/>,
        path: '/deals',
        status: HeaderStatus.DEALS,
    },
    {
        label: '커뮤니티',
        icon: <Forum/>,
        path: '/community',
        status: HeaderStatus.COMMUNITY,
    },
    {
        label: '문의하기',
        icon: <ContactSupport/>,
        path: '/contact',
        status: HeaderStatus.CONTACT,
    }
];

export function HeaderV2() {
    const [headerStatus, setHeaderStatus] = useState(HeaderStatus.NONE);
    const [isLogin, setIsLogin] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {getCookie, removeCookie} = useCookieFunctions();
    const navigate = useNavigate();
    const {nickName} = useUserInfo();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // 현재 경로에 따라 헤더 상태 설정
    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes('/community')) {
            setHeaderStatus(HeaderStatus.COMMUNITY);
        } else if (path.includes('/deals')) {
            setHeaderStatus(HeaderStatus.DEALS);
        } else if (path.includes('/contact')) {
            setHeaderStatus(HeaderStatus.CONTACT);
        } else {
            setHeaderStatus(HeaderStatus.NONE);
        }
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigation = useCallback((path: string, status: HeaderStatus) => {
        navigate(path);
        setHeaderStatus(status);
        setMobileOpen(false);
    }, [navigate]);

    const handleLogout = useCallback(() => {
        const confirms = window.confirm('로그아웃 하시겠습니까?');
        if (confirms) {
            removeCookie('accessToken');
            removeCookie('refreshToken');
            window.location.reload();
        }
    }, [removeCookie]);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const accessToken = getCookie('accessToken');
        setIsLogin(accessToken !== null);
    }, [getCookie]);

    const drawer = (
        <Box sx={{
            width: 280,
            bgcolor: '#070B14',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 3,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="Sale Hero Logo"
                    sx={{
                        height: 40,
                        width: 40,
                        mr: 2,
                        filter: 'drop-shadow(0 0 8px rgba(242, 151, 39, 0.5))'
                    }}
                />
                <GradientText
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Sale Hero
                </GradientText>
            </Box>

            {isLogin && (
                <Box sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <Avatar
                        alt={nickName?.toString() || "User"}
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: 'rgba(242, 151, 39, 0.8)',
                            boxShadow: '0 0 0 2px rgba(255, 205, 0, 0.3)',
                            mr: 2
                        }}
                    >
                        {nickName ? nickName.toString().charAt(0) : <Person/>}
                    </Avatar>
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0.5 }}
                        >
                            반갑습니다
                        </Typography>
                        <GradientText
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                        >
                            {nickName || "사용자"}님
                        </GradientText>
                    </Box>
                </Box>
            )}

            <List sx={{ py: 2, flexGrow: 1 }}>
                {menuItems.map((item) => (
                    <DrawerItemButton
                        key={item.label}
                        onClick={() => handleNavigation(item.path, item.status)}
                        active={headerStatus === item.status} theme={undefined}                    >
                        <ListItemIcon sx={{
                            minWidth: 40,
                            color: headerStatus === item.status ? '#FFCD00' : 'rgba(255, 255, 255, 0.6)'
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                fontWeight: headerStatus === item.status ? 600 : 400
                            }}
                        />
                    </DrawerItemButton>
                ))}
            </List>

            <Box sx={{ p: 3, mt: 'auto' }}>
                {isLogin ? (
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Logout/>}
                        onClick={handleLogout}
                        sx={{
                            py: 1.2,
                            borderRadius: 3,
                            borderColor: 'rgba(255, 205, 0, 0.3)',
                            color: '#FFCD00',
                            '&:hover': {
                                borderColor: '#F29727',
                                bgcolor: 'rgba(242, 151, 39, 0.1)',
                            }
                        }}
                    >
                        로그아웃
                    </Button>
                ) : (
                    <GradientButton
                        fullWidth
                        variant="contained"
                        endIcon={<ArrowForward />}
                        onClick={() => handleNavigation('/signin', HeaderStatus.NONE)}
                        sx={{ py: 1.2 }}
                    >
                        로그인
                    </GradientButton>
                )}
            </Box>
        </Box>
    );

    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.15))',
                    mt: 1.5,
                    borderRadius: 3,
                    minWidth: 200,
                    background: 'rgba(7, 11, 20, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'rgba(7, 11, 20, 0.9)',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                },
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            <MenuItemStyled onClick={() => {
                handleMenuClose();
                handleNavigation('/my-page', HeaderStatus.NONE);
            }}>
                <Person sx={{mr: 1.5, color: '#F29727'}}/>
                <Typography variant="body2" sx={{ color: 'white' }}>마이페이지</Typography>
            </MenuItemStyled>
            <MenuItemStyled onClick={() => {
                handleMenuClose();
                handleLogout();
            }}>
                <Logout sx={{mr: 1.5, color: '#F29727'}}/>
                <Typography variant="body2" sx={{ color: 'white' }}>로그아웃</Typography>
            </MenuItemStyled>
        </Menu>
    );

    return (
        <>
            <GlassAppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            height: 70,
                            '@media (max-width: 600px)': {
                                height: 64,
                            }
                        }}
                    >
                        {/* 모바일 메뉴 버튼 */}
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: {md: 'none'},
                                color: '#F29727',
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>

                        {/* 로고 영역 */}
                        <Box
                            component={motion.div}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleNavigation('/', HeaderStatus.NONE)}
                        >
                            <Box
                                component="img"
                                src={logo}
                                alt="Sale Hero Logo"
                                sx={{
                                    height: 40,
                                    width: 40,
                                    mr: 1.5,
                                    filter: 'drop-shadow(0 0 8px rgba(242, 151, 39, 0.5))'
                                }}
                            />
                            {/*<GradientText*/}
                            {/*    variant="h6"*/}
                            {/*    noWrap*/}
                            {/*    component="div"*/}
                            {/*    sx={{*/}
                            {/*        fontWeight: 700,*/}
                            {/*        mr: 3,*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Sale Hero*/}
                            {/*</GradientText>*/}
                        </Box>

                        {/* 데스크톱 메뉴 아이템 */}
                        <Box
                            sx={{
                                display: {xs: 'none', md: 'flex'},
                                alignItems: 'center',
                                flexGrow: 1,
                            }}
                        >
                            {menuItems.map((item) => (
                                <NavButton
                                    key={item.label}
                                    active={headerStatus === item.status}
                                    startIcon={item.icon}
                                    onClick={() => handleNavigation(item.path, item.status)} theme={undefined}                                >
                                    {item.label}
                                </NavButton>
                            ))}
                        </Box>

                        {/* 오른쪽 영역: 환영 메시지, 알림, 프로필 */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {isLogin && (
                                <>
                                    <GlassCard
                                        component={motion.div}
                                        whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(242, 151, 39, 0.2)' }}
                                        sx={{
                                            display: {xs: 'none', md: 'flex'},
                                            alignItems: 'center',
                                            mr: 3,
                                            py: 0.8,
                                            px: 2,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                '& strong': {
                                                    fontWeight: 700,
                                                    background: 'linear-gradient(90deg, #F29727 0%, #FFCD00 100%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    mx: 0.5,
                                                },
                                            }}
                                        >
                                            <span role="img" aria-label="wave" style={{marginRight: '4px', fontSize: '16px'}}>
                                                👋
                                            </span>
                                            <strong>{nickName}</strong>님, 오늘도 득템하세요!
                                        </Typography>
                                    </GlassCard>

                                    <IconButton
                                        size="large"
                                        aria-label="show notifications"
                                        sx={{
                                            mr: 2,
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            '&:hover': { color: '#FFCD00' },
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                        component={motion.button}
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor: 'rgba(242, 151, 39, 0.15)'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Badge badgeContent={3} color="error">
                                            <Notifications />
                                        </Badge>
                                    </IconButton>
                                </>
                            )}

                            {isLogin ? (
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    component={motion.button}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    sx={{
                                        ml: 1,
                                        border: '2px solid rgba(242, 151, 39, 0.3)',
                                        padding: 0.5,
                                        '&:hover': {
                                            border: '2px solid #FFCD00',
                                            boxShadow: '0 0 15px rgba(242, 151, 39, 0.3)',
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Avatar
                                        alt={nickName?.toString() || "User"}
                                        src="/path-to-user-image.jpg" // 실제 사용자 이미지로 교체
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            bgcolor: 'rgba(242, 151, 39, 0.8)',
                                        }}
                                    >
                                        {nickName ? nickName.toString().charAt(0) : <Person/>}
                                    </Avatar>
                                </IconButton>
                            ) : (
                                <GradientButton
                                    endIcon={<ArrowForward />}
                                    onClick={() => handleNavigation('/signin', HeaderStatus.NONE)}
                                    component={motion.button}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    로그인
                                </GradientButton>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </GlassAppBar>

            {/* 모바일 드로어 */}
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{keepMounted: true}}
                    sx={{
                        display: {xs: 'block', md: 'none'},
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 280
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            {renderMenu}

            {/* 헤더 높이만큼 여백 */}
            <Toolbar sx={{height: {xs: 64, md: 70}, mb: 1}}/>
        </>
    );
}
