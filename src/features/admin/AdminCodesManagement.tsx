import {useEffect, useState} from 'react';
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
} from '@mui/material';
import {GridValueGetter} from '@mui/x-data-grid';
import {DataGrid, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import {motion} from 'framer-motion';
import {useCookieFunctions} from "../../components/common/hooks/useCookieFunctions";

interface CommonCode {
    id: number;
    group_code: string;
    group_code_name: string;
    code: string;
    code_name: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface AddEditCodeFormData {
    group_code: string;
    group_code_name: string;
    code: string;
    code_name: string;
    sort_order: number;
}

export function AdminCodesManagement() {
    const [codes, setCodes] = useState<CommonCode[]>([]);
    const [totalCodes, setTotalCodes] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCodes, setSelectedCodes] = useState<number[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [addEditDialogOpen, setAddEditDialogOpen] = useState<boolean>(false);
    const [selectedCode, setSelectedCode] = useState<CommonCode | null>(null);
    const [formData, setFormData] = useState<AddEditCodeFormData>({
        group_code: '',
        group_code_name: '',
        code: '',
        code_name: '',
        sort_order: 1
    });
    const {getCookie} = useCookieFunctions();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const columns: GridColDef[] = [
        {field: 'group_code', headerName: '그룹 코드', width: 130},
        {field: 'group_code_name', headerName: '그룹 코드명', width: 150},
        {field: 'code', headerName: '코드', width: 130},
        {field: 'code_name', headerName: '코드명', width: 150},
        {field: 'sort_order', headerName: '정렬 순서', width: 100},
        // {
        //     field: 'created_at',
        //     headerName: '생성일',
        //     width: 180,
        //     valueFormatter: (params: GridValueGetter<CommonCode>) => {
        //         return new Date(params.toString()).toLocaleString();
        //     }
        // },
        {
            field: 'actions',
            headerName: '관리',
            width: 180,
            renderCell: (params) => (
                <Box>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEditCode(params.row)}
                        sx={{mr: 1}}
                    >
                        수정
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewCode(params.row)}
                    >
                        상세
                    </Button>
                </Box>
            ),
        },
    ];

    const fetchCodes = async (page: number, limit: number) => {
        setLoading(true);
        try {
            const accessToken = getCookie('accessToken');
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/admin/codes?page=${page + 1}&limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '/admin/login';
                    return;
                }
                throw new Error('Failed to fetch codes');
            }

            const responseData = await response.json();
            setCodes(responseData.data);
            setTotalCodes(responseData.meta.total);
        } catch (error) {
            console.error('Error fetching codes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCodes = async () => {
        try {
            const accessToken = getCookie('accessToken');
            for (const codeId of selectedCodes) {
                console.log(codeId)
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/admin/codes/${codeId}/delete`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`Failed to delete code ${codeId}`);
                }
            }

            await fetchCodes(paginationModel.page, paginationModel.pageSize);
            setSelectedCodes([]);
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting codes:', error);
        }
    };

    const handleAddEditCode = async () => {
        try {
            const accessToken = getCookie('accessToken');
            const method = selectedCode ? 'PUT' : 'POST';
            const url = selectedCode
                ? `${process.env.REACT_APP_BASE_URL}/admin/codes/${selectedCode.id}`
                : `${process.env.REACT_APP_BASE_URL}/admin/codes`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to save code');
            }

            await fetchCodes(paginationModel.page, paginationModel.pageSize);
            setAddEditDialogOpen(false);
            resetForm();
        } catch (error) {
            console.error('Error saving code:', error);
        }
    };

    const handleViewCode = (code: CommonCode) => {
        setSelectedCode(code);
        setOpenDialog(true);
    };

    const handleEditCode = (code: CommonCode) => {
        setSelectedCode(code);
        setFormData({
            group_code: code.group_code,
            group_code_name: code.group_code_name,
            code: code.code,
            code_name: code.code_name,
            sort_order: code.sort_order
        });
        setAddEditDialogOpen(true);
    };

    const handleAddNewCode = () => {
        setSelectedCode(null);
        resetForm();
        setAddEditDialogOpen(true);
    };

    const resetForm = () => {
        setFormData({
            group_code: '',
            group_code_name: '',
            code: '',
            code_name: '',
            sort_order: 1
        });
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'sort_order' ? parseInt(value) : value
        }));
    };

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedCodes(selectionModel as number[]);
    };

    const handlePaginationModelChange = (newModel: typeof paginationModel) => {
        setPaginationModel(newModel);
    };

    useEffect(() => {
        fetchCodes(paginationModel.page, paginationModel.pageSize);
    }, [paginationModel]);

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                    <Typography variant="h4">공통 코드 관리</Typography>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddNewCode}
                            sx={{mr: 2}}
                        >
                            새 코드 추가
                        </Button>
                        {selectedCodes.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setDeleteDialogOpen(true)}
                            >
                                선택한 코드 삭제 ({selectedCodes.length})
                            </Button>
                        )}
                    </Box>
                </Box>

                <Card>
                    <CardContent>
                        <Box sx={{height: 600}}>
                            <DataGrid<CommonCode>
                                rows={codes}
                                columns={columns}
                                rowCount={totalCodes}
                                paginationModel={paginationModel}
                                paginationMode="server"
                                onPaginationModelChange={handlePaginationModelChange}
                                pageSizeOptions={[10, 25, 50]}
                                loading={loading}
                                checkboxSelection
                                disableRowSelectionOnClick
                                onRowSelectionModelChange={handleSelectionChange}
                                rowSelectionModel={selectedCodes}
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
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>공통 코드 상세 정보</DialogTitle>
                    <DialogContent dividers>
                        {selectedCode && (
                            <Box sx={{p: 2}}>
                                <TextField
                                    label="그룹 코드"
                                    value={selectedCode.group_code}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{readOnly: true}}
                                />
                                <TextField
                                    label="그룹 코드명"
                                    value={selectedCode.group_code_name}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{readOnly: true}}
                                />
                                <TextField
                                    label="코드"
                                    value={selectedCode.code}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{readOnly: true}}
                                />
                                <TextField
                                    label="코드명"
                                    value={selectedCode.code_name}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{readOnly: true}}
                                />
                                <TextField
                                    label="정렬 순서"
                                    value={selectedCode.sort_order}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{readOnly: true}}
                                />
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>닫기</Button>
                    </DialogActions>
                </Dialog>

                {/* 추가/수정 다이얼로그 */}
                <Dialog
                    open={addEditDialogOpen}
                    onClose={() => setAddEditDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        {selectedCode ? '공통 코드 수정' : '새 공통 코드 추가'}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{p: 2}}>
                            <TextField
                                label="그룹 코드"
                                name="group_code"
                                value={formData.group_code}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="그룹 코드명"
                                name="group_code_name"
                                value={formData.group_code_name}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="코드"
                                name="code"
                                value={formData.code}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="코드명"
                                name="code_name"
                                value={formData.code_name}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="정렬 순서"
                                name="sort_order"
                                type="number"
                                value={formData.sort_order}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAddEditDialogOpen(false)}>취소</Button>
                        <Button onClick={handleAddEditCode} variant="contained" color="primary">
                            {selectedCode ? '수정' : '추가'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* 삭제 확인 다이얼로그 */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>공통 코드 삭제</DialogTitle>
                    <DialogContent>
                        <Typography>
                            선택한 {selectedCodes.length}개의 공통 코드를 삭제하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
                        <Button onClick={handleDeleteCodes} color="error" variant="contained">
                            삭제
                        </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </Container>
    )
        ;
}
