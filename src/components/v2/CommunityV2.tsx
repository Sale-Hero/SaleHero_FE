import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, IconButton, Pagination, Tab, TextField, Typography, alpha} from '@mui/material';
import {Create as CreateIcon, Refresh as RefreshIcon, Search as SearchIcon} from '@mui/icons-material';
import {motion} from 'framer-motion';
import {CommunityCategory} from 'types/community';
import {PageSearchDTO} from "../../types/common";
import {DEFAULT_ARTICLE_SIZE} from "../../util/etcUtil";
import { useNavigate } from 'react-router-dom';
import {useUserInfo} from "../../hooks/hooks";
import { useCommunityGetter } from 'components/community/hooks/useCommunityGetter';
import {
    CategoryTabs,
    EmptyStateBox,
    LoadingWrapper,
    SearchBox,
    StyledButton,
    StyledContainer
} from 'components/community/hooks/useCommunityStyles';
import {CommunityListField} from "../community/hooks/CommunityListField";

// 스타일 재정의 (어두운 우주 테마와 오렌지/금색 강조)
const darkSpaceTheme = {
    primary: '#F9A825', // 밝은 금색/오렌지
    secondary: '#FFD54F', // 밝은 금색
    background: 'rgba(13, 17, 28, 0.8)', // 어두운 우주 배경
    paper: 'rgba(22, 28, 45, 0.7)', // 약간 더 밝은 배경 (카드용)
    text: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0'
    },
    action: {
        hover: 'rgba(249, 168, 37, 0.1)'
    }
};

