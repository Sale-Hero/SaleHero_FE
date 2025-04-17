import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Container, IconButton, styled, TextField, Typography} from '@mui/material';
import {motion} from 'framer-motion';
import {NavigateBefore, NavigateNext, Refresh, Search} from '@mui/icons-material';
import {Outlet} from "react-router-dom";
import {CommunityContents} from "./CommunityContents";
import {CommunityCategory} from "./CommunityCategory";
import {CommunityEmpty} from "./CommunityEmpty";
import {CommunityCategories} from "../../types/community";
import {useCommunityGetter} from "../../components/community/hooks/useCommunityGetter";
import {ComponentHelmet} from "../../components/common/ComponentHelmet";

const StyledHeader = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(4)
}));
const SearchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'center',  // 전체 중앙 정렬
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
}));

// SearchArea 컴포넌트 추가
const SearchArea = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: '6px 10px',
    background: 'white',
    borderRadius: '50px',
    width: '400px',  // 검색 영역 너비 고정
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
}));

// 로딩 스피너 컴포넌트 추가
const LoadingSpinner = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    marginTop: theme.spacing(3)
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1)
}));

export function Community() {

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [searchWord, setSearchWord] = useState("")
    const [category, setCategory] = useState<CommunityCategories>(CommunityCategories.ALL)
    const [isLoading, setIsLoading] = useState(false);

    const {getCompanyInfo, posts} = useCommunityGetter();

    const fetchCompanyInfo = async () => {
        setIsLoading(true);
        await getCompanyInfo({ page: currentPage, type: category, searchWord });
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCompanyInfo().then();
    }, [currentPage, category]);

    useEffect(() => {
        if (posts) {
            setTotalPage(posts.meta.totalPages);
        }
    }, [posts]);

    const handlePageChange = (page: number) => {
        if (page <= totalPage) {
            setCurrentPage(page);
        }
    };

    const handleSearchWord = () => {
        setCurrentPage(1)
        fetchCompanyInfo().then();
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [category]);

    return (
        <>
            <Outlet/>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <StyledHeader>
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            커뮤니티
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            다른 사람들과 아이디어와 의견을 공유해보세요!
                        </Typography>
                    </StyledHeader>

                    <Box sx={{ my: 4 }}>
                        {/* Category Component */}
                        <CommunityCategory
                            categoryType={category}
                            setCategoryType={setCategory}
                        />

                        {/* Search and Pagination */}
                        <SearchContainer>
                            <IconButton
                                onClick={() => window.location.reload()}
                                sx={{ color: '#2196F3' }}
                            >
                                <Refresh />
                            </IconButton>

                            <SearchArea>
                                <TextField
                                    size="small"
                                    placeholder="검색어를 입력하세요"
                                    onChange={(e) => setSearchWord(e.target.value)}
                                    sx={{
                                        flex: 1,
                                        '& .MuiOutlinedInput-root': {
                                            border: 'none',
                                            '& fieldset': { border: 'none' },
                                        },
                                        '& .MuiInputBase-input': {
                                            padding: '8px 0',
                                        }
                                    }}
                                />
                                <IconButton
                                    onClick={handleSearchWord}
                                    sx={{
                                        color: 'white',
                                        background: '#2196F3',
                                        '&:hover': {
                                            background: '#1976D2'
                                        }
                                    }}
                                >
                                    <Search />
                                </IconButton>
                            </SearchArea>

                            <PaginationContainer>
                                <IconButton
                                    disabled={currentPage <= 1}
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                >
                                    <NavigateBefore />
                                </IconButton>
                                <Typography>
                                    {`${totalPage === 0 ? 0 : currentPage} / ${totalPage}`}
                                </Typography>
                                <IconButton
                                    disabled={currentPage >= totalPage}
                                    onClick={() => currentPage < totalPage && handlePageChange(currentPage + 1)}
                                >
                                    <NavigateNext />
                                </IconButton>
                            </PaginationContainer>
                        </SearchContainer>

                        {/* Contents */}
                        {isLoading ? (
                            <LoadingSpinner>
                                <CircularProgress
                                    size={50}
                                    sx={{
                                        color: '#2196F3',
                                        '& .MuiCircularProgress-circle': {
                                            strokeLinecap: 'round',
                                        }
                                    }}
                                />
                            </LoadingSpinner>
                        ) : (
                            posts && totalPage >= 1 ? (
                                <CommunityContents posts={posts.data} />
                            ) : (
                                <CommunityEmpty />
                            )
                        )}
                    </Box>
                </motion.div>
                <ComponentHelmet title="Sale Hero - 커뮤니티" />
            </Container>
        </>
    );
}