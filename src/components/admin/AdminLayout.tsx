import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AdminNavbar } from './AdminNavBar';

export function AdminLayout() {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            <AdminNavbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: '240px',
                    p: 3,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}