// 메인 커뮤니티 컴포넌트
export const CommunityV2: React.FC = () => {
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
        <Box
            sx={{
                background: 'linear-gradient(180deg, rgba(13, 17, 28, 0.9) 0%, rgba(13, 17, 28, 0.95) 100%)',
                minHeight: '100vh',
                position: 'relative',
                padding: '40px 0',
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
            <StyledContainer
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    '& .MuiPaper-root': {
                        backgroundColor: darkSpaceTheme.paper,
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* 헤더 섹션 - 스타일 적용 */}
                    <Box
                        sx={{
                            mb: 5,
                            textAlign: 'center',
                            position: 'relative'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    color: darkSpaceTheme.primary,
                                    fontWeight: 700,
                                    mb: 2,
                                    textShadow: '0 0 15px rgba(249, 168, 37, 0.5)'
                                }}
                            >
                                커뮤니티
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: darkSpaceTheme.text.secondary,
                                    maxWidth: '600px',
                                    margin: '0 auto'
                                }}
                            >
                                다양한 정보와 이야기를 나눠보세요. 매일 새로운 할인 정보와 팁을 공유하고 발견하세요.
                            </Typography>
                        </motion.div>
                    </Box>

                    {/* 카테고리 탭 - 스타일 적용 */}
                    <Box sx={{ mb: 5 }}>
                        <CategoryTabs
                            value={category}
                            onChange={handleTabChange}
                            centered
                            sx={{
                                backgroundColor: 'rgba(22, 28, 45, 0.5)',
                                borderRadius: '12px',
                                padding: '8px',
                                '& .MuiTab-root': {
                                    color: alpha(darkSpaceTheme.text.primary, 0.7),
                                    fontWeight: 500,
                                    transition: 'all 0.3s ease',
                                    margin: '0 8px',
                                    borderRadius: '8px',
                                    minHeight: '44px',
                                    '&:hover': {
                                        backgroundColor: alpha(darkSpaceTheme.primary, 0.1),
                                        color: darkSpaceTheme.primary
                                    }
                                },
                                '& .Mui-selected': {
                                    color: darkSpaceTheme.primary,
                                    backgroundColor: alpha(darkSpaceTheme.primary, 0.15),
                                    fontWeight: 700
                                },
                                '& .MuiTabs-indicator': {
                                    display: 'none'
                                }
                            }}
                        >
                            <Tab label="전체보기" value={CommunityCategory.ALL} />
                            <Tab label="정보" value={CommunityCategory.INFORMATION} />
                            <Tab label="커뮤니티" value={CommunityCategory.COMMUNITY} />
                        </CategoryTabs>
                    </Box>

                    {/* 검색 및 새 글쓰기 - 스타일 적용 */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 4,
                            flexWrap: 'wrap',
                            gap: 2
                        }}
                    >
                        <SearchBox
                            sx={{
                                backgroundColor: alpha(darkSpaceTheme.paper, 0.8),
                                borderRadius: '10px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '6px 12px',
                                '&:hover': {
                                    border: `1px solid ${alpha(darkSpaceTheme.primary, 0.5)}`
                                },
                                transition: 'all 0.3s ease',
                                flex: 1,
                                minWidth: '250px'
                            }}
                        >
                            <TextField
                                placeholder="검색어를 입력하세요"
                                variant="standard"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                InputProps={{
                                    disableUnderline: true,
                                    style: { color: darkSpaceTheme.text.primary }
                                }}
                                sx={{
                                    flex: 1,
                                    '& .MuiInputBase-input::placeholder': {
                                        color: alpha(darkSpaceTheme.text.secondary, 0.6)
                                    }
                                }}
                            />
                            <IconButton
                                onClick={handleSearch}
                                sx={{
                                    color: darkSpaceTheme.primary,
                                    '&:hover': {
                                        backgroundColor: alpha(darkSpaceTheme.primary, 0.1)
                                    }
                                }}
                            >
                                <SearchIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => window.location.reload()}
                                sx={{
                                    color: alpha(darkSpaceTheme.text.primary, 0.7),
                                    '&:hover': {
                                        backgroundColor: alpha(darkSpaceTheme.text.primary, 0.1),
                                        color: darkSpaceTheme.text.primary
                                    }
                                }}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </SearchBox>

                        <StyledButton
                            variant="contained"
                            disableElevation
                            startIcon={<CreateIcon />}
                            onClick={handleCreatePost}
                            sx={{
                                backgroundColor: darkSpaceTheme.primary,
                                color: '#000',
                                fontWeight: 600,
                                padding: '10px 20px',
                                borderRadius: '10px',
                                '&:hover': {
                                    backgroundColor: darkSpaceTheme.secondary
                                },
                                transition: 'all 0.3s ease',
                                boxShadow: `0 4px 14px ${alpha(darkSpaceTheme.primary, 0.3)}`
                            }}
                        >
                            새 글쓰기
                        </StyledButton>
                    </Box>

                    {/* 게시글 리스트 - 스타일 적용 */}
                    {isLoading ? (
                        <LoadingWrapper
                            sx={{
                                padding: '40px 0',
                                color: darkSpaceTheme.primary
                            }}
                        >
                            <CircularProgress sx={{ color: darkSpaceTheme.primary }} />
                        </LoadingWrapper>
                    ) : posts?.content !== undefined ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: alpha(darkSpaceTheme.paper, 0.7),
                                    borderRadius: '16px',
                                    backdropFilter: 'blur(10px)',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                {posts?.content.map((post, index) => (
                                    <Box
                                        key={post.id}
                                        sx={{
                                            padding: '16px 20px',
                                            borderBottom: index !== posts.content.length - 1 ?
                                                `1px solid ${alpha(darkSpaceTheme.text.primary, 0.1)}` :
                                                'none',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: alpha(darkSpaceTheme.primary, 0.05)
                                            },
                                            cursor: 'pointer',
                                            // 자식 컴포넌트 내부 요소들의 스타일링
                                            '& .title': {
                                                color: darkSpaceTheme.text.primary
                                            },
                                            '& .category': {
                                                backgroundColor: alpha(darkSpaceTheme.primary, 0.2),
                                                color: darkSpaceTheme.primary
                                            },
                                            '& .date': {
                                                color: alpha(darkSpaceTheme.text.secondary, 0.7)
                                            },
                                            '& .likes, & .views, & .comments': {
                                                color: alpha(darkSpaceTheme.text.secondary, 0.8)
                                            }
                                        }}
                                        onClick={() => navigate(`/community/detail/${post.id}`)}
                                    >
                                        <CommunityListField post={post} />
                                    </Box>
                                ))}
                            </Box>

                            {/* 페이지네이션 - 스타일 적용 */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 3 }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            color: darkSpaceTheme.text.secondary,
                                            borderColor: alpha(darkSpaceTheme.text.secondary, 0.2),
                                            '&:hover': {
                                                backgroundColor: alpha(darkSpaceTheme.primary, 0.1)
                                            }
                                        },
                                        '& .Mui-selected': {
                                            backgroundColor: alpha(darkSpaceTheme.primary, 0.2),
                                            color: darkSpaceTheme.primary,
                                            fontWeight: 'bold',
                                            border: `1px solid ${alpha(darkSpaceTheme.primary, 0.5)}`
                                        }
                                    }}
                                />
                            </Box>
                        </motion.div>
                    ) : (
                        <EmptyStateBox
                            sx={{
                                backgroundColor: alpha(darkSpaceTheme.paper, 0.7),
                                padding: '60px 20px',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                textAlign: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: alpha(darkSpaceTheme.primary, 0.1),
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px'
                                }}
                            >
                                <CreateIcon sx={{ fontSize: 36, color: darkSpaceTheme.primary }} />
                            </Box>
                            <Typography variant="h6" sx={{ color: darkSpaceTheme.primary, fontWeight: 600, mt: 2 }}>
                                등록된 게시글이 없습니다
                            </Typography>
                            <Typography variant="body2" sx={{ color: alpha(darkSpaceTheme.text.secondary, 0.8), mt: 1 }}>
                                첫 번째 게시글을 작성해보세요!
                            </Typography>
                            <StyledButton
                                variant="contained"
                                disableElevation
                                startIcon={<CreateIcon />}
                                onClick={handleCreatePost}
                                sx={{
                                    backgroundColor: darkSpaceTheme.primary,
                                    color: '#000',
                                    fontWeight: 600,
                                    padding: '10px 20px',
                                    borderRadius: '10px',
                                    mt: 4,
                                    '&:hover': {
                                        backgroundColor: darkSpaceTheme.secondary
                                    },
                                    transition: 'all 0.3s ease',
                                    boxShadow: `0 4px 14px ${alpha(darkSpaceTheme.primary, 0.3)}`
                                }}
                            >
                                새 글쓰기
                            </StyledButton>
                        </EmptyStateBox>
                    )}
                </motion.div>
            </StyledContainer>
        </Box>
    );
};