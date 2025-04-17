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
import {DataGrid} from '@mui/x-data-grid';
import {motion} from 'framer-motion';
import {useCookieFunctions} from "../../components/common/hooks/useCookieFunctions";
import {AdminUser} from "../../types/adminUser";
import {ApiResponse} from "../../types/common";
import {useAdminUserColumns} from "../../features/admin/hooks/useAdminUserColumns";

export function AdminUserManagement() {
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { columns } = useAdminUserColumns();
  const { getCookie } = useCookieFunctions();

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fetchUsers = async (page: number, limit: number): Promise<void> => {
    setLoading(true);
    try {
      const accessToken = getCookie('accessToken');

      const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/admin/users?page=${page + 1}&limit=${limit}`,
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
        throw new Error('Failed to fetch users');
      }

      const responseData: ApiResponse = await response.json();
      setUsers(responseData.data);
      setTotalUsers(responseData.meta.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaginationModelChange = (newModel: typeof paginationModel): void => {
    setPaginationModel(newModel);
  };

  useEffect(() => {
    fetchUsers(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const handleViewUser = (user: AdminUser): void => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  return (
      <Container maxWidth="lg">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" sx={{ mb: 4 }}>사용자 관리</Typography>

          <Card>
            <CardContent>
              <Box sx={{ height: 600 }}>
                <DataGrid<AdminUser>
                    rows={users}
                    columns={columns}
                    rowCount={totalUsers}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={handlePaginationModelChange}
                    pageSizeOptions={[10, 25, 50]}
                    loading={loading}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                      '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                      },
                    }}
                />
              </Box>
            </CardContent>
          </Card>

          <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
          >
            <DialogTitle>사용자 상세 정보</DialogTitle>
            <DialogContent dividers>
              {selectedUser && (
                  <Box sx={{ p: 2 }}>
                    <TextField
                        label="사용자명"
                        value={selectedUser.name}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="이메일"
                        value={selectedUser.email}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="국가"
                        value={selectedUser.nation}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="권한"
                        value={selectedUser.role}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="가입일"
                        value={selectedUser.created_at}
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
        </motion.div>
      </Container>
  );
}