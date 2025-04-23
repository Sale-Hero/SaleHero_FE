import React, {useEffect, useState} from 'react';
import {Box, CardContent, CircularProgress, IconButton, Pagination, Tab, TextField, Typography} from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Create as CreateIcon,
    Refresh as RefreshIcon,
    Search as SearchIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import {motion} from 'framer-motion';
import {CommunityCategory} from 'types/community';
import {
    CardFooter,
    CategoryTabs,
    CommunityCard,
    EmptyStateBox,
    HeroSection,
    LoadingWrapper,
    SearchBox,
    StyledAvatar,
    StyledButton,
    StyledContainer,
    TypeChip
} from './hooks/useCommunityStyles';
import {useCommunityGetter} from "./hooks/useCommunityGetter";
import {PageSearchDTO} from "../../types/common";
import {DEFAULT_ARTICLE_SIZE} from "../../util/etcUtil";


// 메인 커뮤니티 컴포넌트
export const Community: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [category, setCategory] = useState<CommunityCategory>(CommunityCategory.ALL)

    const { getArticles, posts, totalPages} = useCommunityGetter();

    // 데이터 로딩 함수
    const fetchPosts = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const pageDTO: PageSearchDTO = {
                page: page,
                size: DEFAULT_ARTICLE_SIZE
            }
            getArticles({pageCondition:pageDTO, category: category}).then(() => setIsLoading(false))

        } catch (error) {
            console.error("데이터 로딩 실패:", error);
            setIsLoading(false);
        }
    };

    // 탭 변경 핸들러
    const handleTabChange = (
        _event: React.SyntheticEvent,
        newValue: CommunityCategory
    ): void => {
        setCategory(newValue);
        setPage(1);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number): void => {
        setPage(value);
    };

    // 검색 핸들러
    const handleSearch = (): void => {
        setPage(1);
        fetchPosts();
    };

    // 페이지 로드시 데이터 가져오기
    useEffect(() => {
        fetchPosts();
    }, [page, category]);

    // 날짜 포맷팅 함수
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    // 시간 포맷팅 함수
    const formatTime = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('ko-KR', options);
    };

    // 카테고리 라벨 가져오기
    const getCategoryLabel = (category: CommunityCategory): string => {
        return category === CommunityCategory.INFORMATION ? '정보' : '커뮤니티';
    };

    console.log(category)
    return (
        <StyledContainer maxWidth="lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* 헤더 섹션 */}
                <HeroSection>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        {/* 실제 이미지 경로로 변경 필요 */}
                        <img src="/path-to-salehero-icon.png" alt="세일히어로" width="80" />
                    </Box>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="#FF6F00"
                        gutterBottom
                    >
                        세일히어로 커뮤니티
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        다양한 할인 정보와 경험을 공유하는 공간입니다
                    </Typography>
                </HeroSection>

                {/* 카테고리 탭 */}
                <CategoryTabs
                    value={category}
                    onChange={handleTabChange}
                    centered
                >
                    <Tab label="전체보기" value={CommunityCategory.ALL} />
                    <Tab label="정보" value={CommunityCategory.INFORMATION} />
                    <Tab label="커뮤니티" value={CommunityCategory.COMMUNITY} />
                </CategoryTabs>

                {/* 검색 및 새 글쓰기 */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <SearchBox>
                        <TextField
                            placeholder="검색어를 입력하세요"
                            variant="standard"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            sx={{ flex: 1 }}
                        />
                        <IconButton onClick={handleSearch} sx={{ color: '#FF9800' }}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton onClick={() => window.location.reload()} sx={{ color: '#757575' }}>
                            <RefreshIcon />
                        </IconButton>
                    </SearchBox>

                    <StyledButton
                        variant="contained"
                        disableElevation
                        startIcon={<CreateIcon />}
                    >
                        새 글쓰기
                    </StyledButton>
                </Box>

                {/* 게시글 리스트 */}
                {isLoading ? (
                    <LoadingWrapper>
                        <CircularProgress sx={{ color: '#FF9800' }} />
                    </LoadingWrapper>
                ) : posts?.content !== undefined ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {posts?.content.map((post) => (
                            <CommunityCard key={post.id}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <TypeChip
                                            label={getCategoryLabel(post.category)}
                                            category={post.category}
                                            size="small"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            {formatDate(post.createdAt)}
                                        </Typography>
                                    </Box>

                                    <Typography variant="h6" fontWeight="medium" sx={{ mb: 1 }}>
                                        {post.title}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {post.content}
                                    </Typography>

                                    <CardFooter>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <StyledAvatar>{post.writerName.charAt(0)}</StyledAvatar>
                                            <Typography variant="body2">{post.writerName}</Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <VisibilityIcon sx={{ fontSize: 16, color: '#9E9E9E', mr: 0.5 }} />
                                            <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                                                {post.viewCount}
                                            </Typography>
                                            <AccessTimeIcon sx={{ fontSize: 16, color: '#9E9E9E', mr: 0.5 }} />
                                            <Typography variant="caption" color="text.secondary">
                                                {formatTime(post.createdAt)}
                                            </Typography>
                                        </Box>
                                    </CardFooter>
                                </CardContent>
                            </CommunityCard>
                        ))}

                        {/* 페이지네이션 */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: '#FF9800',
                                    },
                                    '& .Mui-selected': {
                                        backgroundColor: '#FFE0B2',
                                        fontWeight: 'bold',
                                    }
                                }}
                            />
                        </Box>
                    </motion.div>
                ) : (
                    <EmptyStateBox>
                        {/* 실제 이미지 경로로 변경 필요 */}
                        <img src="/path-to-empty-icon.png" alt="게시글 없음" width="80" height="80" />
                        <Typography variant="h6" color="#FF9800" sx={{ mt: 2 }}>
                            등록된 게시글이 없습니다
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            첫 번째 게시글을 작성해보세요!
                        </Typography>
                    </EmptyStateBox>
                )}
            </motion.div>
        </StyledContainer>
    );
};