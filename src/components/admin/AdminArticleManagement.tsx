import React, {useCallback, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import {Delete, Edit, Search} from '@mui/icons-material';
import {DataGrid, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import {motion} from 'framer-motion';
import {formatDate} from "../../util/etcUtil";
import {useAdminArticleGetter} from "./hooks/useAdminArticleGetter";
import {AdminArticlePostDTO, ArticleCategory, ArticleDeleteDTO, ArticleResponseDTO} from "../../types/adminArticle";
import {useArticleActions} from "./hooks/useAdminArticleActions";

export function AdminArticleManagement() {
    const [selectedArticle, setSelectedArticle] = useState<ArticleResponseDTO | null>(null);
    const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
    const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [selectedArticleIds, setSelectedArticleIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [categoryTab, setCategoryTab] = useState<'ALL' | ArticleCategory>('ALL');

    const [searchWord, setSearchWord] = useState<string>('');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 15,
    });

    // 새 아티클 또는 편집용 폼 상태
    const [formData, setFormData] = useState<AdminArticlePostDTO>({
        title: '',
        content: '',
        summary: '',
        category: ArticleCategory.PROMOTION,
        isVisible: 'N',
    });

    // API 호출 훅 사용
    const { getAdminArticles, article } = useAdminArticleGetter();
    const {
        deleteArticles,
        updateArticle,
        saveArticle,
        loading
    } = useArticleActions();

    // 데이터 리프레시 함수 추가
    const onRefresh = useCallback(() => {
        return getAdminArticles({
            page: paginationModel.page + 1,
            size: paginationModel.pageSize,
            // query: searchWord // 임시
        });
    }, [getAdminArticles, paginationModel.page, paginationModel.pageSize, searchWord]);

    useEffect(() => {
        onRefresh();
    }, [paginationModel, onRefresh]);

    // 검색 핸들러
    const handleSearch = () => {
        setPaginationModel(prev => ({ ...prev, page: 0 }));
        getAdminArticles({
            page: 1,
            size: paginationModel.pageSize,
            // query: searchWord // 임시
        }).then();
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedArticleIds(selectionModel as number[]);
    };

    const handlePaginationModelChange = (newModel: typeof paginationModel): void => {
        setPaginationModel(newModel);
    };

    const handleViewArticle = (article: ArticleResponseDTO): void => {
        setSelectedArticle(article);
        setOpenViewDialog(true);
    };

    const handleEditArticle = (article: ArticleResponseDTO): void => {
        setSelectedArticle(article);
        setFormData({
            title: article.title,
            content: article.content,
            summary: article.summary,
            category: article.category,
            isVisible: article.isVisible
        });
        setIsEditing(true);
        setOpenFormDialog(true);
    };

    const handleCloseViewDialog = (): void => {
        setOpenViewDialog(false);
        setSelectedArticle(null);
    };

    const handleCloseFormDialog = (): void => {
        setOpenFormDialog(false);
        setFormData({
            title: '',
            content: '',
            summary: '',
            category: ArticleCategory.PROMOTION,
            isVisible: 'Y',
        });
        setIsEditing(false);
    };

    const handleAddArticle = () => {
        setIsEditing(false);
        setFormData({
            title: '',
            content: '',
            summary: '',
            category: ArticleCategory.PROMOTION,
            isVisible: 'Y',
        });
        setOpenFormDialog(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCategoryChange = (e: SelectChangeEvent) => {
        setFormData({
            ...formData,
            category: e.target.value as ArticleCategory
        });
    };

    const handleVisibleChange = (e: SelectChangeEvent) => {
        setFormData({
            ...formData,
            isVisible: e.target.value as string
        });
    };

    const handleDeleteArticles = async () => {
        const dto: ArticleDeleteDTO = {
            idxList: selectedArticleIds
        }
        const success = await deleteArticles(dto);
        if (success) {
            await onRefresh();
            setSelectedArticleIds([]);
            setDeleteDialogOpen(false);
        }
    };

    const handleSubmitForm = async () => {
        try {
            // 1. 필수 데이터 검증
            if (!formData) {
                alert("필수 정보값 미입력");
                return;
            }

            // 2. 수정 모드 검증
            const isUpdateMode = isEditing && selectedArticle?.id;

            if (isEditing && !selectedArticle?.id) {
                alert("수정할 게시글 정보가 없습니다");
                return;
            }

            // 3. API 호출
            const success = await (isUpdateMode
                    ? updateArticle({formData, articleId: selectedArticle.id})
                    : saveArticle(formData)
            );

            // 4. 결과 처리
            if (success) {
                handleCloseFormDialog();
                await onRefresh();
            } else {
                alert("저장에 실패했습니다. 다시 시도해주세요.");
            }

        } catch (error) {
            console.error('저장 중 오류:', error);
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const columns: GridColDef[] = [
        { field: 'title', headerName: '제목', flex: 1 },
        { field: 'summary', headerName: '요약', flex: 1 },
        { field: 'category', headerName: '카테고리', width: 120 },
        {
            field: 'isVisible',
            headerName: '공개 여부',
            width: 100,
            renderCell: (params) => (
                <Chip
                    label={params.value === 'Y' ? '공개' : '비공개'}
                    color={params.value === 'Y' ? 'success' : 'default'}
                    size="small"
                />
            )
        },
        {
            field: 'viewCount',
            headerName: '조회수',
            width: 100
        },
        {
            field: 'createdAt',
            headerName: '작성일',
            width: 180,
            renderCell: (params) => <span>{formatDate(params.row.createdAt)}</span>
        },
        {
            field: 'actions',
            headerName: '관리',
            width: 180,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        size="small"
                        onClick={() => handleViewArticle(params.row)}
                        color="primary"
                    >
                        <Search fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleEditArticle(params.row)}
                        color="secondary"
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setSelectedArticleIds([params.row.id]);
                            setDeleteDialogOpen(true);
                        }}
                        color="error"
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    // 리스트 데이터 (카테고리 필터 프론트에서)
    const allArticles = article?.content || [];
    const filteredArticles = categoryTab === 'ALL' ? allArticles : allArticles.filter(a => a.category === categoryTab);

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* 카테고리 탭 */}
                <Box sx={{ mb: 2 }}>
                    <Tabs
                        value={categoryTab}
                        onChange={(_, v) => setCategoryTab(v)}
                        sx={{ minWidth: 300 }}
                    >
                        <Tab label="전체" value="ALL" />
                        <Tab label="프로모션" value={ArticleCategory.PROMOTION} />
                        <Tab label="치킨" value={ArticleCategory.CHICKEN} />
                        <Tab label="피자" value={ArticleCategory.PIZZA} />
                    </Tabs>
                </Box>

                {/* 검색 입력란 */}
                <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="제목, 내용, 요약 검색"
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

                {article && (
                    <Card>
                        <CardContent>
                            <Box sx={{ height: 600 }}>
                                <DataGrid
                                    rows={filteredArticles}
                                    columns={columns}
                                    rowCount={filteredArticles.length}
                                    paginationModel={paginationModel}
                                    paginationMode="client"
                                    pageSizeOptions={[10, 25, 50]}
                                    loading={loading}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                    onRowSelectionModelChange={handleSelectionChange}
                                    rowSelectionModel={selectedArticleIds}
                                    sx={{
                                        '& .MuiDataGrid-cell:focus': {
                                            outline: 'none',
                                        },
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                )}

                {/* 아티클 상세 보기 대화상자 */}
                <Dialog
                    open={openViewDialog}
                    onClose={handleCloseViewDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>아티클 상세 정보</DialogTitle>
                    <DialogContent dividers>
                        {selectedArticle && (
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Chip
                                        label={selectedArticle.isVisible === 'Y' ? '공개' : '비공개'}
                                        color={selectedArticle.isVisible === 'Y' ? 'success' : 'default'}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        카테고리: {selectedArticle.category}
                                    </Typography>
                                </Box>

                                <Typography variant="h5" gutterBottom>
                                    {selectedArticle.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {selectedArticle.summary}
                                </Typography>

                                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} aria-label="content view tabs">
                                        <Tab label="HTML 미리보기" id="tab-0" />
                                        <Tab label="텍스트 보기" id="tab-1" />
                                    </Tabs>
                                </Box>

                                {/* HTML 미리보기 */}
                                {activeTab === 0 && (
                                    <Box sx={{
                                        my: 2,
                                        p: 2,
                                        border: '1px solid rgba(0, 0, 0, 0.12)',
                                        borderRadius: 1,
                                        minHeight: '200px',
                                        maxHeight: '400px',
                                        overflow: 'auto'
                                    }}>
                                        <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
                                    </Box>
                                )}

                                {/* 텍스트 보기 */}
                                {activeTab === 1 && (
                                    <Box sx={{
                                        my: 2,
                                        p: 2,
                                        border: '1px solid rgba(0, 0, 0, 0.12)',
                                        borderRadius: 1,
                                        minHeight: '200px',
                                        maxHeight: '400px',
                                        overflow: 'auto'
                                    }}>
                                        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                                            {selectedArticle.content}
                                        </Typography>
                                    </Box>
                                )}

                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        작성일: {selectedArticle.createdAt ? formatDate(selectedArticle.createdAt) : '-'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        조회수: {selectedArticle.viewCount}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleCloseViewDialog();
                            if (selectedArticle) {
                                handleEditArticle(selectedArticle);
                            }
                        }} color="primary">
                            편집
                        </Button>
                        <Button onClick={handleCloseViewDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>

                {/* 아티클 폼 대화상자 */}
                <Dialog
                    open={openFormDialog}
                    onClose={handleCloseFormDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>{isEditing ? '아티클 편집' : '아티클 추가'}</DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ p: 2 }}>
                            <TextField
                                fullWidth
                                label="제목"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                margin="normal"
                                variant="outlined"
                                required
                            />
                            <TextField
                                fullWidth
                                label="요약"
                                name="summary"
                                value={formData.summary}
                                onChange={handleInputChange}
                                margin="normal"
                                variant="outlined"
                                required
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="category-label">카테고리</InputLabel>
                                <Select
                                    labelId="category-label"
                                    value={formData.category}
                                    label="카테고리"
                                    onChange={handleCategoryChange}
                                >
                                    {(Object.values(ArticleCategory) as string[]).map((cat) => (
                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="visible-label">공개 여부</InputLabel>
                                <Select
                                    labelId="visible-label"
                                    value={formData.isVisible}
                                    label="공개 여부"
                                    onChange={handleVisibleChange}
                                >
                                    <MenuItem value="Y">공개</MenuItem>
                                    <MenuItem value="N">비공개</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="내용"
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                margin="normal"
                                variant="outlined"
                                multiline
                                rows={10}
                                required
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseFormDialog}>취소</Button>
                        <Button
                            onClick={handleSubmitForm}
                            color="primary"
                            variant="contained"
                            disabled={!formData.title || !formData.content || !formData.summary || loading}
                        >
                            {isEditing ? '저장' : '추가'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* 삭제 확인 대화상자 */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>아티클 삭제</DialogTitle>
                    <DialogContent>
                        <Typography>
                            선택한 {selectedArticleIds.length}개의 아티클을 삭제하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>
                            취소
                        </Button>
                        <Button
                            onClick={handleDeleteArticles}
                            color="error"
                            disabled={loading}
                        >
                            삭제
                        </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </Container>
    );
}
