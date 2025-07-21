import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Link,
    Typography,
    alpha
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Home as HomeIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ArticleCategory, ArticleResponseDTO } from 'types/adminArticle';

const spaceTheme = {
    primary: '#F9A825',
    secondary: '#FFD54F',
    background: 'rgba(13, 17, 28, 0.9)',
    paper: 'rgba(22, 28, 45, 0.8)',
    text: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0'
    }
};

// 날짜 포맷 함수
function formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 더미 데이터 (실제 API 연동 시 삭제)
const dummyArticle: ArticleResponseDTO = {
    id: 1,
    title: '치킨 50% 할인 이벤트',
    content: '<p>치킨을 반값에 즐기세요! <b>오늘만!</b></p>',
    summary: '치킨 반값 이벤트 안내',
    category: ArticleCategory.CHICKEN,
    viewCount: 123,
    isVisible: 'Y',
    isDeleted: 'N',
    createdAt: '2024-06-01T12:00:00',
    updatedAt: '2024-06-01T12:00:00',
};

export function ArticleDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    // 실제로는 id로 API에서 데이터 받아와야 함
    const article = dummyArticle;

    const handleGoBack = () => {
        navigate(-1);
    };
    const handleGoHome = () => {
        navigate('/articles');
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
                                    color: spaceTheme.primary
                                },
                                transition: 'color 0.2s ease'
                            }}
                        >
                            <HomeIcon sx={{ mr: 0.5, fontSize: '0.875rem' }} />
                            아티클
                        </Link>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                maxWidth: '200px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: spaceTheme.primary
                            }}
                        >
                            {article?.title || '로딩중...'}
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
                                backgroundColor: alpha(spaceTheme.primary, 0.1),
                                color: spaceTheme.primary,
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        목록으로 돌아가기
                    </Button>

                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            backgroundColor: spaceTheme.paper,
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                        }}
                    >
                        {/* 상단 헤더 영역 */}
                        <Box
                            sx={{
                                p: { xs: 3, md: 4 },
                                backgroundColor: 'rgba(249, 168, 37, 0.1)',
                                borderBottom: `1px solid ${alpha(spaceTheme.primary, 0.3)}`
                            }}
                        >
                            <Chip
                                label={article?.category}
                                size="small"
                                sx={{
                                    backgroundColor: spaceTheme.primary,
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
                                {article?.title}
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#B0B0B0',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                                    {formatDate(article?.createdAt || '')}
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
                                        color: spaceTheme.primary,
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            color: spaceTheme.secondary
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
                                        backgroundColor: alpha(spaceTheme.primary, 0.2),
                                        fontWeight: 600,
                                        color: '#FFFFFF'
                                    },
                                    '& td': {
                                        color: '#E0E0E0'
                                    },
                                    '& blockquote': {
                                        borderLeft: `4px solid ${spaceTheme.primary}`,
                                        pl: 2,
                                        py: 1,
                                        my: 2,
                                        backgroundColor: alpha(spaceTheme.primary, 0.1),
                                        borderRadius: '0 4px 4px 0',
                                    },
                                    '& code': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: spaceTheme.secondary,
                                        p: 0.5,
                                        borderRadius: 0.5,
                                        fontFamily: 'monospace',
                                    },
                                }}
                            >
                                <div dangerouslySetInnerHTML={{ __html: article?.content || '' }} />
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
                                    backgroundColor: spaceTheme.primary,
                                    color: '#000',
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: spaceTheme.secondary,
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 6px 20px ${alpha(spaceTheme.primary, 0.4)}`
                                    },
                                    boxShadow: `0 4px 14px ${alpha(spaceTheme.primary, 0.3)}`,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                목록으로 돌아가기
                            </Button>
                        </Box>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
} 