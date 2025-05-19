import React, {useState} from 'react';
import {Alert, Box, Button, Container, Grid, IconButton, Paper, Snackbar, TextField, Typography, alpha} from '@mui/material';
import {AccessTime, Email, LocationOn, Phone, Send, Star} from '@mui/icons-material';
import {motion} from 'framer-motion';
import {ComponentHelmet} from "../../components/common/ComponentHelmet";
import {SupportPostDTO} from "../../types/support";

// 어두운 우주 테마 컬러 정의
const spaceTheme = {
    primary: '#F9A825', // 금색 강조
    secondary: '#FFD54F', // 밝은 금색
    background: '#0D111C', // 어두운 우주 배경
    paper: 'rgba(22, 28, 45, 0.7)', // 반투명 카드 배경
    text: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0',
        tertiary: '#B0B0B0'
    },
    divider: 'rgba(255, 255, 255, 0.1)'
};

export const ContactV2: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cellPhone: '',
        title: '',
        content: '',
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const dto: SupportPostDTO = {
                name: formData.name,
                email: formData.email,
                cellPhone: formData.cellPhone,
                title: formData.title,
                content: formData.content
            };

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/support`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dto)
            });

            if (!response.ok) {
                throw new Error('서버 에러가 발생했습니다.');
            }

            setSnackbar({
                open: true,
                message: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.',
                severity: 'success',
            });
            resetFormData();

        } catch (error) {
            setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : '일시적인 오류가 발생했습니다.\n다시 시도해주세요.',
                severity: 'error',
            });
        }
    };

    const resetFormData = () => {
        setFormData({
            name: '',
            email: '',
            cellPhone: '',
            title: '',
            content: '',
        });
    }

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const contactInfo = [
        {
            icon: <Email />,
            title: '이메일',
            content: 'contactsalehero@gmail.com',
            description: '24시간 이내 답변 드리겠습니다',
        },
        {
            icon: <Phone />,
            title: '전화',
            content: '+82 02-987-6543',
            description: '평일 09:00 - 18:00 (한국 시간)',
        },
        {
            icon: <LocationOn />,
            title: '주소',
            content: '서울특별시 강남구 삼성로',
            description: '오피스는 현재 준비중입니다.',
        },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                py: 8,
                background: 'linear-gradient(180deg, rgba(13, 17, 28, 0.95) 0%, rgba(13, 17, 28, 0.98) 100%)',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    pointerEvents: 'none',
                    zIndex: 0
                }
            }}
        >
            <Container
                maxWidth="lg"
                sx={{ position: 'relative', zIndex: 1 }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            background: `linear-gradient(45deg, ${spaceTheme.primary} 30%, ${spaceTheme.secondary} 90%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: `0 0 20px ${alpha(spaceTheme.primary, 0.4)}`,
                        }}
                    >
                        문의하기
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: spaceTheme.text.secondary,
                            mb: 4,
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}
                    >
                        할인 정보에 관한 모든 궁금증, Sale Hero가 해결해드립니다
                    </Typography>
                </motion.div>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={5}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    bgcolor: alpha(spaceTheme.paper, 0.8),
                                    backdropFilter: 'blur(10px)',
                                    border: `1px solid ${alpha(spaceTheme.text.primary, 0.1)}`,
                                    boxShadow: `0 8px 32px ${alpha('#000', 0.3)}`,
                                    height: '100%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        width: '100px',
                                        height: '100px',
                                        background: `radial-gradient(circle, ${alpha(spaceTheme.primary, 0.15)} 0%, transparent 70%)`,
                                        borderRadius: '50%',
                                        zIndex: 0,
                                        pointerEvents: 'none'
                                    }
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 600,
                                        mb: 3,
                                        color: spaceTheme.primary,
                                        position: 'relative',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        '&::after': {
                                            content: '""',
                                            display: 'block',
                                            width: '40px',
                                            height: '2px',
                                            background: `linear-gradient(90deg, ${spaceTheme.primary}, transparent)`,
                                            marginLeft: '10px'
                                        }
                                    }}
                                >
                                    연락처 정보
                                </Typography>

                                {contactInfo.map((info, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            mb: 3,
                                            position: 'relative',
                                            zIndex: 1
                                        }}
                                    >
                                        <IconButton
                                            sx={{
                                                bgcolor: alpha(spaceTheme.primary, 0.15),
                                                color: spaceTheme.primary,
                                                mr: 2,
                                                '&:hover': {
                                                    bgcolor: alpha(spaceTheme.primary, 0.25),
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {info.icon}
                                        </IconButton>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: spaceTheme.text.primary,
                                                }}
                                            >
                                                {info.title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{ color: spaceTheme.text.secondary }}
                                            >
                                                {info.content}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: spaceTheme.text.tertiary }}
                                            >
                                                {info.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}

                                <Box
                                    sx={{
                                        mt: 4,
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: alpha(spaceTheme.primary, 0.08),
                                        border: `1px solid ${alpha(spaceTheme.primary, 0.15)}`,
                                        position: 'relative',
                                        zIndex: 1
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 1,
                                        }}
                                    >
                                        <AccessTime sx={{ color: spaceTheme.primary, mr: 1 }} />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: spaceTheme.text.primary,
                                            }}
                                        >
                                            상담 가능 시간
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: spaceTheme.text.secondary }}
                                    >
                                        평일: 09:00 - 18:00 (한국 시간)<br />
                                        점심시간: 12:00 - 13:00<br />
                                        주말 및 공휴일: 휴무
                                    </Typography>
                                </Box>
                            </Paper>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    bgcolor: alpha(spaceTheme.paper, 0.8),
                                    backdropFilter: 'blur(10px)',
                                    border: `1px solid ${alpha(spaceTheme.text.primary, 0.1)}`,
                                    boxShadow: `0 8px 32px ${alpha('#000', 0.3)}`,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '150px',
                                        height: '150px',
                                        background: `radial-gradient(circle, ${alpha(spaceTheme.primary, 0.1)} 0%, transparent 70%)`,
                                        borderRadius: '50%',
                                        zIndex: 0,
                                        pointerEvents: 'none'
                                    }
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 600,
                                        mb: 3,
                                        color: spaceTheme.primary,
                                        position: 'relative',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        '&::after': {
                                            content: '""',
                                            display: 'block',
                                            width: '40px',
                                            height: '2px',
                                            background: `linear-gradient(90deg, ${spaceTheme.primary}, transparent)`,
                                            marginLeft: '10px'
                                        }
                                    }}
                                >
                                    문의하기
                                </Typography>

                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="이름"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: alpha(spaceTheme.primary, 0.3),
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: alpha(spaceTheme.primary, 0.5),
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: spaceTheme.primary,
                                                        },
                                                        color: spaceTheme.text.primary
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: spaceTheme.text.secondary,
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: spaceTheme.primary,
                                                    },
                                                    '& .MuiInputBase-input::placeholder': {
                                                        color: alpha(spaceTheme.text.tertiary, 0.5),
                                                        opacity: 1
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="이메일"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: alpha(spaceTheme.primary, 0.3),
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: alpha(spaceTheme.primary, 0.5),
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: spaceTheme.primary,
                                                        },
                                                        color: spaceTheme.text.primary
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: spaceTheme.text.secondary,
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: spaceTheme.primary,
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="연락처"
                                                name="cellPhone"
                                                value={formData.cellPhone}
                                                onChange={handleChange}
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: alpha(spaceTheme.primary, 0.3),
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: alpha(spaceTheme.primary, 0.5),
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: spaceTheme.primary,
                                                        },
                                                        color: spaceTheme.text.primary
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: spaceTheme.text.secondary,
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: spaceTheme.primary,
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="제목"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: alpha(spaceTheme.primary, 0.3),
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: alpha(spaceTheme.primary, 0.5),
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: spaceTheme.primary,
                                                        },
                                                        color: spaceTheme.text.primary
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: spaceTheme.text.secondary,
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: spaceTheme.primary,
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="문의 내용"
                                                name="content"
                                                value={formData.content}
                                                onChange={handleChange}
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: alpha(spaceTheme.primary, 0.3),
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: alpha(spaceTheme.primary, 0.5),
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: spaceTheme.primary,
                                                        },
                                                        color: spaceTheme.text.primary
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: spaceTheme.text.secondary,
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: spaceTheme.primary,
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                endIcon={<Send />}
                                                sx={{
                                                    mt: 2,
                                                    py: 1.5,
                                                    px: 4,
                                                    background: `linear-gradient(45deg, ${spaceTheme.primary} 30%, ${spaceTheme.secondary} 90%)`,
                                                    color: '#000',
                                                    fontWeight: 600,
                                                    boxShadow: `0 4px 20px ${alpha(spaceTheme.primary, 0.4)}`,
                                                    borderRadius: 2,
                                                    '&:hover': {
                                                        boxShadow: `0 6px 25px ${alpha(spaceTheme.primary, 0.5)}`,
                                                        transform: 'translateY(-2px)'
                                                    },
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                문의하기
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 8,
                            gap: 1,
                            flexDirection: { xs: 'column', md: 'row' }
                        }}
                    >
                        <Star sx={{ color: spaceTheme.primary }} />
                        <Typography
                            variant="body2"
                            sx={{
                                color: spaceTheme.text.tertiary,
                                textAlign: 'center'
                            }}
                        >
                            세일히어로는 빠른 시일 내에 답변 드리기 위해 최선을 다하고 있습니다.
                        </Typography>
                        <Star sx={{ color: spaceTheme.primary }} />
                    </Box>
                </motion.div>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{
                            width: '100%',
                            backdropFilter: 'blur(10px)',
                            ...(snackbar.severity === 'success' && {
                                background: `linear-gradient(135deg, ${alpha(spaceTheme.secondary, 0.9)} 0%, ${alpha(spaceTheme.primary, 0.9)} 100%)`,
                                color: 'black',
                                fontWeight: 600,
                                border: `1px solid ${alpha(spaceTheme.primary, 0.3)}`,
                                '& .MuiAlert-icon': {
                                    color: 'black'
                                }
                            }),
                            ...(snackbar.severity === 'error' && {
                                background: alpha('#300', 0.9),
                                border: '1px solid #500',
                                color: '#fff'
                            })
                        }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>

                <ComponentHelmet title={"Sale Hero - 문의하기"} />
            </Container>
        </Box>
    );
};
