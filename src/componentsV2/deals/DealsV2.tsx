import React, { useState, useEffect } from 'react';
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
    CircularProgress,
    useMediaQuery,
    useTheme,
    IconButton,
    Divider,
    Tabs,
    Tab,
    alpha
} from '@mui/material';
import {
    Search as SearchIcon,
    Refresh as RefreshIcon,
    CalendarToday as CalendarIcon,
    FilterList as FilterListIcon,
    Stars as StarsIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { UserNewsLetterDTO } from "../../types/deal";
import { useNavigate } from "react-router-dom";
import {useUserNewsLetterGetter} from "../../components/deals/hooks/useUserNewsLetterGetter";

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

// 할인 정보 페이지 컴포넌트
export function DealsV2() {
    const navigate = useNavigate();
    const { getNewsLetters, newsLetters, totalPages, isLoading } = useUserNewsLetterGetter();
    const [filteredDeals, setFilteredDeals] = useState<UserNewsLetterDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [tabValue, setTabValue] = useState(0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const itemsPerPage = 4;

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        getNewsLetters();
    }, [getNewsLetters]);

    // newsLetter가 변경될 때 필터링된 목록 업데이트
    useEffect(() => {
        if (newsLetters?.content) {
            setFilteredDeals(newsLetters.content);
        }
    }, [newsLetters]);

    // 탭 변경 처리
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setPage(1);

        if (newsLetters?.content) {
            if (newValue === 0) {
                setFilteredDeals(newsLetters.content);
            } else if (newValue === 1) {
                // 추천 할인은 임의로 최근 3개만 표시
                setFilteredDeals(newsLetters.content.slice(0, 3));
            }
        }
    };

    // 검색 처리
    const handleSearch = () => {
        if (!newsLetters?.content) return;

        if (searchTerm.trim() === '') {
            setFilteredDeals(newsLetters.content);
        } else {
            const filtered = newsLetters.content.filter(deal =>
                deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                deal.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredDeals(filtered);
        }
        setPage(1);
    };

    // 새로고침 처리
    const handleRefresh = () => {
        setSearchTerm('');
        setTabValue(0);
        setPage(1);
        getNewsLetters();
    };

    // 페이지네이션 처리
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 콘텐츠에서 요약 정보 추출
    const extractSummary = (content: string): string => {
        // HTML 태그 제거
        const strippedContent = content.replace(/<[^>]*>/g, ' ');
        // 요약은 최대 150자
        return strippedContent.substring(0, 150) + (strippedContent.length > 150 ? '...' : '');
    };

    // 날짜 포맷팅
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // 현재 페이지의 아이템
    const currentPageItems = filteredDeals.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // 계산된 총 페이지 수
    const calculatedTotalPages = Math.ceil(filteredDeals.length / itemsPerPage);

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
                                할인 정보
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
                                세일히어로가 엄선한 최신 할인 정보와 프로모션을 확인해보세요
                            </Typography>
                        </motion.div>
                    </Box>

                    {/* 검색 및 필터 영역 */}
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
                                placeholder="할인 정보 검색..."
                                variant="standard"
                                fullWidth
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                                onClick={handleSearch}
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

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                                sx={{
                                    color: spaceTheme.text.secondary,
                                    backgroundColor: alpha(spaceTheme.paper, 0.5),
                                    backdropFilter: 'blur(5px)',
                                    '&:hover': {
                                        backgroundColor: alpha(spaceTheme.primary, 0.2),
                                        color: spaceTheme.primary
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={handleRefresh}
                                title="새로고침"
                            >
                                <RefreshIcon />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: spaceTheme.text.secondary,
                                    backgroundColor: alpha(spaceTheme.paper, 0.5),
                                    backdropFilter: 'blur(5px)',
                                    '&:hover': {
                                        backgroundColor: alpha(spaceTheme.primary, 0.2),
                                        color: spaceTheme.primary
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                                title="필터"
                            >
                                <FilterListIcon />
                            </IconButton>
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
                            onChange={handleTabChange}
                            variant={isMobile ? "fullWidth" : "standard"}
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
                            <Tab label="전체 할인" icon={<FilterListIcon />} iconPosition="start" />
                            <Tab label="추천 할인" icon={<StarsIcon />} iconPosition="start" />
                        </Tabs>
                    </Box>

                    {/* 할인 정보 카드 영역 */}
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                            <CircularProgress sx={{ color: spaceTheme.primary }} />
                        </Box>
                    ) : currentPageItems.length > 0 ? (
                        <Grid container spacing={3}>
                            {currentPageItems.map((deal, index) => (
                                <Grid item xs={12} key={deal.id}>
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
                                                backdropFilter: 'blur(10px)',
                                                boxShadow: `0 8px 32px ${alpha('#000', 0.2)}`,
                                                transition: 'all 0.3s ease',
                                                border: `1px solid ${alpha(spaceTheme.text.primary, 0.1)}`,
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: `0 12px 28px ${alpha(spaceTheme.primary, 0.2)}`,
                                                    borderColor: alpha(spaceTheme.primary, 0.3),
                                                },
                                            }}
                                        >
                                            <CardContent sx={{ p: 0 }}>
                                                <Box sx={{ p: 3 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                                        <Chip
                                                            label={tabValue === 1 ? "추천 할인" : "할인 정보"}
                                                            size="small"
                                                            icon={tabValue === 1 ? <StarsIcon /> : <FilterListIcon />}
                                                            sx={{
                                                                backgroundColor: tabValue === 1
                                                                    ? alpha(spaceTheme.primary, 0.2)
                                                                    : alpha(spaceTheme.text.primary, 0.1),
                                                                color: tabValue === 1
                                                                    ? spaceTheme.primary
                                                                    : spaceTheme.text.secondary,
                                                                fontWeight: 600,
                                                                borderRadius: '50px',
                                                                px: 1,
                                                                border: tabValue === 1
                                                                    ? `1px solid ${alpha(spaceTheme.primary, 0.5)}`
                                                                    : 'none',
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: spaceTheme.text.tertiary,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5
                                                            }}
                                                        >
                                                            <CalendarIcon fontSize="small" />
                                                            {formatDate(deal.createdAt)}
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
                                                        onClick={() => navigate(`/deals/${deal.id}`)}
                                                    >
                                                        {deal.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            mb: 2,
                                                            lineHeight: 1.7,
                                                            color: spaceTheme.text.secondary,
                                                        }}
                                                    >
                                                        {extractSummary(deal.content)}
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
                                                            onClick={() => navigate(`/deals/${deal.id}`)}
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
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    p: 8,
                                    backgroundColor: alpha(spaceTheme.paper, 0.7),
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 3,
                                    border: `1px dashed ${alpha(spaceTheme.text.primary, 0.2)}`,
                                    boxShadow: `0 8px 32px ${alpha('#000', 0.2)}`,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '80px',
                                        height: '80px',
                                        backgroundColor: alpha(spaceTheme.primary, 0.1),
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 20px'
                                    }}
                                >
                                    <SearchIcon sx={{ fontSize: 36, color: spaceTheme.primary }} />
                                </Box>
                                <Typography variant="h6" sx={{ color: spaceTheme.text.primary, fontWeight: 600 }}>
                                    검색 결과가 없습니다
                                </Typography>
                                <Typography variant="body2" sx={{ color: spaceTheme.text.secondary, mt: 1 }}>
                                    다른 검색어를 입력하거나 필터를 재설정해주세요
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={handleRefresh}
                                    startIcon={<RefreshIcon />}
                                    sx={{
                                        mt: 3,
                                        borderColor: alpha(spaceTheme.primary, 0.5),
                                        color: spaceTheme.primary,
                                        '&:hover': {
                                            backgroundColor: alpha(spaceTheme.primary, 0.1),
                                            borderColor: spaceTheme.primary
                                        },
                                        px: 3,
                                        borderRadius: '50px'
                                    }}
                                >
                                    필터 초기화
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {/* 페이지네이션 */}
                    {calculatedTotalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                            <Pagination
                                count={calculatedTotalPages}
                                page={page}
                                onChange={handlePageChange}
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
