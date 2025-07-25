import React, { useState } from 'react';
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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Chip
} from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { motion } from 'framer-motion';

// AnnouncementCategory Enum
export enum AnnouncementCategory {
    NOTICE = 'NOTICE',
    EVENT = 'EVENT',
    UPDATE = 'UPDATE',
}

// Announcement DTO
export interface AnnouncementDTO {
    id: number;
    title: string;
    content: string;
    category: AnnouncementCategory;
    viewCount: number;
    createdAt: string;
    isVisible: boolean;
    isDeleted: boolean;
}

// 더미 데이터
const dummyAnnouncements: AnnouncementDTO[] = [
    {
        id: 1,
        title: '서비스 점검 안내',
        content: '6월 10일(월) 02:00~04:00 서비스 점검이 진행됩니다.',
        category: AnnouncementCategory.NOTICE,
        viewCount: 100,
        createdAt: '2024-06-01T12:00:00',
        isVisible: true,
        isDeleted: false,
    },
    {
        id: 2,
        title: '이벤트 당첨자 발표',
        content: '5월 이벤트 당첨자를 발표합니다.',
        category: AnnouncementCategory.EVENT,
        viewCount: 80,
        createdAt: '2024-06-02T15:00:00',
        isVisible: true,
        isDeleted: false,
    },
    {
        id: 3,
        title: '앱 업데이트 안내',
        content: '앱이 최신 버전으로 업데이트 되었습니다.',
        category: AnnouncementCategory.UPDATE,
        viewCount: 60,
        createdAt: '2024-06-03T09:00:00',
        isVisible: false,
        isDeleted: false,
    },
];

function formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function AdminAnnouncementManagement() {
    const [announcements, setAnnouncements] = useState<AnnouncementDTO[]>(dummyAnnouncements);
    const [categoryTab, setCategoryTab] = useState<'ALL' | AnnouncementCategory>('ALL');
    const [searchWord, setSearchWord] = useState('');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementDTO | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Omit<AnnouncementDTO, 'id' | 'viewCount' | 'createdAt' | 'isDeleted'>>({
        title: '',
        content: '',
        category: AnnouncementCategory.NOTICE,
        isVisible: true,
    });

    // 카테고리/검색 필터
    const filteredByCategory = categoryTab === 'ALL' ? announcements : announcements.filter(a => a.category === categoryTab);
    const filtered = searchWord
        ? filteredByCategory.filter(a =>
            a.title.toLowerCase().includes(searchWord.toLowerCase()) ||
            a.content.toLowerCase().includes(searchWord.toLowerCase())
        )
        : filteredByCategory;

    // DataGrid 컬럼
    const columns: GridColDef[] = [
        { field: 'title', headerName: '제목', flex: 1 },
        { field: 'category', headerName: '카테고리', width: 120 },
        {
            field: 'isVisible',
            headerName: '공개 여부',
            width: 100,
            renderCell: (params) => (
                <Chip
                    label={params.value ? '공개' : '비공개'}
                    color={params.value ? 'success' : 'default'}
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
                    <IconButton size="small" onClick={() => handleView(params.row)} color="primary">
                        <Search fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleEdit(params.row)} color="secondary">
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => { setSelectedIds([params.row.id]); setDeleteDialogOpen(true); }} color="error">
                        <Delete fontSize="small" />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    // 핸들러
    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedIds(selectionModel as number[]);
    };
    const handleView = (announcement: AnnouncementDTO) => {
        setSelectedAnnouncement(announcement);
        setOpenViewDialog(true);
    };
    const handleEdit = (announcement: AnnouncementDTO) => {
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
            category: AnnouncementCategory.NOTICE,
            isVisible: true
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
    const handleCategoryChange = (e: any) => {
        setFormData({
            ...formData,
            category: e.target.value as AnnouncementCategory
        });
    };
    const handleVisibleChange = (e: any) => {
        setFormData({
            ...formData,
            isVisible: e.target.value === 'true'
        });
    };
    const handleDelete = () => {
        setAnnouncements(announcements.filter(a => !selectedIds.includes(a.id)));
        setSelectedIds([]);
        setDeleteDialogOpen(false);
    };
    const handleSubmitForm = () => {
        if (!formData.title || !formData.content) {
            alert('제목과 내용을 입력하세요.');
            return;
        }
        if (isEditing && selectedAnnouncement) {
            setAnnouncements(announcements.map(a =>
                a.id === selectedAnnouncement.id
                    ? { ...a, ...formData }
                    : a
            ));
        } else {
            setAnnouncements([
                {
                    id: Date.now(),
                    viewCount: 0,
                    createdAt: new Date().toISOString(),
                    isDeleted: false,
                    ...formData
                },
                ...announcements
            ]);
        }
        setOpenFormDialog(false);
    };

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
                        <Tab label="공지" value={AnnouncementCategory.NOTICE} />
                        <Tab label="이벤트" value={AnnouncementCategory.EVENT} />
                        <Tab label="업데이트" value={AnnouncementCategory.UPDATE} />
                    </Tabs>
                </Box>

                {/* 검색 입력란 */}
                <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="제목, 내용 검색"
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {}}
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
                                rows={filtered}
                                columns={columns}
                                rowCount={filtered.length}
                                pageSizeOptions={[10, 25, 50]}
                                checkboxSelection
                                disableRowSelectionOnClick
                                onRowSelectionModelChange={handleSelectionChange}
                                rowSelectionModel={selectedIds}
                                sx={{
                                    '& .MuiDataGrid-cell:focus': {
                                        outline: 'none',
                                    },
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>

                {/* 상세 보기 다이얼로그 */}
                <Dialog
                    open={openViewDialog}
                    onClose={() => setOpenViewDialog(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>공지사항 상세 정보</DialogTitle>
                    <DialogContent dividers>
                        {selectedAnnouncement && (
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Chip
                                        label={selectedAnnouncement.isVisible ? '공개' : '비공개'}
                                        color={selectedAnnouncement.isVisible ? 'success' : 'default'}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        카테고리: {selectedAnnouncement.category}
                                    </Typography>
                                </Box>
                                <Typography variant="h5" gutterBottom>
                                    {selectedAnnouncement.title}
                                </Typography>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }} />
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mt: 2 }}>
                                    {selectedAnnouncement.content}
                                </Typography>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        작성일: {selectedAnnouncement.createdAt ? formatDate(selectedAnnouncement.createdAt) : '-'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        조회수: {selectedAnnouncement.viewCount}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setOpenViewDialog(false);
                            if (selectedAnnouncement) {
                                handleEdit(selectedAnnouncement);
                            }
                        }} color="primary">
                            편집
                        </Button>
                        <Button onClick={() => setOpenViewDialog(false)}>닫기</Button>
                    </DialogActions>
                </Dialog>

                {/* 추가/수정 폼 다이얼로그 */}
                <Dialog
                    open={openFormDialog}
                    onClose={() => setOpenFormDialog(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>{isEditing ? '공지사항 편집' : '공지사항 추가'}</DialogTitle>
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
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="category-label">카테고리</InputLabel>
                                <Select
                                    labelId="category-label"
                                    value={formData.category}
                                    label="카테고리"
                                    onChange={handleCategoryChange}
                                >
                                    {(Object.values(AnnouncementCategory) as string[]).map((cat) => (
                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="visible-label">공개 여부</InputLabel>
                                <Select
                                    labelId="visible-label"
                                    value={formData.isVisible ? 'true' : 'false'}
                                    label="공개 여부"
                                    onChange={handleVisibleChange}
                                >
                                    <MenuItem value="true">공개</MenuItem>
                                    <MenuItem value="false">비공개</MenuItem>
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
                        <Button onClick={() => setOpenFormDialog(false)}>취소</Button>
                        <Button
                            onClick={handleSubmitForm}
                            color="primary"
                            variant="contained"
                            disabled={!formData.title || !formData.content}
                        >
                            {isEditing ? '저장' : '추가'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* 삭제 확인 다이얼로그 */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>공지사항 삭제</DialogTitle>
                    <DialogContent>
                        <Typography>
                            선택한 {selectedIds.length}개의 공지사항을 삭제하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>
                            취소
                        </Button>
                        <Button
                            onClick={handleDelete}
                            color="error"
                        >
                            삭제
                        </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </Container>
    );
} 