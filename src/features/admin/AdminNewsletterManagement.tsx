import React, { useEffect, useState } from 'react';
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
    Stack,
    IconButton,
    Tabs,
    Tab,
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { motion } from 'framer-motion';
import { useCookieFunctions } from "../../components/common/hooks/useCookieFunctions";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';
import {convertTimeToFormat} from "../../util/etcUtil";

interface Newsletter {
    id: number;
    title: string;
    content: string;
    isSent: string;
    sentAt: string | null;
    createdAt: string | null;
}

interface NewsLetterDTO {
    title: string;
    content: string;
    sentAt: string | null;
}

export function AdminNewsletterManagement() {
    const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
    const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
    const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
    const { getCookie } = useCookieFunctions();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [selectedNewsletterIds, setSelectedNewsletterIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
    const [totalNewsletters, setTotalNewsletters] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
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

    // 안전한 날짜 포맷팅 함수
    const formatDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return '-';
        try {
            return new Date(dateStr).toLocaleString();
        } catch (e) {
            console.error('Date formatting error:', e);
            return '-';
        }
    };

    const formatShortDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return '미정';
        try {
            return new Date(dateStr).toLocaleDateString();
        } catch (e) {
            console.error('Date formatting error:', e);
            return '날짜 오류';
        }
    };

    const columns: GridColDef[] = [
        { field: 'title', headerName: '제목', width: 200 },
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
            field: 'sentAt',
            headerName: '발송일',
            width: 130,
            renderCell: (params) => {
                const sentAt = params.row.sentAt;
                return <span>{params.row.isSent === 'Y' ? formatShortDate(sentAt) : '미발송'}</span>;
            }
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

    const fetchNewsletters = async (page: number, limit: number, search?: string): Promise<void> => {
        setLoading(true);
        try {
            const accessToken = getCookie('accessToken');

            // URL 생성 및 파라미터 추가
            const url = new URL(`${process.env.REACT_APP_BASE_URL}/news`);
            url.searchParams.append('page', String(page));
            url.searchParams.append('size', String(limit));

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
                throw new Error('Failed to fetch newsletters');
            }

            const responseData = await response.json();
            setNewsletters(responseData.content || []);
            setTotalNewsletters(responseData.totalElement || 0);
            setTotalPages(responseData.totalPages || 0);
        } catch (error) {
            console.error('Error fetching newsletters:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        // 검색 시 첫 페이지로 초기화
        setPaginationModel(prev => ({ ...prev, page: 0 }));
        fetchNewsletters(0, paginationModel.pageSize, searchWord);
    };

    // 엔터키로 검색 지원
    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleDeleteNewsletters = async () => {
        try {
            const accessToken = getCookie('accessToken');

            // 모든 선택된 ID를 한 번에 전송
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/news`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idxList: selectedNewsletterIds
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete newsletters');
            }

            // 삭제가 완료된 후 목록 새로고침
            await fetchNewsletters(paginationModel.page, paginationModel.pageSize, searchWord);
            setSelectedNewsletterIds([]);
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting newsletters:', error);
        }
    };

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedNewsletterIds(selectionModel as number[]);
    };

    const handlePaginationModelChange = (newModel: typeof paginationModel): void => {
        setPaginationModel(newModel);
    };

    const handleViewNewsletter = (newsletter: Newsletter): void => {
        setSelectedNewsletter(newsletter);
        setOpenViewDialog(true);
    };

    const handleEditNewsletter = (newsletter: Newsletter): void => {
        setSelectedNewsletter(newsletter);
        setFormData({
            title: newsletter.title,
            content: newsletter.content,
            sentAt: newsletter.sentAt
        });
        setIsEditing(true);
        setOpenFormDialog(true);
    };

    const handleCloseViewDialog = (): void => {
        setOpenViewDialog(false);
        setSelectedNewsletter(null);
    };

    const handleCloseFormDialog = (): void => {
        setOpenFormDialog(false);
        setFormData({
            title: '',
            content: '',
            sentAt: null
        });
        setIsEditing(false);
    };

    const handleAddNewsletter = () => {
        setIsEditing(false);
        setFormData({
            title: '',
            content: '',
            sentAt: null
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

    const handleDateChange = (newDate: Date | null) => {
        setFormData({
            ...formData,
            sentAt: newDate ? newDate.toISOString() : null
        });
    };

    const handleSubmitForm = async () => {
        try {
            const accessToken = getCookie('accessToken');

            if (isEditing && selectedNewsletter) {
                // PUT 요청 - 업데이트
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/news/${selectedNewsletter.id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        content: formData.content,
                        sentAt: convertTimeToFormat(formData.sentAt)
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to update newsletter');
                }
            } else {
                // POST 요청 - 생성
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/news`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        content: formData.content,
                        sentAt: convertTimeToFormat(formData.sentAt)
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to create newsletter');
                }
            }

            handleCloseFormDialog();
            // 목록 새로고침
            await fetchNewsletters(paginationModel.page, paginationModel.pageSize, searchWord);
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} newsletter:`, error);
        }
    };

    useEffect(() => {
        fetchNewsletters(paginationModel.page, paginationModel.pageSize, searchWord);
    }, [paginationModel]);

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

                <Card>
                    <CardContent>
                        <Box sx={{ height: 600 }}>
                            <DataGrid
                                rows={newsletters}
                                columns={columns}
                                rowCount={totalNewsletters}
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
                                        발송일: {selectedNewsletter.isSent === 'Y' ? formatShortDate(selectedNewsletter.sentAt) : '미발송'}
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

                {/* 뉴스레터 추가/수정 폼 대화상자 */}
                <Dialog
                    open={openFormDialog}
                    onClose={handleCloseFormDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        {isEditing ? '뉴스레터 수정' : '새 뉴스레터 작성'}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ p: 2 }}>
                            <TextField
                                name="title"
                                label="제목"
                                value={formData.title}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
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

                            <TextField
                                name="content"
                                label="내용"
                                value={formData.content}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
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
                            disabled={!formData.title || !formData.content}
                        >
                            {isEditing ? '수정 완료' : '추가하기'}
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
                        <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
                        <Button onClick={handleDeleteNewsletters} color="error" variant="contained">
                            삭제
                        </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </Container>
    );
}