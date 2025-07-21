import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    TextField,
    InputAdornment,
    Button,
    Pagination,
    Divider,
    Tabs,
    Tab,
    alpha,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterListIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {ArticleCategory, ArticleResponseDTO} from 'types/adminArticle';
import { useNavigate } from 'react-router-dom';


// 더미 데이터
const dummyArticles: ArticleResponseDTO[] = [
    {
        id: 1,
        title: '치킨 50% 할인 이벤트',
        content: '<p>치킨을 반값에 즐기세요! <b>오늘만!</b></p>',
        summary: '치킨 반값 이벤트 안내',
        category: ArticleCategory.CHICKEN,
        viewCount: 123,
        isVisible: 'Y',
        isDeleted: 'N',
        createdAt: '',
        updatedAt: '',
    },
    {
        id: 2,
        title: '피자 1+1 프로모션',
        content: '<p>피자 한 판 사면 한 판 더!</p>',
        summary: '피자 1+1 행사',
        category: ArticleCategory.PIZZA,
        viewCount: 88,
        isVisible: 'Y',
        isDeleted: 'N',
        createdAt: '',
        updatedAt: '',
    },
    {
        id: 3,
        title: '여름맞이 프로모션',
        content: '<p>여름 한정 다양한 할인!</p>',
        summary: '여름 한정 프로모션',
        category: ArticleCategory.PROMOTION,
        viewCount: 55,
        isVisible: 'Y',
        isDeleted: 'N',
        createdAt: '',
        updatedAt: '',
    },
];

// 테마 (DealsV2 참고)
const spaceTheme = {
    primary: '#F9A825',
    secondary: '#FFD54F',
    background: '#0D111C',
    paper: 'rgba(22, 28, 45, 0.7)',
    text: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0',
        tertiary: '#B0B0B0'
    },
    divider: 'rgba(255, 255, 255, 0.1)'
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

