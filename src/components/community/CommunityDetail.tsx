import {motion} from 'framer-motion';
import DOMPurify from 'dompurify';

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {AccessTime, ArrowBack, Bookmark, Comment, Person, Share,} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {useCommentFunctions} from "../../components/community/hooks/useCommentFunctions";
import {CommentPostDTO} from "../../types/post";
import {useCommunityGetter} from "../../components/community/hooks/useCommunityGetter";
import {useCookies} from "react-cookie";
import {CommunityCategories} from "../../types/community";

export function CommunityDetail() {
    const [comment, setComment] = useState('');
    const pathParts = window.location.pathname.split('/');
    const id = Number(pathParts[pathParts.length - 1]);
    const [cookie] = useCookies(['accessToken', 'refreshToken']);

    const { getCommunityById, post } = useCommunityGetter();
    const { createComment } = useCommentFunctions();
    const [isNormalPost, setIsNormalPost] = useState(false)

    useEffect(() => {
        getCommunityById(id).then((result) => {
            if (result) {
                setIsNormalPost(result.category !== CommunityCategories.INTERVIEW_POSTS)
            }
        })
    }, [id]);

    const refreshComments = () => {
        getCommunityById(id).then();
    };

    // @ts-ignore
    const handleSubmitComment = () =>{
        if (!cookie.accessToken) {
            alert('로그인 후 시도해주세요');
            return false;
        }

        if (comment === "") {
            alert('댓글을 작성해주세요.')
            return false;
        }

        const dto:CommentPostDTO = {content: comment, post_id:id};
        if(window.confirm("댓글을 작성하시겠습니까?"))
            createComment(dto).then(() =>{
                refreshComments();
                setComment("")
            })
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {post && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 뒤로가기 버튼 */}
                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                        <motion.div whileHover={{ x: -5 }}>
                            <IconButton
                                onClick={() => window.history.back()}
                                sx={{
                                    color: 'primary.main',
                                    '&:hover': { bgcolor: 'primary.50' }
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                        </motion.div>
                        <Typography
                            variant="body2"
                            sx={{ ml: 1, color: 'text.secondary' }}
                        >
                            목록으로 돌아가기
                        </Typography>
                    </Box>

                    {/* 메인 콘텐츠 */}
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        {/* 헤더 배경 */}
                        <Box
                            sx={{
                                bgcolor: 'primary.50',
                                p: 4,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* 카테고리 & 북마크 */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Chip
                                        label={post.category}
                                        color="primary"
                                        sx={{
                                            borderRadius: 2,
                                            fontSize: '0.9rem',
                                            fontWeight: 500
                                        }}
                                    />
                                    <IconButton sx={{ color: 'primary.main' }}>
                                        <Bookmark />
                                    </IconButton>
                                </Box>

                                {/* 제목 */}
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        mb: 3
                                    }}
                                >
                                    {post.title}
                                </Typography>

                                {/* 작성자 정보 */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Person sx={{ fontSize: 20, mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {post.username}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AccessTime sx={{ fontSize: 20, mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {post.created_at}
                                        </Typography>
                                    </Box>
                                </Box>
                            </motion.div>
                        </Box>

                        {/* 본문 내용 */}
                        <Box sx={{ p: 4 }}>
                            {/*<Typography*/}
                            {/*    variant="body1"*/}
                            {/*    sx={{*/}
                            {/*        lineHeight: 1.8,*/}
                            {/*        color: 'text.primary',*/}
                            {/*        mb: 4,*/}
                            {/*        minHeight: '200px'*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    {post.content}*/}
                            {/*</Typography>*/}
                            <Typography
                                variant="body1"
                                sx={{
                                    lineHeight: 1.8,
                                    color: 'text.primary',
                                    mb: 4,
                                    minHeight: '200px',
                                    '& img': {
                                        maxWidth: '100%',
                                        height: 'auto'
                                    },
                                    '& table': {
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        marginBottom: '1rem'
                                    },
                                    '& th, & td': {
                                        border: '1px solid #ddd',
                                        padding: '8px'
                                    }
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(post.content)
                                }}
                            />

                            {/* 액션 버튼 */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    mb: 4,
                                    justifyContent: 'center'
                                }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Share />}
                                        sx={{
                                            borderRadius: 2,
                                            px: 4,
                                            py: 1
                                        }}
                                    >
                                        공유하기
                                    </Button>
                                </motion.div>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            {/* 댓글 섹션 */}
                            {isNormalPost && (
                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: 'primary.main',
                                        fontWeight: 600
                                    }}
                                >
                                    <Comment />
                                    {/*댓글 {post.comments.length}개*/}
                                </Typography>

                                {/* 댓글 입력 */}
                                <Card
                                    elevation={0}
                                    sx={{
                                        mb: 4,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 2
                                    }}
                                >
                                    <CardContent>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={3}
                                            placeholder="댓글을 입력하세요"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            sx={{
                                                mb: 2,
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2
                                                }
                                            }}
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <motion.div whileHover={{ scale: 1.05 }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleSubmitComment}
                                                    endIcon={<Comment />}
                                                    sx={{
                                                        borderRadius: 2,
                                                        px: 3
                                                    }}
                                                >
                                                    댓글 작성
                                                </Button>
                                            </motion.div>
                                        </Box>
                                    </CardContent>
                                </Card>

                                {/* 댓글 목록 */}
                                <Box>
                                    {post.comments.map((comment, index) => (
                                        <motion.div
                                            key={comment.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    mb: 2,
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    borderRadius: 2,
                                                    '&:hover': {
                                                        bgcolor: 'primary.50',
                                                        transition: 'background-color 0.3s'
                                                    }
                                                }}
                                            >
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <Avatar
                                                            sx={{
                                                                width: 32,
                                                                height: 32,
                                                                mr: 1,
                                                                bgcolor: 'primary.main'
                                                            }}
                                                        >
                                                            {comment.created_at}
                                                        </Avatar>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography variant="subtitle2" color="primary">
                                                                {comment.user_email}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {comment.created_at}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            pl: 5,
                                                            color: 'text.primary'
                                                        }}
                                                    >
                                                        {comment.content}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </Box>
                            </Box>
                        )}
                        </Box>
                    </Paper>
                </motion.div>
            )}
        </Container>
    );
}