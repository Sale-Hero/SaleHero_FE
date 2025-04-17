import React, {useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    IconButton,
    Paper,
    Typography
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {motion} from 'framer-motion';
import {AccessTime, Delete, Edit} from '@mui/icons-material';
import {PostsDTO} from "../../types/post";
import {useNavigate} from "react-router-dom";
import {useCommunityGetter} from "./hooks/useCommunityGetter";

interface Props {
    posts: PostsDTO[]
}

// Styled Components
const StyledPostCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4]
    }
}));

const CountryAvatar = styled(Avatar)<{ nation: string }>(({ nation }) => ({
    width: 30,
    height: 30,
    backgroundImage: `url(/images/${nation}.png)`,
    backgroundSize: 'cover'
}));

export function CommunityContents({ posts }: Props) {
    const [selectedPost, setSelectedPost] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const { deletePost, getCommunityById } = useCommunityGetter();

    const handleEdit = async (idx: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const result = await getCommunityById(idx);
        navigate('post', {
            state: {
                mode: 'edit',
                postId: idx,
                initialData: result
            }
        });
    };

    const handleDelete = async (idx: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedPost(idx);
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        if (selectedPost) {
            await deletePost(selectedPost);
            setOpenDialog(false);
            window.location.reload();
        }
    };

    const handleDetail = (data: PostsDTO) => {
        navigate(`detail/${data.id}`, { state: { ...data } });
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={3}>
                {posts.map((post, index) => (
                    <Grid item xs={12} key={post.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <StyledPostCard onClick={() => handleDetail(post)}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <CountryAvatar nation={post.nation} />
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {post.username}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                            <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                                            <Typography variant="body2">
                                                {post.created_at}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {post.is_owner && (
                                        <Box>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleEdit(post.id, e)}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={(e) => handleDelete(post.id, e)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>

                                <Typography variant="h6" gutterBottom>
                                    {post.title}
                                </Typography>

                                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Chip
                                        label={post.category}
                                        color="primary"
                                        size="small"
                                        sx={{ borderRadius: 1 }}
                                    />
                                </Box>
                            </StyledPostCard>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogContent>
                    <Typography>
                        작성하신 게시글을 삭제하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>취소</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}