import React, {useState} from 'react';
import {Box, Divider, IconButton, InputLabel, MenuItem, Select, Typography} from '@mui/material';
import {ArrowBack as ArrowBackIcon, Send as SendIcon} from '@mui/icons-material';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {CommunityCategory, CommunityPostDTO} from 'types/community';
import {
    CancelButton,
    FormSection,
    FormTitle,
    StyledContainer,
    StyledFormControl,
    StyledPaper,
    StyledTextField,
    SubmitButton
} from './hooks/useCommunityStyles';
import {useCommunityActions} from "./hooks/useCommunityActions";


export function CommunityRegister() {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<CommunityCategory>(CommunityCategory.COMMUNITY);
    const [attachments, setAttachments] = useState<File[]>([]);
    const {postArticle} = useCommunityActions();

    const handleGoBack = () => {
        navigate(-1);
    };

    // const handleImageAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files.length > 0) {
    //         const newFiles = Array.from(event.target.files);
    //         setAttachments([...attachments, ...newFiles]);
    //     }
    // };
    //
    // const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files.length > 0) {
    //         const newFiles = Array.from(event.target.files);
    //         setAttachments([...attachments, ...newFiles]);
    //     }
    // };

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
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
        >
            <StyledContainer maxWidth="lg">
                <Box sx={{display: 'flex', alignItems: 'center', mb: 3, cursor: 'pointer'}} onClick={handleGoBack}>
                    <IconButton sx={{color: '#757575', mr: 1}}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="subtitle1" color="text.secondary">
                        커뮤니티로 돌아가기
                    </Typography>
                </Box>

                <StyledPaper>
                    <FormTitle variant="h5">
                        새 글쓰기
                    </FormTitle>

                    <form onSubmit={handleSubmit}>
                        <FormSection>
                            <StyledFormControl fullWidth variant="outlined" sx={{mb: 3}}>
                                <InputLabel id="category-label">카테고리</InputLabel>
                                <Select
                                    labelId="category-label"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as CommunityCategory)}
                                    label="카테고리"
                                >
                                    <MenuItem value={CommunityCategory.INFORMATION}>정보</MenuItem>
                                    <MenuItem value={CommunityCategory.COMMUNITY}>커뮤니티</MenuItem>
                                </Select>
                            </StyledFormControl>

                            <StyledTextField
                                fullWidth
                                label="제목"
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                                required
                                sx={{mb: 3}}
                            />

                            <StyledTextField
                                fullWidth
                                label="내용"
                                variant="outlined"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="게시글 내용을 작성하세요"
                                required
                                multiline
                                rows={12}
                                sx={{mb: 3}}
                            />
                        </FormSection>

                        {attachments.length > 0 && (
                            <FormSection>
                                <Typography variant="subtitle2" color="text.secondary" sx={{mb: 2}}>
                                    첨부 파일 ({attachments.length})
                                </Typography>

                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                                    {attachments.map((file, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                bgcolor: '#F5F5F5',
                                                borderRadius: 1,
                                                padding: '4px 8px',
                                            }}
                                        >
                                            <Typography variant="body2" noWrap sx={{maxWidth: 150}}>
                                                {file.name}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleRemoveAttachment(index)}
                                                sx={{ml: 1, p: 0.5}}
                                            >
                                                ✕
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                            </FormSection>
                        )}

                        <Divider sx={{my: 3}}/>

                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box>
                                <CancelButton onClick={handleGoBack}>
                                    취소
                                </CancelButton>
                                <SubmitButton type="submit" startIcon={<SendIcon/>}>
                                    등록하기
                                </SubmitButton>
                            </Box>
                        </Box>
                    </form>
                </StyledPaper>
            </StyledContainer>
        </motion.div>
    );
}