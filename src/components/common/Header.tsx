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
} from '@mui/material';
import {
  Forum,
  Login,
  Logout,
  Menu as MenuIcon,
  Person,
} from '@mui/icons-material';
import logo from '../../assets/img/sale_hero_ico.png';

export enum HeaderStatus {
  COMMUNITY = "COMMUNITY",
  NONE = "NONE",
}

interface MenuItem {
  label: string;
  icon: JSX.Element;
  path: string;
  status: HeaderStatus;
}

const menuItems: MenuItem[] = [
  {
    label: '커뮤니티',
    icon: <Forum />,
    path: '/community',
    status: HeaderStatus.COMMUNITY,
  }
];

export function Header() {
  const [headerStatus, setHeaderStatus] = useState(HeaderStatus.NONE);
  const [isLogin, setIsLogin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getCookie, removeCookie } = useCookieFunctions();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    setIsLogin(accessToken !== null);
  }, [getCookie]);

  const drawer = (
      <Box sx={{ width: 280, bgcolor: 'background.paper' }}>
        <List>
          {menuItems.map((item) => (
              <Box key={item.label}>
                <ListItemButton
                    onClick={() => handleNavigation(item.path, item.status)}
                    selected={headerStatus === item.status}
                    sx={{
                      py: 1.5,
                      borderRadius: 1,
                      mx: 1,
                      mb: 0.5,
                      '&:hover': {
                        bgcolor: 'rgba(255, 205, 0, 0.15)',
                        color: '#FFB100',
                        '& .MuiListItemIcon-root': {
                          color: '#FFB100',
                        }
                      },
                      ...(headerStatus === item.status && {
                        bgcolor: 'rgba(255, 205, 0, 0.2)',
                        color: '#F29727',
                        '& .MuiListItemIcon-root': {
                          color: '#F29727',
                        }
                      })
                    }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </Box>
          ))}
        </List>
      </Box>
  );

  return (
      <>
        <AppBar
            position="fixed"
            sx={{
              bgcolor: 'rgba(255, 252, 242, 0.9)',
              backdropFilter: 'blur(8px)',
              borderBottom: 1,
              borderColor: 'rgba(255, 205, 0, 0.3)',
              background: 'linear-gradient(to right, rgba(255, 252, 242, 0.95), rgba(255, 248, 225, 0.95))',
            }}
            elevation={0}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    mr: 2,
                    display: { md: 'none' },
                    color: '#F29727',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                  component="img"
                  src={logo}
                  alt="Sale Hero Logo"
                  sx={{
                    height: 40,
                    width: 40,
                    cursor: 'pointer',
                    mr: 2,
                    '&:hover': {
                      transform: 'scale(1.1)',
                      filter: 'brightness(1.1)'
                    },
                    transition: 'all 0.3s ease',
                    objectFit: 'contain'
                  }}
                  onClick={() => handleNavigation('/', HeaderStatus.NONE)}
              />

              <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    flexGrow: 1,
                    cursor: 'pointer',
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.2s ease'
                    },
                  }}
                  onClick={() => handleNavigation('/', HeaderStatus.NONE)}
              >
                  Sale Hero
              </Typography>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                {menuItems.map((item) => (
                    <Box
                        key={item.label}
                        sx={{ position: 'relative' }}
                    >
                      <Button
                          color="inherit"
                          startIcon={item.icon}
                          onClick={() => handleNavigation(item.path, item.status)}
                          sx={{
                            mx: 0.5,
                            py: 1,
                            px: 2,
                            color: headerStatus === item.status ? '#F29727' : '#333',
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
                            position: 'relative',
                            '&:after': {
                              content: '""',
                              position: 'absolute',
                              bottom: 0,
                              left: '50%',
                              width: headerStatus === item.status ? '100%' : '0%',
                              height: '2px',
                              bgcolor: '#FFCD00',
                              transition: 'all 0.3s ease',
                              transform: 'translateX(-50%)',
                            },
                            ...(headerStatus === item.status && {
                              bgcolor: 'rgba(255, 205, 0, 0.1)',
                              fontWeight: 600,
                              '& .MuiSvgIcon-root': {
                                color: '#F29727',
                              }
                            }),
                            '&:hover': {
                              bgcolor: 'rgba(255, 205, 0, 0.1)',
                              transform: 'translateY(-2px)',
                              '& .MuiSvgIcon-root': {
                                color: '#F29727',
                              },
                              '&:after': {
                                width: '100%',
                              }
                            },
                          }}
                      >
                        {item.label}
                      </Button>
                    </Box>
                ))}

                {isLogin && (
                    <Button
                        color="inherit"
                        variant="outlined"
                        startIcon={<Person />}
                        onClick={() => handleNavigation('/my-page', HeaderStatus.NONE)}
                        sx={{
                          px: 3,
                          py: 1,
                          borderRadius: 2,
                          mr: 1,
                          borderColor: '#FFCD00',
                          color: '#F29727',
                          '&:hover': {
                            borderColor: '#F29727',
                            bgcolor: 'rgba(255, 205, 0, 0.1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 8px rgba(242, 151, 39, 0.15)'
                          },
                          transition: 'all 0.2s'
                        }}
                    >
                      My Page
                    </Button>
                )}

                <Button
                    color="inherit"
                    variant={isLogin ? "outlined" : "contained"}
                    startIcon={isLogin ? <Logout /> : <Login />}
                    onClick={isLogin ? handleLogout : () => handleNavigation('/signin', HeaderStatus.NONE)}
                    sx={{
                      ml: 2,
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      ...(isLogin ? {
                        borderColor: '#FFCD00',
                        color: '#F29727',
                        '&:hover': {
                          borderColor: '#F29727',
                          bgcolor: 'rgba(255, 205, 0, 0.1)',
                        }
                      } : {
                        bgcolor: '#FFCD00',
                        color: '#333',
                        '&:hover': {
                          bgcolor: '#F29727',
                          color: '#fff'
                        }
                      }),
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(242, 151, 39, 0.2)'
                      },
                      transition: 'all 0.2s'
                    }}
                >
                  {isLogin ? 'Logout' : 'Login'}
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Box component="nav">
          <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              PaperProps={{
                sx: {
                  width: 280,
                  borderRight: 1,
                  borderColor: 'rgba(255, 205, 0, 0.3)',
                  bgcolor: 'rgba(255, 252, 242, 0.95)'
                }
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
          >
            {drawer}
          </Drawer>
        </Box>

        <Toolbar />
      </>
  );
}