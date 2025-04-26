import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookieFunctions} from './hooks/useCookieFunctions';
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
} from '@mui/material';
import {
    Forum,
    Login,
    Logout,
    Menu as MenuIcon,
    Person,
    Notifications,
    Home,
    ShoppingBag, ContactSupport,
} from '@mui/icons-material';
import logo from '../../assets/img/sale_hero_ico.png';
import {HeaderStatus} from 'types/common';
import {useUserInfo} from "../../hooks/hooks";

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

export function Header() {
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
        <Box sx={{width: 280, bgcolor: 'background.paper'}}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: '1px solid rgba(255, 205, 0, 0.2)'
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="Sale Hero Logo"
                    sx={{height: 40, width: 40, mr: 2}}
                />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Sale Hero
                </Typography>
            </Box>
            <List sx={{py: 2}}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.label}
                        onClick={() => handleNavigation(item.path, item.status)}
                        selected={headerStatus === item.status}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            mx: 1.5,
                            mb: 1,
                            '&:hover': {
                                bgcolor: 'rgba(255, 205, 0, 0.15)',
                                color: '#FF9800',
                                '& .MuiListItemIcon-root': {
                                    color: '#FF9800',
                                }
                            },
                            ...(headerStatus === item.status && {
                                bgcolor: 'rgba(255, 177, 0, 0.15)',
                                color: '#F29727',
                                '& .MuiListItemIcon-root': {
                                    color: '#F29727',
                                }
                            })
                        }}
                    >
                        <ListItemIcon sx={{minWidth: 40, color: headerStatus === item.status ? '#F29727' : 'inherit'}}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                fontWeight: headerStatus === item.status ? 600 : 400
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
            <Box sx={{p: 2, mt: 'auto'}}>
                {isLogin ? (
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Logout/>}
                        onClick={handleLogout}
                        sx={{
                            py: 1.2,
                            borderRadius: 2,
                            borderColor: '#FFCD00',
                            color: '#F29727',
                            '&:hover': {
                                borderColor: '#F29727',
                                bgcolor: 'rgba(255, 205, 0, 0.1)',
                            }
                        }}
                    >
                        로그아웃
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Login/>}
                        onClick={() => handleNavigation('/signin', HeaderStatus.NONE)}
                        sx={{
                            py: 1.2,
                            borderRadius: 2,
                            bgcolor: '#FFCD00',
                            color: '#333',
                            '&:hover': {
                                bgcolor: '#F29727',
                                color: '#fff'
                            }
                        }}
                    >
                        로그인
                    </Button>
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
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                    mt: 1.5,
                    borderRadius: 2,
                    minWidth: 180,
                    '& .MuiMenuItem-root': {
                        px: 2,
                        py: 1.2,
                        my: 0.3,
                        borderRadius: 1,
                        mx: 0.5,
                        '&:hover': {
                            bgcolor: 'rgba(255, 205, 0, 0.1)',
                        },
                    },
                },
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            <MenuItem onClick={() => {
                handleMenuClose();
                handleNavigation('/my-page', HeaderStatus.NONE);
            }}>
                <Person sx={{mr: 1.5, color: '#F29727'}}/> 마이페이지
            </MenuItem>
            <MenuItem onClick={() => {
                handleMenuClose();
                handleLogout();
            }}>
                <Logout sx={{mr: 1.5, color: '#F29727'}}/> 로그아웃
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: 'rgba(255, 252, 242, 0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                    borderBottom: '1px solid rgba(255, 205, 0, 0.2)',
                    color: '#333',
                }}
                elevation={0}
            >
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
                            color="inherit"
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
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    '& img': {
                                        transform: 'scale(1.05)',
                                    },
                                    '& .logo-text': {
                                        transform: 'translateX(2px)',
                                    }
                                }
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
                                    transition: 'transform 0.3s ease',
                                    objectFit: 'contain'
                                }}
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                className="logo-text"
                                sx={{
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    transition: 'transform 0.3s ease',
                                    mr: 3,
                                }}
                            >
                                Sale Hero
                            </Typography>
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
                                <Button
                                    key={item.label}
                                    color="inherit"
                                    startIcon={item.icon}
                                    onClick={() => handleNavigation(item.path, item.status)}
                                    sx={{
                                        mx: 1,
                                        py: 1,
                                        px: 2,
                                        color: headerStatus === item.status ? '#F29727' : '#555',
                                        borderRadius: 2,
                                        fontWeight: headerStatus === item.status ? 600 : 500,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '3px',
                                            backgroundColor: '#FFCD00',
                                            transform: headerStatus === item.status ? 'scaleX(1)' : 'scaleX(0)',
                                            transformOrigin: 'bottom left',
                                            transition: 'transform 0.3s ease',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 205, 0, 0.08)',
                                            color: '#F29727',
                                            '& .MuiSvgIcon-root': {
                                                color: '#F29727',
                                            },
                                            '&::after': {
                                                transform: 'scaleX(1)',
                                            }
                                        },
                                        '& .MuiSvgIcon-root': {
                                            color: headerStatus === item.status ? '#F29727' : '#666',
                                            transition: 'color 0.2s ease',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>

                        {/* 오른쪽 영역: 환영 메시지, 알림, 프로필 */}
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            {isLogin && (
                                <>
                                    <Box
                                        sx={{
                                            display: {xs: 'none', md: 'flex'},
                                            alignItems: 'center',
                                            mr: 3,
                                            py: 0.5,
                                            px: 2,
                                            borderRadius: 2,
                                            background: 'linear-gradient(to right, rgba(255, 248, 225, 0.5), rgba(255, 236, 179, 0.5))',
                                            boxShadow: 'inset 0 0 0 1px rgba(255, 205, 0, 0.2)',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                color: '#F29727',
                                                display: 'flex',
                                                alignItems: 'center',
                                                '& strong': {
                                                    fontWeight: 700,
                                                    color: '#E67E22',
                                                    mx: 0.5,
                                                },
                                            }}
                                        >
          <span role="img" aria-label="wave" style={{marginRight: '4px', fontSize: '16px'}}>
            👋
          </span>
                                            <strong>{nickName}</strong>님, 오늘도 득템하세요!
                                        </Typography>
                                    </Box>

                                    <IconButton
                                        size="large"
                                        aria-label="show notifications"
                                        color="inherit"
                                        sx={{
                                            mr: 2,
                                            color: '#666',
                                            '&:hover': {color: '#F29727'}
                                        }}
                                    >
                                        <Badge badgeContent={3} color="error">
                                            <Notifications/>
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
                                    sx={{
                                        ml: 1,
                                        border: '2px solid #FFE0B2',
                                        padding: 0.5,
                                        '&:hover': {
                                            border: '2px solid #FFCD00',
                                        }
                                    }}
                                >
                                    <Avatar
                                        alt={nickName?.toString() || "User"}
                                        src="/path-to-user-image.jpg" // 실제 사용자 이미지로 교체
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            bgcolor: '#FFB74D'
                                        }}
                                    >
                                        {nickName ? nickName.toString().charAt(0) : <Person/>}
                                    </Avatar>
                                </IconButton>
                            ) : (
                                <Button
                                    variant="contained"
                                    startIcon={<Login/>}
                                    onClick={() => handleNavigation('/signin', HeaderStatus.NONE)}
                                    sx={{
                                        ml: {xs: 1, md: 2},
                                        px: {xs: 2, md: 3},
                                        py: 1,
                                        borderRadius: '50px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        boxShadow: '0 2px 8px rgba(255, 177, 0, 0.2)',
                                        background: 'linear-gradient(45deg, #FFB100 30%, #FFD54F 90%)',
                                        color: '#333',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #F29727 30%, #FFB100 90%)',
                                            boxShadow: '0 4px 12px rgba(242, 151, 39, 0.3)',
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    로그인
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* 모바일 드로어 */}
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{keepMounted: true}}
                    PaperProps={{
                        sx: {
                            width: 280,
                            borderRight: 1,
                            borderColor: 'rgba(255, 205, 0, 0.2)',
                            bgcolor: 'rgba(255, 252, 242, 0.98)'
                        }
                    }}
                    sx={{
                        display: {xs: 'block', md: 'none'},
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