import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, IconButton, Pagination, Tab, TextField, Typography} from '@mui/material';
import {Create as CreateIcon, Refresh as RefreshIcon, Search as SearchIcon} from '@mui/icons-material';
import {motion} from 'framer-motion';
import {CommunityCategory} from 'types/community';
import {
    CategoryTabs,
    EmptyStateBox,
    LoadingWrapper,
    SearchBox,
    StyledButton,
    StyledContainer
} from './hooks/useCommunityStyles';
import {useCommunityGetter} from "./hooks/useCommunityGetter";
import {PageSearchDTO} from "../../types/common";
import {DEFAULT_ARTICLE_SIZE} from "../../util/etcUtil";
import {CommunityHeaderField} from "./hooks/CommunityHeaderField";
import {CommunityListField} from "./hooks/CommunityListField";
import { useNavigate } from 'react-router-dom';
import {useUserInfo} from "../../hooks/hooks";


// 메인 커뮤니티 컴포넌트
export const Community: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [category, setCategory] = useState<CommunityCategory>(CommunityCategory.ALL)
    const {id} = useUserInfo();

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

    // 새 글쓰기 핸들러
    const handleCreatePost = (): void => {
        if (id === 0) {
            alert("로그인 후 이용해주세요.");
            return;
        }
        navigate('/community/register');
    };

    // 페이지 로드시 데이터 가져오기
    useEffect(() => {
        fetchPosts();
    }, [page, category]);


    return (
        <StyledContainer maxWidth="lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* 헤더 섹션 */}
                <CommunityHeaderField />

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
                        onClick={handleCreatePost}
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
                            <CommunityListField key={post.id} post={post} />
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