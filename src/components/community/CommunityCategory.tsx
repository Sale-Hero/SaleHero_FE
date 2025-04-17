import React from 'react';
import {
    Box,
    Button,
    Chip,
    Container,
    Paper,
    styled
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CommunityCategories, CommunityFormProps } from "../../types/community";
import { Sort, Edit } from '@mui/icons-material';

interface CategoryProps {
    categoryType: CommunityCategories;
    setCategoryType: (category: CommunityCategories) => void;
}

type CategoryOption = {
    label: string;
    value: CommunityCategories;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

const CategoryChip = styled(Chip)<{ active: boolean }>(({ theme, active }) => ({
    margin: theme.spacing(0.5),
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ...(active && {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
        fontWeight: 'bold'
    })
}));

export function CommunityCategory({ categoryType, setCategoryType }: CategoryProps): JSX.Element {
    const navigate = useNavigate();
    const [cookie] = useCookies(['accessToken', 'refreshToken']);

    const categories: CategoryOption[] = [
        { label: "전체", value: CommunityCategories.ALL },
        // { label: "기술, 취업, 이직", value: CommunityCategories.TECH },
        // { label: "사는이야기", value: CommunityCategories.DAILY },
        // { label: "모임, 스터디", value: CommunityCategories.STUDY },
        { label: "커뮤니티 공간", value: CommunityCategories.COMMUNITY_POSTS },
        { label: "인터뷰 공간", value: CommunityCategories.INTERVIEW_POSTS },
    ];

    const handlePosting = (): void => {
        if (!cookie.accessToken) {
            alert('로그인 후 시도해주세요');
            return;
        }
        const props: CommunityFormProps = { mode: 'create' };
        navigate('/community/post', { state: { ...props } });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <StyledPaper elevation={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                            startIcon={<Sort />}
                            variant="text"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                        >
                            최신순
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {categories.map((category, idx) => (
                            <CategoryChip
                                key={idx}
                                label={category.label}
                                active={categoryType === category.value}
                                onClick={() => setCategoryType(category.value)}
                                variant={categoryType === category.value ? "filled" : "outlined"}
                            />
                        ))}
                    </Box>

                    <Button
                        startIcon={<Edit />}
                        variant="contained"
                        onClick={handlePosting}
                        sx={{
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 15px rgba(33, 150, 243, 0.3)'
                            }
                        }}
                    >
                        글 작성하기
                    </Button>
                </StyledPaper>
            </motion.div>
        </Container>
    );
}