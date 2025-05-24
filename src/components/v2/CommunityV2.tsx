import React, {useEffect, useState} from 'react';
import {alpha, Box, CircularProgress, IconButton, Pagination, Tab, TextField, Typography} from '@mui/material';
import {Create as CreateIcon, Refresh as RefreshIcon, Search as SearchIcon} from '@mui/icons-material';
import {motion} from 'framer-motion';
import {CommunityCategory} from 'types/community';
import {PageSearchDTO} from "../../types/common";
import {DEFAULT_ARTICLE_SIZE} from "../../util/etcUtil";
import {useNavigate} from 'react-router-dom';
import {useUserInfo} from "../../hooks/hooks";
import {useCommunityGetter} from 'components/community/hooks/useCommunityGetter';
import {
    CategoryTabs,
    EmptyStateBox,
    LoadingWrapper,
    SearchBox,
    StyledButton,
    StyledContainer
} from 'components/community/hooks/useCommunityStyles';
import {CommunityListFieldV2} from "../community/hooks/CommunityListFieldV2";

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

                    {/* 카테고리 탭  */}
                    <Box sx={{ mb: 5 }}>
                        <CategoryTabs
                            value={category}
                            onChange={handleTabChange}
                            centered
                            sx={{
                                backgroundColor: 'rgba(22, 28, 45, 0.8)',
                                borderRadius: '12px',
                                padding: '8px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                '& .MuiTab-root': {
                                    color: '#B0B0B0', // 기본 상태에서 더 밝은 색상
                                    fontWeight: 500,
                                    transition: 'all 0.3s ease',
                                    margin: '0 8px',
                                    borderRadius: '8px',
                                    minHeight: '44px',
                                    '&:hover': {
                                        backgroundColor: alpha(darkSpaceTheme.primary, 0.15),
                                        color: '#FFFFFF' // 호버 시 흰색으로 변경
                                    }
                                },
                                '& .Mui-selected': {
                                    color: '#FFFFFF', // 선택된 탭은 흰색
                                    backgroundColor: alpha(darkSpaceTheme.primary, 0.25),
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
                                backgroundColor: 'rgba(22, 28, 45, 0.9)',
                                borderRadius: '10px',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                padding: '6px 12px',
                                height: '44px', // 높이 고정
                                display: 'flex',
                                alignItems: 'center',
                                '&:hover': {
                                    border: `1px solid ${alpha(darkSpaceTheme.primary, 0.6)}`,
                                    backgroundColor: 'rgba(22, 28, 45, 1)'
                                },
                                transition: 'all 0.3s ease',
                                flex: 1,
                                minWidth: '250px',
                                marginBottom: '0'
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
                                    style: { color: '#FFFFFF' } // 입력 텍스트 색상 개선
                                }}
                                sx={{
                                    flex: 1,
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#A0A0A0', // 플레이스홀더 색상 개선
                                        opacity: 1
                                    }
                                }}
                            />
                            <IconButton
                                onClick={handleSearch}
                                sx={{
                                    color: darkSpaceTheme.primary,
                                    '&:hover': {
                                        backgroundColor: alpha(darkSpaceTheme.primary, 0.15),
                                        color: darkSpaceTheme.secondary
                                    }
                                }}
                            >
                                <SearchIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => window.location.reload()}
                                sx={{
                                    color: '#C0C0C0', // 새로고침 아이콘 색상 개선
                                    '&:hover': {
                                        backgroundColor: alpha(darkSpaceTheme.text.primary, 0.1),
                                        color: '#FFFFFF'
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
                                height: '44px', // 검색박스와 같은 높이
                                '&:hover': {
                                    backgroundColor: darkSpaceTheme.secondary,
                                    transform: 'translateY(-1px)',
                                    boxShadow: `0 6px 20px ${alpha(darkSpaceTheme.primary, 0.4)}`
                                },
                                transition: 'all 0.3s ease',
                                boxShadow: `0 4px 14px ${alpha(darkSpaceTheme.primary, 0.3)}`
                            }}
                        >
                            새 글쓰기
                        </StyledButton>
                    </Box>

                    {/* 게시글 리스트 - 스타일 개선 */}
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
                                    backgroundColor: 'rgba(22, 28, 45, 0.8)',
                                    borderRadius: '16px',
                                    backdropFilter: 'blur(10px)',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255, 255, 255, 0.15)'
                                }}
                            >
                                {posts?.content.map((post, index) => (
                                    <Box
                                        key={post.id}
                                        sx={{
                                            padding: '16px 20px',
                                            borderBottom: index !== posts.content.length - 1 ?
                                                `1px solid ${alpha(darkSpaceTheme.text.primary, 0.15)}` :
                                                'none',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: alpha(darkSpaceTheme.primary, 0.08),
                                                borderColor: alpha(darkSpaceTheme.primary, 0.2)
                                            },
                                            cursor: 'pointer',
                                            // 자식 컴포넌트 내부 요소들의 스타일링 개선
                                            '& .title': {
                                                color: '#FFFFFF', // 제목 색상 개선
                                                fontWeight: 500
                                            },
                                            '& .category': {
                                                backgroundColor: alpha(darkSpaceTheme.primary, 0.25),
                                                color: '#FFFFFF', // 카테고리 텍스트 색상 개선
                                                fontWeight: 600
                                            },
                                            '& .date': {
                                                color: '#B0B0B0' // 날짜 색상 개선
                                            },
                                            '& .likes, & .views, & .comments': {
                                                color: '#C0C0C0' // 좋아요, 조회수, 댓글 색상 개선
                                            }
                                        }}
                                        onClick={() => navigate(`/community/detail/${post.id}`)}
                                    >
                                        <CommunityListFieldV2 post={post} />
                                    </Box>
                                ))}
                            </Box>

                            {/* 페이지네이션 - 스타일 개선 */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 3 }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            color: '#C0C0C0', // 페이지네이션 텍스트 색상 개선
                                            borderColor: alpha(darkSpaceTheme.text.secondary, 0.3),
                                            backgroundColor: 'rgba(22, 28, 45, 0.5)',
                                            '&:hover': {
                                                backgroundColor: alpha(darkSpaceTheme.primary, 0.15),
                                                color: '#FFFFFF'
                                            }
                                        },
                                        '& .Mui-selected': {
                                            backgroundColor: alpha(darkSpaceTheme.primary, 0.3),
                                            color: '#FFFFFF', // 선택된 페이지 번호 색상 개선
                                            fontWeight: 'bold',
                                            border: `1px solid ${alpha(darkSpaceTheme.primary, 0.6)}`
                                        }
                                    }}
                                />
                            </Box>
                        </motion.div>
                    ) : (
                        <EmptyStateBox
                            sx={{
                                backgroundColor: 'rgba(22, 28, 45, 0.8)',
                                padding: '60px 20px',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                textAlign: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: alpha(darkSpaceTheme.primary, 0.15),
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px'
                                }}
                            >
                                <CreateIcon sx={{ fontSize: 36, color: darkSpaceTheme.primary }} />
                            </Box>
                            <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600, mt: 2 }}>
                                등록된 게시글이 없습니다
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#B0B0B0', mt: 1 }}>
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
                                        backgroundColor: darkSpaceTheme.secondary,
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 6px 20px ${alpha(darkSpaceTheme.primary, 0.4)}`
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