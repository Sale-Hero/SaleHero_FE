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
    useTheme
} from '@mui/material';
import {ArrowBack as ArrowBackIcon, CalendarToday as CalendarIcon, Home as HomeIcon} from '@mui/icons-material';
import {motion} from 'framer-motion';
import {useUserNewsLetterGetter} from "./hooks/useUserNewsLetterGetter";
import {ComponentHelmet} from "../common/ComponentHelmet"; // Import ComponentHelmet

// Utility function to extract plain text from HTML
const getPlainTextFromHtml = (htmlString: string): string => {
    if (!htmlString) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.substring(0, 160); // Truncate for meta description
};

export function DealDetail() {
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


    // 날짜 포맷팅
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

    // 뒤로 가기
    const handleGoBack = () => {
        navigate(-1);
    };

    // 홈으로 가기
    const handleGoHome = () => {
        navigate('/deals');
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {newsLetter && (
                <ComponentHelmet
                    title={newsLetter.title}
                    description={getPlainTextFromHtml(newsLetter.content)}
                />
            )}
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
                            mx: 1.5
                        }
                    }}
                >
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={handleGoHome}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                        }}
                    >
                        <HomeIcon sx={{ mr: 0.5, fontSize: '0.875rem' }} />
                        할인 정보
                    </Link>
                    <Typography
                        color="text.primary"
                        sx={{
                            fontSize: '0.875rem',
                            maxWidth: '200px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
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
                        color: '#666',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 205, 0, 0.08)',
                            color: '#F29727',
                        }
                    }}
                >
                    목록으로 돌아가기
                </Button>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                        <CircularProgress sx={{ color: '#F29727' }} />
                    </Box>
                ) : error ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            backgroundColor: '#f9f9f9',
                            border: '1px solid #eee',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" color="error" gutterBottom>
                            {error}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleGoBack}
                            sx={{
                                mt: 2,
                                backgroundColor: '#FFCD00',
                                color: '#333',
                                '&:hover': {
                                    backgroundColor: '#F29727',
                                    color: '#fff'
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
                            border: '1px solid #eee',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        }}
                    >
                        {/* 상단 헤더 영역 */}
                        <Box
                            sx={{
                                p: { xs: 3, md: 4 },
                                backgroundColor: '#FFF9E6',
                                borderBottom: '1px solid #FFE0B2'
                            }}
                        >
                            <Chip
                                label="할인 정보"
                                size="small"
                                sx={{
                                    backgroundColor: '#FFE0B2',
                                    color: '#F29727',
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
                                    color: '#333'
                                }}
                            >
                                {newsLetter.title}
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#666',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <CalendarIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                                <Typography variant="body2">
                                    {formatDate(newsLetter.createdAt)}
                                </Typography>
                            </Box>
                        </Box>

                        {/* 본문 영역 */}
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                            <Box
                                sx={{
                                    '& img': {
                                        maxWidth: '100%',
                                        height: 'auto',
                                        borderRadius: 1,
                                    },
                                    '& a': {
                                        color: '#F29727',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        }
                                    },
                                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                                        color: '#333',
                                        my: 2,
                                    },
                                    '& p': {
                                        mb: 2,
                                        lineHeight: 1.7,
                                    },
                                    '& ul, & ol': {
                                        pl: 3,
                                        mb: 2,
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
                                    },
                                    '& th, & td': {
                                        border: '1px solid #eee',
                                        p: 2,
                                    },
                                    '& th': {
                                        backgroundColor: '#f5f5f5',
                                        fontWeight: 600,
                                    },
                                    '& blockquote': {
                                        borderLeft: '4px solid #FFCD00',
                                        pl: 2,
                                        py: 1,
                                        my: 2,
                                        backgroundColor: '#FFF9E6',
                                        borderRadius: '0 4px 4px 0',
                                    },
                                    '& code': {
                                        backgroundColor: '#f5f5f5',
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
                                borderTop: '1px solid #eee',
                                backgroundColor: '#f9f9f9',
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
                                    backgroundColor: '#FFCD00',
                                    color: '#333',
                                    '&:hover': {
                                        backgroundColor: '#F29727',
                                        color: '#fff'
                                    },
                                    boxShadow: 'none',
                                }}
                            >
                                목록으로 돌아가기
                            </Button>
                        </Box>
                    </Card>
                )}
            </motion.div>
        </Container>
    );
}
