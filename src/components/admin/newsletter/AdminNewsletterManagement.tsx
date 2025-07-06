import React, {useEffect, useState, useCallback} from 'react';
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
    IconButton,
    InputAdornment,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import {Add, Delete, Edit, Search} from '@mui/icons-material';
import {DataGrid, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import {motion} from 'framer-motion';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {ko} from 'date-fns/locale';
import {formatDate, formatShortDate} from "../../../util/etcUtil";
import {useAdminNewsLetterGetter} from "./hooks/useAdminNewsLetterGetter";
import {NewsLetterDeleteDTO, NewsLetterDTO, NewsLetterResponseDTO} from "../../../types/adminNewsLetter";
import {useNewsLetterActions} from "./hooks/useAdminNewsLetterActions";

export function AdminNewsletterManagement() {
    const [selectedNewsletter, setSelectedNewsletter] = useState<NewsLetterResponseDTO | null>(null);
    const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
    const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [selectedNewsletterIds, setSelectedNewsletterIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);

    const [searchWord, setSearchWord] = useState<string>('');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 15,
    });

    // 새 뉴스레터 또는 편집용 폼 상태
    const [formData, setFormData] = useState<NewsLetterDTO>({
        title: '',
        content: '',
        sentAt: null,
    });

    // API 호출 훅 사용
    const { getAdminNewsLetters, newsLetter } = useAdminNewsLetterGetter();
    const {
        deleteNewsletters,
        saveNewsletter,
        loading
    } = useNewsLetterActions();

    // 데이터 리프레시 함수 추가
    const onRefresh = useCallback(() => {
        return getAdminNewsLetters({
            page: paginationModel.page + 1,
            size: paginationModel.pageSize,
            query: searchWord
        });
    }, [getAdminNewsLetters, paginationModel.page, paginationModel.pageSize, searchWord]);

    // 페이지네이션 변경 시 뉴스레터 데이터 가져오기
    useEffect(() => {
        onRefresh();
    }, [paginationModel, onRefresh]);

    // 검색 핸들러
    const handleSearch = () => {
        // 검색 시 첫 페이지로 초기화
        setPaginationModel(prev => ({ ...prev, page: 0 }));
        getAdminNewsLetters({
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
        setSelectedNewsletterIds(selectionModel as number[]);
    };

    // 페이지네이션 모델 변경 핸들러
    const handlePaginationModelChange = (newModel: typeof paginationModel): void => {
        setPaginationModel(newModel);
    };

    // 뉴스레터 보기 핸들러
    const handleViewNewsletter = (newsletter: NewsLetterResponseDTO): void => {
        setSelectedNewsletter(newsletter);
        setOpenViewDialog(true);
    };

    // 뉴스레터 편집 핸들러
    const handleEditNewsletter = (newsletter: NewsLetterResponseDTO): void => {
        setSelectedNewsletter(newsletter);
        setFormData({
            title: newsletter.title,
            content: newsletter.content,
            sentAt: newsletter.sentAt
        });
        setIsEditing(true);
        setOpenFormDialog(true);
    };

    // 뉴스레터 보기 대화 상자 닫기 핸들러
    const handleCloseViewDialog = (): void => {
        setOpenViewDialog(false);
        setSelectedNewsletter(null);
    };

    // 뉴스레터 폼 대화 상자 닫기 핸들러
    const handleCloseFormDialog = (): void => {
        setOpenFormDialog(false);
        setFormData({
            title: '',
            content: '',
            sentAt: null
        });
        setIsEditing(false);
    };

    // 뉴스레터 추가 핸들러
    const handleAddNewsletter = () => {
        setIsEditing(false);
        setFormData({
            title: '',
            content: '',
            sentAt: null
        });
        setOpenFormDialog(true);
    };

    // 폼 입력 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 날짜 변경 핸들러
    const handleDateChange = (newDate: Date | null) => {
        setFormData({
            ...formData,
            sentAt: newDate ? newDate.toISOString() : null
        });
    };

    // 뉴스레터 삭제 핸들러
    const handleDeleteNewsletters = async () => {
        const dto: NewsLetterDeleteDTO = {
            idxList: selectedNewsletterIds
        }

        const success = await deleteNewsletters(dto);
        if (success) {
            await onRefresh();
            setSelectedNewsletterIds([]);
            setDeleteDialogOpen(false);
        }
    };

    // 뉴스레터 폼 제출 핸들러
    const handleSubmitForm = async () => {
        const success = await saveNewsletter(formData, isEditing ? selectedNewsletter?.id : undefined);
        if (success) {
            handleCloseFormDialog();
            await onRefresh();
        }
    };

    // 데이터 그리드 컬럼 정의
    const columns: GridColDef[] = [
        { field: 'title', headerName: '제목', flex: 1 },
        {
            field: 'isSent',
            headerName: '발송 상태',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value === 'Y' ? '발송됨' : '대기중'}
                    color={params.value === 'Y' ? 'success' : 'warning'}
                    size="small"
                />
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
                        onClick={() => handleViewNewsletter(params.row)}
                        color="primary"
                    >
                        <Search fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleEditNewsletter(params.row)}
                        color="secondary"
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setSelectedNewsletterIds([params.row.id]);
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
                    <Typography variant="h4">뉴스레터 관리</Typography>
                    <Box>
                        {selectedNewsletterIds.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setDeleteDialogOpen(true)}
                                sx={{ mr: 2 }}
                            >
                                선택한 뉴스레터 삭제 ({selectedNewsletterIds.length})
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleAddNewsletter}
                        >
                            뉴스레터 추가
                        </Button>
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

                {newsLetter && (
                    <Card>
                        <CardContent>
                            <Box sx={{ height: 600 }}>
                                <DataGrid
                                    rows={newsLetter.content}
                                    columns={columns}
                                    rowCount={newsLetter.totalElement}
                                    paginationModel={paginationModel}
                                    paginationMode="server"
                                    onPaginationModelChange={handlePaginationModelChange}
                                    pageSizeOptions={[10, 25, 50]}
                                    loading={loading}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                    onRowSelectionModelChange={handleSelectionChange}
                                    rowSelectionModel={selectedNewsletterIds}
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

                {/* 뉴스레터 상세 보기 대화상자 */}
                <Dialog
                    open={openViewDialog}
                    onClose={handleCloseViewDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>뉴스레터 상세 정보</DialogTitle>
                    <DialogContent dividers>
                        {selectedNewsletter && (
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Chip
                                        label={selectedNewsletter.isSent === 'Y' ? '발송됨' : '대기중'}
                                        color={selectedNewsletter.isSent === 'Y' ? 'success' : 'warning'}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        발송일: {selectedNewsletter.sentAt === null ? '발송 대기' : formatShortDate(selectedNewsletter.sentAt)}
                                    </Typography>
                                </Box>

                                <Typography variant="h5" gutterBottom>
                                    {selectedNewsletter.title}
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
                                            {selectedNewsletter.content}
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
                                        <div dangerouslySetInnerHTML={{ __html: selectedNewsletter.content }} />
                                    </Box>
                                )}

                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        작성일: {selectedNewsletter.createdAt ? formatDate(selectedNewsletter.createdAt) : '-'}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleCloseViewDialog();
                            if (selectedNewsletter) {
                                handleEditNewsletter(selectedNewsletter);
                            }
                        }} color="primary">
                            편집
                        </Button>
                        <Button onClick={handleCloseViewDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>

                {/* 뉴스레터 폼 대화상자 */}
                <Dialog
                    open={openFormDialog}
                    onClose={handleCloseFormDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>{isEditing ? '뉴스레터 편집' : '뉴스레터 추가'}</DialogTitle>
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
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                                <DatePicker
                                    label="발송 예정일"
                                    value={formData.sentAt ? new Date(formData.sentAt) : null}
                                    onChange={handleDateChange}
                                    sx={{ mt: 2, width: '100%' }}
                                />
                            </LocalizationProvider>
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
                            {isEditing ? '저장' : '추가'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* 삭제 확인 대화상자 */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>뉴스레터 삭제</DialogTitle>
                    <DialogContent>
                        <Typography>
                            선택한 {selectedNewsletterIds.length}개의 뉴스레터를 삭제하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>
                            취소
                        </Button>
                        <Button
                            onClick={handleDeleteNewsletters}
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