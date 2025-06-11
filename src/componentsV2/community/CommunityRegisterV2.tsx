import React, {useState} from 'react';
import {alpha, Box, Divider, IconButton, InputLabel, MenuItem, Select, Typography} from '@mui/material';
import {ArrowBack as ArrowBackIcon, Send as SendIcon} from '@mui/icons-material';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {CommunityCategory, CommunityPostDTO} from 'types/community';
import {FormSection, StyledContainer} from '../../components/community/hooks/useCommunityStyles';
import {useCommunityActions} from "../../components/community/hooks/useCommunityActions";

// 스타일 재정의 (어두운 우주 테마와 오렌지/금색 강조)
const darkSpaceTheme = {
    primary: '#F9A825', // 밝은 금색/오렌지
    secondary: '#FFD54F', // 밝은 금색
    background: 'rgba(13, 17, 28, 0.8)', // 어두운 우주 배경
    paper: 'rgba(22, 28, 45, 0.8)', // 약간 더 밝은 배경 (카드용)
    text: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0'
    },
    action: {
        hover: 'rgba(249, 168, 37, 0.1)'
    }
};

export function CommunityRegisterV2() {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<CommunityCategory>(CommunityCategory.COMMUNITY);
    const [attachments, setAttachments] = useState<File[]>([]);
    const {postArticle} = useCommunityActions();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (title === "") {
            alert("제목을 작성해주세요.");
            return;
        }

        if (content === "") {
            alert("내용을 작성해주세요.");
            return;
        }

        const dto: CommunityPostDTO = {
            title: title,
            content: content,
            category: category,
        }

        if (window.confirm("작성하신 내용으로 등록하시겠습니까?")) {
            postArticle(dto).then(() => {
                // 성공 시 목록으로 이동
                alert("게시글을 작성했습니다.");
                navigate('/community');
            });
        }
    };

    const handleRemoveAttachment = (index: number) => {
        const newAttachments = [...attachments];
        newAttachments.splice(index, 1);
        setAttachments(newAttachments);
    };

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
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                style={{ position: 'relative', zIndex: 1 }}
            >
                <StyledContainer maxWidth="lg">
                    {/* 뒤로가기 버튼 */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 3,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                '& .MuiIconButton-root': {
                                    backgroundColor: alpha(darkSpaceTheme.primary, 0.1)
                                },
                                '& .MuiTypography-root': {
                                    color: darkSpaceTheme.primary
                                }
                            }
                        }}
                        onClick={handleGoBack}
                    >
                        <IconButton
                            sx={{
                                color: '#C0C0C0',
                                mr: 1,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <ArrowBackIcon/>
                        </IconButton>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#B0B0B0',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            커뮤니티로 돌아가기
                        </Typography>
                    </Box>

                    {/* 메인 폼 */}
                    <Box
                        sx={{
                            backgroundColor: darkSpaceTheme.paper,
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            padding: '32px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: darkSpaceTheme.primary,
                                fontWeight: 700,
                                mb: 4,
                                textAlign: 'center',
                                textShadow: '0 0 10px rgba(249, 168, 37, 0.3)'
                            }}
                        >
                            새 글쓰기
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <FormSection>
                                {/* 카테고리 선택 */}
                                <Box sx={{ mb: 3 }}>
                                    <InputLabel
                                        id="category-label"
                                        sx={{
                                            color: '#C0C0C0',
                                            mb: 1,
                                            fontWeight: 500,
                                            '&.Mui-focused': {
                                                color: darkSpaceTheme.primary
                                            }
                                        }}
                                    >
                                        카테고리
                                    </InputLabel>
                                    <Select
                                        labelId="category-label"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value as CommunityCategory)}
                                        fullWidth
                                        sx={{
                                            backgroundColor: 'rgba(22, 28, 45, 0.6)',
                                            borderRadius: '8px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(255, 255, 255, 0.2)'
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: alpha(darkSpaceTheme.primary, 0.5)
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: darkSpaceTheme.primary
                                            },
                                            '& .MuiSelect-select': {
                                                color: '#FFFFFF'
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: '#C0C0C0'
                                            }
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: 'rgba(22, 28, 45, 0.95)',
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    '& .MuiMenuItem-root': {
                                                        color: '#FFFFFF',
                                                        '&:hover': {
                                                            backgroundColor: alpha(darkSpaceTheme.primary, 0.1)
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: alpha(darkSpaceTheme.primary, 0.2)
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        <MenuItem value={CommunityCategory.INFORMATION}>정보</MenuItem>
                                        <MenuItem value={CommunityCategory.COMMUNITY}>커뮤니티</MenuItem>
                                    </Select>
                                </Box>

                                {/* 제목 입력 */}
                                <Box sx={{ mb: 3 }}>
                                    <InputLabel
                                        sx={{
                                            color: '#C0C0C0',
                                            mb: 1,
                                            fontWeight: 500
                                        }}
                                    >
                                        제목
                                    </InputLabel>
                                    <Box
                                        component="input"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="제목을 입력하세요"
                                        required
                                        sx={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            backgroundColor: 'rgba(22, 28, 45, 0.6)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '8px',
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            fontFamily: 'inherit',
                                            outline: 'none',
                                            transition: 'all 0.2s ease',
                                            '&::placeholder': {
                                                color: '#A0A0A0'
                                            },
                                            '&:hover': {
                                                borderColor: alpha(darkSpaceTheme.primary, 0.5)
                                            },
                                            '&:focus': {
                                                borderColor: darkSpaceTheme.primary,
                                                boxShadow: `0 0 0 2px ${alpha(darkSpaceTheme.primary, 0.2)}`
                                            }
                                        }}
                                    />
                                </Box>

                                {/* 내용 입력 */}
                                <Box sx={{ mb: 3 }}>
                                    <InputLabel
                                        sx={{
                                            color: '#C0C0C0',
                                            mb: 1,
                                            fontWeight: 500
                                        }}
                                    >
                                        내용
                                    </InputLabel>
                                    <Box
                                        component="textarea"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="게시글 내용을 작성하세요"
                                        required
                                        rows={12}
                                        sx={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            backgroundColor: 'rgba(22, 28, 45, 0.6)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '8px',
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            fontFamily: 'inherit',
                                            outline: 'none',
                                            resize: 'vertical',
                                            minHeight: '200px',
                                            transition: 'all 0.2s ease',
                                            '&::placeholder': {
                                                color: '#A0A0A0'
                                            },
                                            '&:hover': {
                                                borderColor: alpha(darkSpaceTheme.primary, 0.5)
                                            },
                                            '&:focus': {
                                                borderColor: darkSpaceTheme.primary,
                                                boxShadow: `0 0 0 2px ${alpha(darkSpaceTheme.primary, 0.2)}`
                                            }
                                        }}
                                    />
                                </Box>
                            </FormSection>

                            {/* 첨부파일 섹션 */}
                            {attachments.length > 0 && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: '#C0C0C0',
                                            mb: 2,
                                            fontWeight: 500
                                        }}
                                    >
                                        첨부 파일 ({attachments.length})
                                    </Typography>

                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                                        {attachments.map((file, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    backgroundColor: 'rgba(22, 28, 45, 0.8)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '6px',
                                                    padding: '6px 12px',
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    noWrap
                                                    sx={{
                                                        maxWidth: 150,
                                                        color: '#FFFFFF'
                                                    }}
                                                >
                                                    {file.name}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemoveAttachment(index)}
                                                    sx={{
                                                        ml: 1,
                                                        p: 0.5,
                                                        color: '#C0C0C0',
                                                        '&:hover': {
                                                            backgroundColor: alpha(darkSpaceTheme.primary, 0.1),
                                                            color: darkSpaceTheme.primary
                                                        }
                                                    }}
                                                >
                                                    ✕
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            <Divider
                                sx={{
                                    my: 3,
                                    borderColor: 'rgba(255, 255, 255, 0.1)'
                                }}
                            />

                            {/* 버튼 섹션 */}
                            <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2}}>
                                <Box
                                    component="button"
                                    type="button"
                                    onClick={handleGoBack}
                                    sx={{
                                        padding: '10px 24px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '8px',
                                        color: '#C0C0C0',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                            color: '#FFFFFF'
                                        }
                                    }}
                                >
                                    취소
                                </Box>
                                <Box
                                    component="button"
                                    type="submit"
                                    sx={{
                                        padding: '10px 24px',
                                        backgroundColor: darkSpaceTheme.primary,
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#000',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.2s ease',
                                        boxShadow: `0 4px 14px ${alpha(darkSpaceTheme.primary, 0.3)}`,
                                        '&:hover': {
                                            backgroundColor: darkSpaceTheme.secondary,
                                            transform: 'translateY(-1px)',
                                            boxShadow: `0 6px 20px ${alpha(darkSpaceTheme.primary, 0.4)}`
                                        }
                                    }}
                                >
                                    <SendIcon sx={{ fontSize: 18 }} />
                                    등록하기
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </StyledContainer>
            </motion.div>
        </Box>
    );
}
