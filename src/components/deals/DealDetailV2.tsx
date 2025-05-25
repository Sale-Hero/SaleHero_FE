import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Link,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
    alpha
} from '@mui/material';
import {ArrowBack as ArrowBackIcon, CalendarToday as CalendarIcon, Home as HomeIcon} from '@mui/icons-material';
import {motion} from 'framer-motion';
import {useUserNewsLetterGetter} from "./hooks/useUserNewsLetterGetter";

const darkSpaceTheme = {
    primary: '#F9A825',
    secondary: '#FFD54F',
    background: 'rgba(13, 17, 28, 0.9)',
    paper: 'rgba(22, 28, 45, 0.8)',
    text: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0'
    }
};

export function DealDetailV2() {
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { getNewsLetter, newsLetter} = useUserNewsLetterGetter();

    useEffect(() => {
        if (id) {
            getNewsLetter(id).then(() => setIsLoading(false));
        }
    }, [id]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoHome = () => {
        navigate('/deals');
    };

    return (
        <Box
            sx={{
                background: 'linear-gradient(180deg, rgba(13, 17, 28, 0.9) 0%, rgba(13, 17, 28, 0.95) 100%)',
                minHeight: '100vh',
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
                sx={{
                    py: 5,
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 브레드크럼 */}
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        sx={{
                            mb: 3,
                            '& .MuiBreadcrumbs-separator': {
                                mx: 1.5,
                                color: '#B0B0B0'
                            },
                            '& .MuiBreadcrumbs-ol': {
                                alignItems: 'center'
                            }
                        }}
                    >
                        <Link
                            underline="hover"
                            onClick={handleGoHome}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                color: '#B0B0B0',
                                '&:hover': {
                                    color: darkSpaceTheme.primary
                                },
                                transition: 'color 0.2s ease'
                            }}
                        >
                            <HomeIcon sx={{ mr: 0.5, fontSize: '0.875rem' }} />
                            할인 정보
                        </Link>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                maxWidth: '200px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: darkSpaceTheme.primary
                            }}
                        >
                            {newsLetter?.title || '로딩중...'}
                        </Typography>
                    </Breadcrumbs>

                    {/* 뒤로 가기 버튼 */}
                    <Button
                        variant="text"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleGoBack}
                        sx={{
                            mb: 3,
                            color: '#B0B0B0',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: alpha(darkSpaceTheme.primary, 0.1),
                                color: darkSpaceTheme.primary,
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        목록으로 돌아가기
                    </Button>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                            <CircularProgress sx={{ color: darkSpaceTheme.primary }} />
                        </Box>
                    ) : error ? (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                backgroundColor: darkSpaceTheme.paper,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: 2,
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <Typography variant="h6" sx={{ color: '#FF6B6B' }} gutterBottom>
                                {error}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={handleGoBack}
                                sx={{
                                    mt: 2,
                                    backgroundColor: darkSpaceTheme.primary,
                                    color: '#000',
                                    '&:hover': {
                                        backgroundColor: darkSpaceTheme.secondary
                                    }
                                }}
                            >
                                돌아가기
                            </Button>
                        </Paper>
                    ) : newsLetter && (
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                overflow: 'hidden',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                backgroundColor: darkSpaceTheme.paper,
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                            }}
                        >
                            {/* 상단 헤더 영역 */}
                            <Box
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    backgroundColor: 'rgba(249, 168, 37, 0.1)',
                                    borderBottom: `1px solid ${alpha(darkSpaceTheme.primary, 0.3)}`
                                }}
                            >
                                <Chip
                                    label="할인 정보"
                                    size="small"
                                    sx={{
                                        backgroundColor: darkSpaceTheme.primary,
                                        color: '#000',
                                        fontWeight: 600,
                                        mb: 2,
                                        borderRadius: '50px',
                                    }}
                                />

                                <Typography
                                    variant="h4"
                                    component="h1"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: '1.5rem', md: '2rem' },
                                        mb: 2,
                                        color: '#FFFFFF'
                                    }}
                                >
                                    {newsLetter.title}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#B0B0B0',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    <CalendarIcon
                                        sx={{
                                            fontSize: '1rem',
                                            mr: 0.5,
                                            color: darkSpaceTheme.primary
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                                        {formatDate(newsLetter.createdAt)}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* 본문 영역 */}
                            <CardContent sx={{p: { xs: 3, md: 5 } }}>
                                <Box
                                    sx={{
                                        color: '#E0E0E0',
                                        '& *': { 
                                            color: '#E0E0E0 !important'
                                        },
                                        '& img': {
                                            maxWidth: '100%',
                                            height: 'auto',
                                            borderRadius: 1,
                                        },
                                        '& a': {
                                            color: darkSpaceTheme.primary,
                                            textDecoration: 'none',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                                color: darkSpaceTheme.secondary
                                            }
                                        },
                                        '& h1, & h2, & h3, & h4, & h5, & h6': {
                                            color: '#FFFFFF',
                                            my: 2,
                                        },
                                        '& p': {
                                            mb: 2,
                                            lineHeight: 1.7,
                                            color: '#E0E0E0'
                                        },
                                        '& ul, & ol': {
                                            pl: 3,
                                            mb: 2,
                                            '& li': {
                                                color: '#E0E0E0'
                                            }
                                        },
                                        '& li': {
                                            mb: 1,
                                        },
                                        '& table': {
                                            borderCollapse: 'collapse',
                                            width: '100%',
                                            mb: 3,
                                            borderRadius: 1,
                                            overflow: 'hidden',
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                        },
                                        '& th, & td': {
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            p: 2,
                                        },
                                        '& th': {
                                            backgroundColor: alpha(darkSpaceTheme.primary, 0.2),
                                            fontWeight: 600,
                                            color: '#FFFFFF'
                                        },
                                        '& td': {
                                            color: '#E0E0E0'
                                        },
                                        '& blockquote': {
                                            borderLeft: `4px solid ${darkSpaceTheme.primary}`,
                                            pl: 2,
                                            py: 1,
                                            my: 2,
                                            backgroundColor: alpha(darkSpaceTheme.primary, 0.1),
                                            borderRadius: '0 4px 4px 0',
                                        },
                                        '& code': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            color: darkSpaceTheme.secondary,
                                            p: 0.5,
                                            borderRadius: 0.5,
                                            fontFamily: 'monospace',
                                        },
                                    }}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: newsLetter.content }} />
                                </Box>
                            </CardContent>

                            {/* 하단 액션 영역 */}
                            <Box
                                sx={{
                                    p: 3,
                                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                    backgroundColor: 'rgba(22, 28, 45, 0.5)',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleGoBack}
                                    sx={{
                                        borderRadius: '50px',
                                        px: 4,
                                        backgroundColor: darkSpaceTheme.primary,
                                        color: '#000',
                                        fontWeight: 600,
                                        '&:hover': {
                                            backgroundColor: darkSpaceTheme.secondary,
                                            transform: 'translateY(-1px)',
                                            boxShadow: `0 6px 20px ${alpha(darkSpaceTheme.primary, 0.4)}`
                                        },
                                        boxShadow: `0 4px 14px ${alpha(darkSpaceTheme.primary, 0.3)}`,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    목록으로 돌아가기
                                </Button>
                            </Box>
                        </Card>
                    )}
                </motion.div>
            </Container>
        </Box>
    );
}