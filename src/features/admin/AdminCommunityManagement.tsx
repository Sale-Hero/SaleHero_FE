import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Chip,
    InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { GridValueGetter } from '@mui/x-data-grid';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { motion } from 'framer-motion';
import { useCookieFunctions } from "../../components/common/hooks/useCookieFunctions";

interface CommunityPost {
    id: number;
    title: string;
    content: string;
    username: string;
    user_email: string;
    view_count: number;
    nation: string;
    created_at: string;
    updated_at: string;
    is_owner: boolean;
    category: string;
}

export function AdminCommunityManagement() {
    const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { getCookie } = useCookieFunctions();

    const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<CommunityPost[]>([]);
    const [totalPosts, setTotalPosts] = useState<number>(0);
    const [searchWord, setSearchWord] = useState<string>('');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const columns: GridColDef[] = [
        { field: 'title', headerName: '제목', width: 130 },
        { field: 'username', headerName: '작성자', width: 130 },
        { field: 'user_email', headerName: '이메일', width: 200 },
        {
            field: 'category',
            headerName: '카테고리',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={
                        params.value === 'TECH' ? 'primary' :
                            params.value === 'STUDY' ? 'secondary' :
                                'default'
                    }
                    size="small"
                />
            )
        },
        { field: 'view_count', headerName: '조회수', width: 100 },
        { field: 'nation', headerName: '국가', width: 100 },
        {
            field: 'created_at',
            headerName: '작성일',
            width: 180,
            valueFormatter: (params: GridValueGetter<CommunityPost>) => {
                return new Date(params.toString()).toLocaleString();
            }
        },
        {
            field: 'actions',
            headerName: '관리',
            width: 120,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewPost(params.row)}
                >
                    상세보기
                </Button>
            ),
        },
    ];

    const fetchPosts = async (page: number, limit: number, search?: string): Promise<void> => {
        setLoading(true);
        try {
            const accessToken = getCookie('accessToken');

            // URL 생성 및 파라미터 추가
            const url = new URL(`${process.env.REACT_APP_BASE_URL}/admin/posts`);
            url.searchParams.append('page', String(page + 1));
            url.searchParams.append('limit', String(limit));

            // 검색어가 있는 경우에만 추가
            if (search && search.trim() !== '') {
                url.searchParams.append('searchWord', search.trim());
            }

            const response = await fetch(url.toString(), {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '/admin/login';
                    return;
                }
                throw new Error('Failed to fetch posts');
            }

            const responseData = await response.json();
            setPosts(responseData.data);
            setTotalPosts(responseData.meta.total);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        // 검색 시 첫 페이지로 초기화
        setPaginationModel(prev => ({ ...prev, page: 0 }));
        fetchPosts(0, paginationModel.pageSize, searchWord);
    };

    // 엔터키로 검색 지원
    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleDeletePosts = async () => {
        try {
            const accessToken = getCookie('accessToken');

            // 선택된 각 게시글에 대해 순차적으로 삭제 요청
            for (const postId of selectedPostIds) {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/admin/posts/${postId}/delete`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`Failed to delete post ${postId}`);
                }
            }

            // 모든 삭제가 완료된 후 목록 새로고침
            await fetchPosts(paginationModel.page, paginationModel.pageSize, searchWord);
            setSelectedPostIds([]);
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting posts:', error);
        }
    };

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedPostIds(selectionModel as number[]);
    };

    const handlePaginationModelChange = (newModel: typeof paginationModel): void => {
        setPaginationModel(newModel);
    };

    const handleViewPost = (post: CommunityPost): void => {
        setSelectedPost(post);
        setOpenDialog(true);
    };

    const handleCloseDialog = (): void => {
        setOpenDialog(false);
        setSelectedPost(null);
    };

    useEffect(() => {
        fetchPosts(paginationModel.page, paginationModel.pageSize, searchWord);
    }, [paginationModel]);

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h4">게시글 관리</Typography>
                    {selectedPostIds.length > 0 && (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            선택한 게시글 삭제 ({selectedPostIds.length})
                        </Button>
                    )}
                </Box>

                {/* 검색 입력란 추가 */}
                <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="제목, 작성자, 이메일 등으로 검색"
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSearch}
                                        startIcon={<Search />}
                                    >
                                        검색
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                        sx={{ mr: 1 }}
                    />
                </Box>

                <Card>
                    <CardContent>
                        <Box sx={{ height: 600 }}>
                            <DataGrid<CommunityPost>
                                rows={posts}
                                columns={columns}
                                rowCount={totalPosts}
                                paginationModel={paginationModel}
                                paginationMode="server"
                                onPaginationModelChange={handlePaginationModelChange}
                                pageSizeOptions={[10, 25, 50]}
                                loading={loading}
                                checkboxSelection
                                disableRowSelectionOnClick
                                onRowSelectionModelChange={handleSelectionChange}
                                rowSelectionModel={selectedPostIds}
                                sx={{
                                    '& .MuiDataGrid-cell:focus': {
                                        outline: 'none',
                                    },
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>

                {/* 기존의 대화상자들 유지 */}
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>게시글 상세 정보</DialogTitle>
                    <DialogContent dividers>
                        {selectedPost && (
                            <Box sx={{ p: 2 }}>
                                <TextField
                                    label="제목"
                                    value={selectedPost.title}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{ readOnly: true }}
                                />
                                <TextField
                                    label="내용"
                                    value={selectedPost.content}
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    InputProps={{ readOnly: true }}
                                />
                                <TextField
                                    label="작성자"
                                    value={selectedPost.username}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{ readOnly: true }}
                                />
                                <TextField
                                    label="이메일"
                                    value={selectedPost.user_email}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{ readOnly: true }}
                                />
                                <TextField
                                    label="카테고리"
                                    value={selectedPost.category}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{ readOnly: true }}
                                />
                                <TextField
                                    label="조회수"
                                    value={selectedPost.view_count}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{ readOnly: true }}
                                />
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>게시글 삭제</DialogTitle>
                    <DialogContent>
                        <Typography>
                            선택한 {selectedPostIds.length}개의 게시글을 삭제하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
                        <Button onClick={handleDeletePosts} color="error" variant="contained">
                            삭제
                        </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </Container>
    );
}