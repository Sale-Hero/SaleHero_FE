import {Box, List, ListItem, ListItemIcon, ListItemText, Paper, Typography} from '@mui/material';
import {Article, Dashboard, LocalOffer, Newspaper, Person} from '@mui/icons-material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';

export function AdminNavbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { icon: Dashboard, text: '대시보드', path: '/admin' },
        { icon: Person, text: '사용자 관리', path: '/admin/users' },
        { icon: Article, text: '게시글 관리', path: '/admin/posts' },
        { icon: Newspaper, text: '뉴스레터(로우)', path: '/admin/raw-newsletter' },
        { icon: Newspaper, text: '뉴스레터', path: '/admin/newsletter' },
        { icon: LocalOffer, text: '할인 정보', path: '/admin/article' },
        { icon: Article, text: '공지사항', path: '/admin/announcement' },
    ];

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100vh',
                width: 240,
                borderRadius: 0,
                bgcolor: 'background.paper',
            }}
        >
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" color="primary" fontWeight="bold"
                            onClick={() => navigate('/')}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    opacity: 0.8
                                }
                            }}>
                    Admin Panel
                </Typography>
            </Box>
            <List>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <motion.div
                            key={item.path}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ListItem
                                component={Link}
                                to={item.path}
                                sx={{
                                    py: 2,
                                    bgcolor: isActive ? 'primary.light' : 'transparent',
                                    color: isActive ? 'primary.main' : 'text.primary',
                                    '&:hover': {
                                        bgcolor: 'primary.light',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </motion.div>
                    );
                })}
            </List>
        </Paper>
    );
}