export function Article() {
    const [articles] = useState<ArticleResponseDTO[]>(dummyArticles);
    const [searchTerm, setSearchTerm] = useState('');
    const [tabValue, setTabValue] = useState<ArticleCategory | 'ALL'>('ALL');
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const itemsPerPage = 4;
    const navigate = useNavigate();

    // 필터링
    const filtered = articles.filter(
        a => (tabValue === 'ALL' || a.category === tabValue) &&
            (a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             a.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const currentPageItems = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    // 요약 추출
    const extractSummary = (content: string, summary?: string) => {
        if (summary) return summary;
        const stripped = content.replace(/<[^>]*>/g, ' ');
        return stripped.substring(0, 150) + (stripped.length > 150 ? '...' : '');
    };

    return (
        <Box
            sx={{
                background: 'linear-gradient(180deg, rgba(13, 17, 28, 0.95) 0%, rgba(13, 17, 28, 0.98) 100%)',
                minHeight: '100vh',
                position: 'relative',
                pt: 4,
                pb: 6,
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
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 헤더 섹션 */}
                    <Box sx={{ mb: 5, textAlign: 'center' }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <Typography
                                variant="h3"
                                component="h1"
                                fontWeight="bold"
                                sx={{
                                    color: spaceTheme.primary,
                                    mb: 2,
                                    background: `linear-gradient(45deg, ${spaceTheme.primary} 10%, ${spaceTheme.secondary} 90%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: `0 0 20px ${alpha(spaceTheme.primary, 0.4)}`,
                                }}
                            >
                                아티클
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: spaceTheme.text.secondary,
                                    mb: 3,
                                    maxWidth: '700px',
                                    margin: '0 auto'
                                }}
                            >
                                세일히어로가 엄선한 최신 아티클과 소식을 확인해보세요
                            </Typography>
                        </motion.div>
                    </Box>

                    {/* 검색 및 탭 영역 */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 4,
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                                width: isMobile ? '100%' : 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: alpha(spaceTheme.paper, 0.7),
                                backdropFilter: 'blur(10px)',
                                borderRadius: '50px',
                                border: `1px solid ${alpha(spaceTheme.text.primary, 0.1)}`,
                                px: 2,
                                boxShadow: `0 4px 20px ${alpha('#000', 0.2)}`,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: `0 6px 25px ${alpha(spaceTheme.primary, 0.15)}`,
                                    borderColor: alpha(spaceTheme.primary, 0.3),
                                }
                            }}
                        >
                            <TextField
                                placeholder="아티클 검색..."
                                variant="standard"
                                fullWidth
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && setPage(1)}
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: spaceTheme.primary }} />
                                        </InputAdornment>
                                    ),
                                    style: { color: spaceTheme.text.primary }
                                }}
                                sx={{
                                    flex: 1,
                                    '& .MuiInputBase-input::placeholder': {
                                        color: alpha(spaceTheme.text.secondary, 0.6),
                                        opacity: 1
                                    }
                                }}
                            />
                            <Button
                                onClick={() => setPage(1)}
                                sx={{
                                    backgroundColor: spaceTheme.primary,
                                    color: '#000',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: spaceTheme.secondary,
                                    },
                                    px: 3,
                                    py: 1,
                                    transition: 'all 0.3s ease',
                                    boxShadow: `0 2px 10px ${alpha(spaceTheme.primary, 0.3)}`
                                }}
                            >
                                검색
                            </Button>
                        </Box>
                    </Box>

                    {/* 탭 영역 */}
                    <Box
                        sx={{
                            mb: 4,
                            backgroundColor: alpha(spaceTheme.paper, 0.5),
                            borderRadius: '12px',
                            padding: '8px',
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${alpha(spaceTheme.text.primary, 0.1)}`
                        }}
                    >
                        <Tabs
                            value={tabValue}
                            onChange={(_, v) => { setTabValue(v); setPage(1); }}
                            variant={isMobile ? 'fullWidth' : 'standard'}
                            sx={{
                                '& .MuiTab-root': {
                                    fontWeight: 600,
                                    color: spaceTheme.text.secondary,
                                    minHeight: '44px',
                                    borderRadius: '8px',
                                    margin: '0 4px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: alpha(spaceTheme.primary, 0.1),
                                        color: spaceTheme.primary
                                    },
                                    '&.Mui-selected': {
                                        color: spaceTheme.primary,
                                        backgroundColor: alpha(spaceTheme.primary, 0.15),
                                    }
                                },
                                '& .MuiTabs-indicator': {
                                    display: 'none'
                                }
                            }}
                        >
                            <Tab label="전체" icon={<FilterListIcon />} iconPosition="start" value="ALL" />
                            <Tab label="프로모션" value={ArticleCategory.PROMOTION} />
                            <Tab label="치킨" value={ArticleCategory.CHICKEN} />
                            <Tab label="피자" value={ArticleCategory.PIZZA} />
                        </Tabs>
                    </Box>

                    {/* 리스트 motion.div로 감싸기 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Grid container spacing={3}>
                            {currentPageItems.map((article, index) => (
                                <Grid item xs={12} key={article.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card
                                            sx={{
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                backgroundColor: alpha(spaceTheme.paper, 0.7),
                                                boxShadow: `0 8px 32px ${alpha('#000', 0.2)}`,
                                                transition: 'all 0.3s ease',
                                                border: `1px solid ${alpha(spaceTheme.text.primary, 0.1)}`,
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: `0 12px 28px ${alpha(spaceTheme.primary, 0.2)}`,
                                                    borderColor: alpha(spaceTheme.primary, 0.3),
                                                },
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => navigate(`/articles/${article.id}`)}
                                        >
                                            <CardContent sx={{ p: 0 }}>
                                                <Box sx={{ p: 3 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Chip
                                                                label={article.category}
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor: alpha(spaceTheme.primary, 0.2),
                                                                    color: spaceTheme.primary,
                                                                    fontWeight: 600,
                                                                    borderRadius: '50px',
                                                                    px: 1
                                                                }}
                                                            />
                                                            <Typography variant="caption" sx={{ color: spaceTheme.text.tertiary }}>
                                                                {formatDate(article.createdAt)}
                                                            </Typography>
                                                        </Box>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: spaceTheme.text.tertiary,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5
                                                            }}
                                                        >
                                                            <VisibilityIcon fontSize="small" sx={{ mr: 0.5 }} />
                                                            {article.viewCount}
                                                        </Typography>
                                                    </Box>

                                                    <Typography
                                                        variant="h6"
                                                        component="h2"
                                                        gutterBottom
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                                                            cursor: 'pointer',
                                                            color: spaceTheme.text.primary,
                                                            transition: 'color 0.2s ease',
                                                            '&:hover': {
                                                                color: spaceTheme.primary,
                                                            }
                                                        }}
                                                    >
                                                        {article.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            mb: 2,
                                                            lineHeight: 1.7,
                                                            color: spaceTheme.text.secondary,
                                                        }}
                                                    >
                                                        {extractSummary(article.content, article.summary)}
                                                    </Typography>

                                                    <Divider sx={{
                                                        my: 2,
                                                        borderColor: spaceTheme.divider
                                                    }} />

                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() => navigate(`/articles/${article.id}`)}
                                                            sx={{
                                                                borderColor: alpha(spaceTheme.primary, 0.5),
                                                                color: spaceTheme.primary,
                                                                '&:hover': {
                                                                    backgroundColor: alpha(spaceTheme.primary, 0.1),
                                                                    borderColor: spaceTheme.primary
                                                                },
                                                                px: 4,
                                                                py: 1,
                                                                borderRadius: '50px',
                                                                fontWeight: 600,
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            자세히 보기
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>

                    {/* 페이지네이션 */}
                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, v) => setPage(v)}
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: spaceTheme.text.secondary,
                                        borderColor: alpha(spaceTheme.text.secondary, 0.2),
                                        '&:hover': {
                                            backgroundColor: alpha(spaceTheme.primary, 0.1)
                                        }
                                    },
                                    '& .Mui-selected': {
                                        backgroundColor: alpha(spaceTheme.primary, 0.2) + ' !important',
                                        color: spaceTheme.primary,
                                        fontWeight: 'bold',
                                        border: `1px solid ${alpha(spaceTheme.primary, 0.5)}`
                                    }
                                }}
                            />
                        </Box>
                    )}
                </motion.div>
            </Container>
        </Box>
    );
}
