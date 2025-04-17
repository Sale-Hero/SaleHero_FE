import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { Home, Error } from '@mui/icons-material';
import { motion } from 'framer-motion';

export function NotFoundPage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Error
              sx={{
                fontSize: 80,
                color: 'error.main',
                mb: 2,
              }}
            />

            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: (theme) => 
                  `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              페이지를 찾을 수 없습니다
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 4 }}
            >
              요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
              URL을 다시 확인해주시거나, 아래 버튼을 클릭하여 홈으로 이동하세요.
            </Typography>

            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              startIcon={<Home />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                },
                transition: 'all 0.2s',
              }}
            >
              홈으로 이동
            </Button>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
}
