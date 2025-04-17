import React, {useCallback, useState} from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    styled,
    TextField,
    Typography
} from '@mui/material';
import {motion} from 'framer-motion';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {CommunityCategories} from "../../types/community";
import {useCommunityValidator} from "./hooks/useCommunityValidator";
import {createPostAsync, updatePostAsync} from "../../slice/postSlice";

interface ModeText {
    title: string;
    button: string;
    confirmMessage: string;
    successMessage: string;
}

interface LocationState {
    mode: 'create' | 'edit';
    initialData?: {
        title: string;
        content: string;
        category: CommunityCategories;
    };
    postId?: number;
}

type DialogType = 'cancel' | 'submit';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)'
    }
}));

export function CommunityForm(): JSX.Element {
    const location = useLocation();
    const { mode, initialData, postId } = (location.state as LocationState) || {};
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>(initialData?.title || '');
    const [content, setContent] = useState<string>(initialData?.content || '');
    const [category, setCategory] = useState<CommunityCategories | "">(initialData?.category || "");
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [dialogType, setDialogType] = useState<DialogType>('cancel');

    const modeText: Record<'create' | 'edit', ModeText> = {
        create: {
            title: '커뮤니티 작성하기',
            button: '등록하기',
            confirmMessage: '게시글을 등록하시겠습니까?',
            successMessage: '등록이 완료됐습니다.'
        },
        edit: {
            title: '게시글 수정하기',
            button: '수정하기',
            confirmMessage: '게시글을 수정하시겠습니까?',
            successMessage: '수정이 완료됐습니다.'
        }
    };

    const { validate } = useCommunityValidator({title, content, category});

    const handleCancel = (): void => {
        setDialogType('cancel');
        setOpenDialog(true);
    };

    const handleConfirmCancel = (): void => {
        navigate('/community');
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>): void => {
        setCategory(event.target.value as CommunityCategories);
    };

    const handlePosting = useCallback(async () => {
        const isValidate = validate();
        if (!isValidate || category === "") return;

        // @ts-ignore
        if (window.confirm(modeText[mode].confirmMessage)) {
            const dto = {
                title,
                content,
                category
            };

            try {
                if (mode === 'create') {
                    await dispatch(createPostAsync(dto));
                } else {
                    postId &&
                    await dispatch(updatePostAsync({ dto, idx : postId }));
                }
                // @ts-ignore
                alert(modeText[mode].successMessage);
                navigate('/community');
            } catch (e) {
                console.log('error message : ', e)
            }
        }
    }, [title, content, category, mode, postId]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <StyledPaper elevation={3}>
                    <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
                        {modeText[mode || 'create'].title}
                    </Typography>

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel>카테고리</InputLabel>
                            <Select
                                value={category}
                                label="카테고리"
                                onChange={handleCategoryChange}
                            >
                                <MenuItem value="">카테고리를 선택해주세요</MenuItem>
                                <MenuItem value="COMMUNITY_POSTS">커뮤니티 공간 </MenuItem>
                                <MenuItem value="INTERVIEW_POSTS">인터뷰 공간</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="제목"
                            placeholder="제목을 입력해주세요"
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            label="본문"
                            placeholder="내용을 입력해주세요"
                            value={content}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                        />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="outlined"
                                color="error"
                                size="large"
                                onClick={handleCancel}
                            >
                                취소하기
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handlePosting}
                                sx={{
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    color: 'white'
                                }}
                            >
                                {modeText[mode || 'create'].button}
                            </Button>
                        </Box>
                    </Box>
                </StyledPaper>
            </motion.div>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>확인</DialogTitle>
                <DialogContent>
                    <Typography>
                        {dialogType === 'cancel'
                            ? '취소하시면 작성중인 내용이 모두 사라집니다.\n정말 취소하시겠습니까?'
                            : modeText[mode || 'create'].confirmMessage}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>취소</Button>
                    <Button
                        onClick={dialogType === 'cancel' ? handleConfirmCancel : handlePosting}
                        color={dialogType === 'cancel' ? 'error' : 'primary'}
                        variant="contained"
                    >
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}