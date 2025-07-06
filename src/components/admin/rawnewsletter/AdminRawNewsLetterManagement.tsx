import React, {useCallback, useEffect, useState} from 'react';
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
    IconButton,
    InputAdornment,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import {Delete, Edit, Merge, Search} from '@mui/icons-material';
import {DataGrid, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import {motion} from 'framer-motion';
import {formatDate} from "../../../util/etcUtil";
import {useRawNewsLetterGetter} from "./hooks/useRawNewsLetterGetter";
import {RawNewsLetterDTO, RawNewsLetterPutDTO} from "../../../types/rawNewsLetter";
import {useRawNewsLetterActions} from "./hooks/useRawNewsLetterActions";
import {NewsLetterDeleteDTO} from "../../../types/adminNewsLetter";
import {useNewsLetterActions} from "../newsletter/hooks/useAdminNewsLetterActions";

export function AdminRawNewsLetterManagement() {
    const [selectedRawNewsletter, setSelectedRawNewsletter] = useState<RawNewsLetterDTO | null>(null);
    const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
    const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);

    // 병합 관련 상태
    const [confirmMergeDialog, setConfirmMergeDialog] = useState<boolean>(false);
    const [selectedRawNewsletterIds, setSelectedRawNewsletterIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);

    const [searchWord, setSearchWord] = useState<string>('');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 15,
    });

    // 수정용 폼 상태
    const [formData, setFormData] = useState<RawNewsLetterPutDTO>({
        id: 0,
        title: '',
        content: '',
    });

    // 병합용 상태
    const [mergeTitle, setMergeTitle] = useState<string>('병합된 뉴스레터');
    const [mergeSelectedNewsletters, setMergeSelectedNewsletters] = useState<RawNewsLetterDTO[]>([]);

    // API 호출 훅 사용
    const { getRawNewsLetters, rawNewsLetter, loading: fetchLoading } = useRawNewsLetterGetter();
    const { saveMergedNewsletter } = useNewsLetterActions();
    const { modifyRawNewsLetters, deleteRawNewsLetter } = useRawNewsLetterActions();

    // 로딩 상태
    const [loading, setLoading] = useState<boolean>(false);

    // 데이터 리프레시 함수 추가
    const onRefresh = useCallback(() => {
        return getRawNewsLetters({
            page: paginationModel.page + 1,
            size: paginationModel.pageSize,
            query: searchWord
        });
    }, [getRawNewsLetters, paginationModel.page, paginationModel.pageSize, searchWord]);

    // 페이지네이션 변경 시 로우 뉴스레터 데이터 가져오기
    useEffect(() => {
        onRefresh();
    }, [paginationModel, onRefresh]);

    // 검색 핸들러
    const handleSearch = () => {
        // 검색 시 첫 페이지로 초기화
        setPaginationModel(prev => ({ ...prev, page: 0 }));
        getRawNewsLetters({
            page: 1,
            size: paginationModel.pageSize,
            query: searchWord
        }).then();
    };

    // 엔터키로 검색 지원
    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 선택 변경 핸들러
    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedRawNewsletterIds(selectionModel as number[]);
    };

    // 페이지네이션 모델 변경 핸들러
    const handlePaginationModelChange = (newModel: typeof paginationModel): void => {
        setPaginationModel(newModel);
    };

    // 로우 뉴스레터 보기 핸들러
    const handleViewRawNewsletter = (rawNewsletter: RawNewsLetterDTO): void => {
        setSelectedRawNewsletter(rawNewsletter);
        setOpenViewDialog(true);
    };

    // 로우 뉴스레터 편집 핸들러
    const handleEditRawNewsletter = (rawNewsletter: RawNewsLetterDTO): void => {
        setSelectedRawNewsletter(rawNewsletter);
        setFormData({
            id: rawNewsletter.id,
            title: rawNewsletter.title,
            content: rawNewsletter.content,
        });
        setOpenFormDialog(true);
    };

    // 로우 뉴스레터 병합 핸들러
    const handleMergeRequest = (): void => {
        if (rawNewsLetter && selectedRawNewsletterIds.length > 1) {
            const selectedNewsletters = rawNewsLetter.content.filter(
                item => selectedRawNewsletterIds.includes(item.id)
            );
            setMergeSelectedNewsletters(selectedNewsletters);
            setMergeTitle(`병합된 뉴스레터 (${formatDate(new Date().toString())})`);
            setConfirmMergeDialog(true);
        }
    };

    // 실제 병합 처리 함수
    const executeMerge = async () => {
        if (mergeSelectedNewsletters.length < 2) return;

        setLoading(true);
        try {
            const mergedContent = mergeSelectedNewsletters.map(item => item.content).join('\n\n');
            await saveMergedNewsletter(mergeTitle, mergedContent);

            // 병합 완료 후 상태 초기화
            setConfirmMergeDialog(false);
            setSelectedRawNewsletterIds([]);
            setMergeSelectedNewsletters([]);
            setMergeTitle('병합된 뉴스레터');

            // 데이터 새로고침
            await onRefresh();
        } catch (error) {
            console.error('뉴스레터 병합 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    // 로우 뉴스레터 보기 대화 상자 닫기 핸들러
    const handleCloseViewDialog = (): void => {
        setOpenViewDialog(false);
        setSelectedRawNewsletter(null);
    };

    // 로우 뉴스레터 폼 대화 상자 닫기 핸들러
    const handleCloseFormDialog = (): void => {
        setOpenFormDialog(false);
        setFormData({
            id: 0,
            title: '',
            content: '',
        });
    };

    // 병합 취소 핸들러
    const handleCancelMerge = (): void => {
        setConfirmMergeDialog(false);
        setMergeSelectedNewsletters([]);
        setMergeTitle('병합된 뉴스레터');
    };

    // 병합 제목 변경 핸들러
    const handleMergeTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMergeTitle(e.target.value);
    };

    // 폼 입력 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 로우 뉴스레터 삭제 핸들러
    const handleDeleteRawNewsletters = async () => {
        setLoading(true);
        try {
            const deleteDto: NewsLetterDeleteDTO = {
                idxList: selectedRawNewsletterIds
            };
            await deleteRawNewsLetter(deleteDto);
            await onRefresh();
            setSelectedRawNewsletterIds([]);
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('원본 뉴스레터 삭제 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    // 로우 뉴스레터 수정 폼 제출 핸들러
    const handleSubmitForm = async () => {
        setLoading(true);
        try {
            await modifyRawNewsLetters(formData);
            handleCloseFormDialog();
            await onRefresh();
        } catch (error) {
            console.error('원본 뉴스레터 수정 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    // 병합된 HTML 미리보기 생성
    const getMergedHtmlPreview = () => {
        return mergeSelectedNewsletters.map(newsletter => newsletter.content).join('<hr /><br />');
    };

    // 데이터 그리드 컬럼 정의
    const columns: GridColDef[] = [
        { field: 'title', headerName: '제목', flex: 1.5 },
        {
            field: 'content',
            headerName: '내용',
            flex: 3,
            renderCell: (params) => (
                <Typography noWrap sx={{ width: '100%', fontStyle: 'italic', color: 'text.secondary' }}>
                    {params.value}
                </Typography>
            )
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
                        onClick={() => handleViewRawNewsletter(params.row)}
                        color="primary"
                    >
                        <Search fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleEditRawNewsletter(params.row)}
                        color="secondary"
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setSelectedRawNewsletterIds([params.row.id]);
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

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h4">원본 뉴스레터 관리</Typography>
                    <Box>
                        {selectedRawNewsletterIds.length > 1 && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleMergeRequest}
                                startIcon={<Merge />}
                                sx={{ mr: 2 }}
                            >
                                뉴스레터 병합 ({selectedRawNewsletterIds.length})
                            </Button>
                        )}
                        {selectedRawNewsletterIds.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setDeleteDialogOpen(true)}
                                sx={{ mr: 2 }}
                            >
                                선택한 뉴스레터 삭제 ({selectedRawNewsletterIds.length})
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* 검색 입력란 */}
                <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="제목, 내용 검색"
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

                {rawNewsLetter && (
                    <Card>
                        <CardContent>
                            <Box sx={{ height: 600 }}>
                                <DataGrid
                                    rows={rawNewsLetter.content.map(item => ({...item, id: item.id}))}
                                    columns={columns}
                                    rowCount={rawNewsLetter.totalElement}
                                    paginationModel={paginationModel}
                                    paginationMode="server"
                                    onPaginationModelChange={handlePaginationModelChange}
                                    pageSizeOptions={[10, 15, 25, 50]}
                                    loading={fetchLoading || loading}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                    onRowSelectionModelChange={handleSelectionChange}
                                    rowSelectionModel={selectedRawNewsletterIds}
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

                {/* 로우 뉴스레터 상세 보기 대화상자 */}
                <Dialog
                    open={openViewDialog}
                    onClose={handleCloseViewDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>원본 뉴스레터 상세 정보</DialogTitle>
                    <DialogContent dividers>
                        {selectedRawNewsletter && (
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h5" gutterBottom>
                                    {selectedRawNewsletter.title}
                                </Typography>

                                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} aria-label="content view tabs">
                                        <Tab label="텍스트 보기" id="tab-0" />
                                        <Tab label="HTML 미리보기" id="tab-1" />
                                    </Tabs>
                                </Box>

                                {/* 텍스트 보기 */}
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
                                        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                                            {selectedRawNewsletter.content}
                                        </Typography>
                                    </Box>
                                )}

                                {/* HTML 미리보기 */}
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
                                        <div dangerouslySetInnerHTML={{ __html: selectedRawNewsletter.content }} />
                                    </Box>
                                )}

                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        작성일: {selectedRawNewsletter.createdAt ? formatDate(selectedRawNewsletter.createdAt) : '-'}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleCloseViewDialog();
                            if (selectedRawNewsletter) {
                                handleEditRawNewsletter(selectedRawNewsletter);
                            }
                        }} color="primary">
                            편집
                        </Button>
                        <Button onClick={handleCloseViewDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>

                {/* 로우 뉴스레터 수정 폼 대화상자 */}
                <Dialog
                    open={openFormDialog}
                    onClose={handleCloseFormDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>원본 뉴스레터 편집</DialogTitle>
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
                            disabled={!formData.title || !formData.content || loading}
                        >
                            저장
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* 뉴스레터 병합 확인 대화상자 */}
                <Dialog
                    open={confirmMergeDialog}
                    onClose={handleCancelMerge}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>뉴스레터 병합</DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="body1" gutterBottom>
                                선택한 {mergeSelectedNewsletters.length}개의 뉴스레터를 병합하시겠습니까?
                            </Typography>

                            <TextField
                                fullWidth
                                label="병합된 뉴스레터 제목"
                                name="title"
                                value={mergeTitle}
                                onChange={handleMergeTitleChange}
                                margin="normal"
                                variant="outlined"
                                required
                            />

                            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                                선택된 뉴스레터
                            </Typography>

                            <Box sx={{
                                border: '1px solid rgba(0, 0, 0, 0.12)',
                                borderRadius: 1,
                                p: 2,
                                maxHeight: '200px',
                                overflow: 'auto',
                                mb: 2
                            }}>
                                {mergeSelectedNewsletters.map((newsletter, index) => (
                                    <Box key={newsletter.id} sx={{ mb: 1 }}>
                                        <Typography variant="body2">
                                            {index + 1}. {newsletter.title} ({formatDate(newsletter.createdAt)})
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    병합 미리보기
                                </Typography>
                                <Box sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    borderRadius: 1,
                                    p: 2,
                                    height: '300px',
                                    overflow: 'auto'
                                }}>
                                    <div dangerouslySetInnerHTML={{ __html: getMergedHtmlPreview() }} />
                                </Box>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelMerge}>취소</Button>
                        <Button
                            onClick={executeMerge}
                            color="primary"
                            variant="contained"
                            disabled={!mergeTitle || mergeSelectedNewsletters.length < 2 || loading}
                        >
                            병합하기
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* 삭제 확인 대화상자 */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>원본 뉴스레터 삭제</DialogTitle>
                    <DialogContent>
                        <Typography>
                            선택한 {selectedRawNewsletterIds.length}개의 원본 뉴스레터를 삭제하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>
                            취소
                        </Button>
                        <Button
                            onClick={handleDeleteRawNewsletters}
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
