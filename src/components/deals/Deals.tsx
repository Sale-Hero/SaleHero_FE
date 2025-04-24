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
    Tab
} from '@mui/material';
import {
    Search as SearchIcon,
    Refresh as RefreshIcon,
    CalendarToday as CalendarIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useUserNewsLetterGetter } from "./hooks/useUserNewsLetterGetter";
import { UserNewsLetterDTO } from "../../types/deal";
import {useNavigate} from "react-router-dom";

// 할인 정보 페이지 컴포넌트
export function Deals() {
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
                // 추천 할인은 임의로 최근 3개만 표시 (실제 구현 시 적절한 조건으로 수정)
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
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* 헤더 섹션 */}
                <Box sx={{ mb: 5, textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        fontWeight="bold"
                        sx={{
                            color: '#F29727',
                            mb: 2,
                            background: 'linear-gradient(45deg, #F29727 10%, #FFCD00 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        할인 정보
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                        세일히어로가 엄선한 최신 할인 정보와 프로모션을 확인해보세요
                    </Typography>
                </Box>

                {/* 검색 및 필터 영역 */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 3,
                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            width: isMobile ? '100%' : 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#f8f8f8',
                            borderRadius: '50px',
                            border: '1px solid #eaeaea',
                            px: 2,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
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
                                        <SearchIcon sx={{ color: '#F29727' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ flex: 1 }}
                        />
                        <Button
                            onClick={handleSearch}
                            sx={{
                                backgroundColor: '#FFCD00',
                                color: '#333',
                                borderRadius: '50px',
                                '&:hover': {
                                    backgroundColor: '#F29727',
                                    color: '#fff'
                                },
                                px: 3
                            }}
                        >
                            검색
                        </Button>
                    </Box>

                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                                sx={{ color: '#666' }}
                                onClick={handleRefresh}
                                title="새로고침"
                            >
                                <RefreshIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#666' }} title="필터">
                                <FilterListIcon />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {/* 탭 영역 */}
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant={isMobile ? "fullWidth" : "standard"}
                    sx={{
                        mb: 4,
                        '& .MuiTab-root': {
                            fontWeight: 600,
                            color: '#777',
                            '&.Mui-selected': {
                                color: '#F29727',
                            }
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#FFCD00',
                            height: 3
                        }
                    }}
                >
                    <Tab label="전체 할인" />
                    <Tab label="추천 할인" />
                </Tabs>

                {/* 할인 정보 카드 영역 */}
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                        <CircularProgress sx={{ color: '#F29727' }} />
                    </Box>
                ) : currentPageItems.length > 0 ? (
                    <Grid container spacing={3}>
                        {currentPageItems.map((deal) => (
                            <Grid item xs={12} key={deal.id}>
                                <Card
                                    sx={{
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 6px 16px rgba(242, 151, 39, 0.1)',
                                        },
                                        border: '1px solid #f0f0f0'
                                    }}
                                >
                                    <CardContent sx={{ p: 0 }}>
                                        <Box sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                <Chip
                                                    label={tabValue === 1 ? "추천 할인" : "할인 정보"}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: tabValue === 1 ? '#FFF3CD' : '#e9ecef',
                                                        color: tabValue === 1 ? '#F29727' : '#555',
                                                        fontWeight: 600,
                                                        borderRadius: '50px',
                                                        px: 1
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                variant="h6"
                                                component="h2"
                                                gutterBottom
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        color: '#F29727'
                                                    }
                                                }}
                                            >
                                                {deal.title}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mb: 2, lineHeight: 1.7 }}
                                            >
                                                {extractSummary(deal.content)}
                                            </Typography>

                                            <Divider sx={{ my: 2 }} />

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                    gap: 1
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center', color: '#888' }}>
                                                    <CalendarIcon fontSize="small" sx={{ mr: 0.5 }} />
                                                    <Typography variant="caption">{formatDate(deal.createdAt)}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box
                                            sx={{
                                                p: 2,
                                                backgroundColor: '#f9f9f9',
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                onClick={() => navigate(`/deals/${deal.id}`)}
                                                sx={{
                                                    borderColor: '#FFCD00',
                                                    color: '#F29727',
                                                    '&:hover': {
                                                        backgroundColor: '#FFF3CD',
                                                        borderColor: '#F29727'
                                                    },
                                                    px: 4,
                                                    borderRadius: '50px'
                                                }}
                                            >
                                                자세히 보기
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            textAlign: 'center',
                            p: 8,
                            backgroundColor: '#f9f9f9',
                            borderRadius: 2,
                            border: '1px dashed #ddd'
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            검색 결과가 없습니다
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            다른 검색어를 입력하거나 필터를 재설정해주세요
                        </Typography>
                    </Box>
                )}

                {/* 페이지네이션 */}
                {calculatedTotalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <Pagination
                            count={calculatedTotalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: '#555',
                                },
                                '& .Mui-selected': {
                                    backgroundColor: '#FFF3CD !important',
                                    color: '#F29727',
                                    fontWeight: 'bold',
                                }
                            }}
                        />
                    </Box>
                )}
            </motion.div>
        </Container>
    );
}