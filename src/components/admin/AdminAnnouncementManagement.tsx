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
import {Delete, Edit, Search, Add} from '@mui/icons-material';
import {DataGrid, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import {motion} from 'framer-motion';
import {formatDate} from "../../util/etcUtil";
import {
    AdminAnnouncementPostDTO,
    AnnouncementCategory,
    AnnouncementDeleteDTO, AnnouncementDTO,
} from "../../types/adminAnnouncement";
import {useAdminAnnouncementGetter} from "./hooks/useAdminAnnouncementGetter";
import {useAnnouncementActions} from "./hooks/useAdminAnnouncementActions";

export function AdminAnnouncementManagement() {
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementDTO | null>(null);
    const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
    const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [selectedAnnouncementIds, setSelectedAnnouncementIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [categoryTab, setCategoryTab] = useState<'ALL' | AnnouncementCategory>('ALL');

    const [searchWord, setSearchWord] = useState<string>('');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 15,
    });

    const [formData, setFormData] = useState<AdminAnnouncementPostDTO>({
        title: '',
        content: '',
        category: AnnouncementCategory.ARTICLE,
        isVisible: 'Y',
    });

    const { getAdminAnnouncements, announcements, loading: fetchLoading } = useAdminAnnouncementGetter();
    const { saveAnnouncement, updateAnnouncement, deleteAnnouncements, loading: actionLoading } = useAnnouncementActions();

    const onRefresh = useCallback(() => {
        getAdminAnnouncements({
            page: paginationModel.page + 1,
            size: paginationModel.pageSize,
            query: searchWord
        });
    }, [getAdminAnnouncements, paginationModel, searchWord]);

    useEffect(() => {
        onRefresh();
    }, [paginationModel, onRefresh]);

    const handleSearch = () => {
        setPaginationModel(prev => ({ ...prev, page: 0 }));
        onRefresh();
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedAnnouncementIds(selectionModel as number[]);
    };

    const handlePaginationModelChange = (newModel: typeof paginationModel): void => {
        setPaginationModel(newModel);
    };

    const handleView = (announcement: AnnouncementDTO): void => {
        setSelectedAnnouncement(announcement);
        setOpenViewDialog(true);
    };

    const handleEdit = (announcement: AnnouncementDTO): void => {
        setSelectedAnnouncement(announcement);
        setFormData({
            title: announcement.title,
            content: announcement.content,
            category: announcement.category,
            isVisible: announcement.isVisible
        });
        setIsEditing(true);
        setOpenFormDialog(true);
    };

    const handleAdd = () => {
        setIsEditing(false);
        setFormData({
            title: '',
            content: '',
            category: AnnouncementCategory.ARTICLE,
            isVisible: 'Y',
        });
        setOpenFormDialog(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e: SelectChangeEvent) => {
        setFormData({ ...formData, category: e.target.value as AnnouncementCategory });
    };

    const handleVisibleChange = (e: SelectChangeEvent) => {
        setFormData({ ...formData, isVisible: e.target.value as string });
    };

    const handleDelete = async () => {
        const dto: AnnouncementDeleteDTO = { idxList: selectedAnnouncementIds };
        await deleteAnnouncements(dto);
        onRefresh();
        setSelectedAnnouncementIds([]);
        setDeleteDialogOpen(false);
    };

    const handleSubmitForm = async () => {
        if (isEditing && selectedAnnouncement) {
            await updateAnnouncement({ formData, announcementId: selectedAnnouncement.id });
        } else {
            await saveAnnouncement(formData);
        }
        onRefresh();
        setOpenFormDialog(false);
    };

    const columns: GridColDef[] = [
        { field: 'title', headerName: '제목', flex: 1 },
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
        { field: 'viewCount', headerName: '조회수', width: 100 },
        { field: 'createdAt', headerName: '작성일', width: 180, renderCell: (params) => <span>{formatDate(params.row.createdAt)}</span> },
        {
            field: 'actions',
            headerName: '관리',
            width: 180,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={() => handleView(params.row)} color="primary"><Search fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleEdit(params.row)} color="secondary"><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => { setSelectedAnnouncementIds([params.row.id]); setDeleteDialogOpen(true); }} color="error"><Delete fontSize="small" /></IconButton>
                </Stack>
            ),
        },
    ];

    const filteredAnnouncements = announcements?.content.filter(a => categoryTab === 'ALL' || a.category === categoryTab) || [];

    return (
        <Container maxWidth="lg">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h4">공지사항 관리</Typography>
                    <Box>
                        {selectedAnnouncementIds.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setDeleteDialogOpen(true)}
                                sx={{ mr: 2 }}
                            >
                                선택한 공지사항 삭제 ({selectedAnnouncementIds.length})
                            </Button>
                        )}
                        {/*<Button*/}
                        {/*    variant="contained"*/}
                        {/*    color="primary"*/}
                        {/*    startIcon={<Add />}*/}
                        {/*    onClick={handleAddNewsletter}*/}
                        {/*>*/}
                        {/*    뉴스레터 추가*/}
                        {/*</Button>*/}
                    </Box>
                </Box>

                <Tabs value={categoryTab} onChange={(_, v) => setCategoryTab(v)} sx={{ mb: 2 }}>
                    <Tab label="전체" value="ALL" />
                    <Tab label="할인정보" value={AnnouncementCategory.ARTICLE} />
                    <Tab label="이벤트" value={AnnouncementCategory.COMMUNITY} />
                </Tabs>

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
                                    <Button variant="contained" color="primary" onClick={handleSearch} startIcon={<Search />}>검색</Button>
                                </InputAdornment>
                            )
                        }}
                        sx={{ mr: 1 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleAdd}
                    >
                        공지사항 추가
                    </Button>
                </Box>

                <Card>
                    <CardContent>
                        <Box sx={{ height: 600 }}>
                            <DataGrid
                                rows={filteredAnnouncements}
                                columns={columns}
                                rowCount={announcements?.totalElement || 0}
                                paginationModel={paginationModel}
                                onPaginationModelChange={handlePaginationModelChange}
                                pageSizeOptions={[15, 30, 50]}
                                loading={fetchLoading || actionLoading}
                                checkboxSelection
                                onRowSelectionModelChange={handleSelectionChange}
                                rowSelectionModel={selectedAnnouncementIds}
                            />
                        </Box>
                    </CardContent>
                </Card>

                <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
                    <DialogTitle>공지사항 상세 정보</DialogTitle>
                    <DialogContent dividers>
                        {selectedAnnouncement && (
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h5" gutterBottom>{selectedAnnouncement.title}</Typography>
                                <div dangerouslySetInnerHTML={{ __html: selectedAnnouncement.content }} />
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenViewDialog(false)}>닫기</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openFormDialog} onClose={() => setOpenFormDialog(false)} maxWidth="md" fullWidth>
                    <DialogTitle>{isEditing ? '공지사항 편집' : '공지사항 추가'}</DialogTitle>
                    <DialogContent dividers>
                        <Box component="form" sx={{ p: 2 }}>
                            <TextField fullWidth label="제목" name="title" value={formData.title} onChange={handleInputChange} margin="normal" required />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>카테고리</InputLabel>
                                <Select name="category" value={formData.category} onChange={handleCategoryChange} label="카테고리">
                                    {Object.values(AnnouncementCategory).map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>공개 여부</InputLabel>
                                <Select name="isVisible" value={formData.isVisible} onChange={handleVisibleChange} label="공개 여부">
                                    <MenuItem value="Y">공개</MenuItem>
                                    <MenuItem value="N">비공개</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField fullWidth label="내용" name="content" value={formData.content} onChange={handleInputChange} margin="normal" multiline rows={10} required />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenFormDialog(false)}>취소</Button>
                        <Button onClick={handleSubmitForm} color="primary" variant="contained">{isEditing ? '저장' : '추가'}</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                    <DialogTitle>공지사항 삭제</DialogTitle>
                    <DialogContent>
                        <Typography>선택한 {selectedAnnouncementIds.length}개의 공지사항을 삭제하시겠습니까?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
                        <Button onClick={handleDelete} color="error">삭제</Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </Container>
    );
}
