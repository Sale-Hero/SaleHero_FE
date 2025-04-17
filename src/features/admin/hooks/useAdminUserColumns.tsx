import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {AdminUser} from "../../../types/adminUser";
import {Box, Button, Chip, IconButton} from "@mui/material";
import {AdminPanelSettings, Block, Delete, Edit, Visibility} from "@mui/icons-material";
import {StatusMapping} from "../../../types/common";
import {useAdminModifyFunctions} from "../../../features/admin/hooks/useAdminModifyFunctions";
import React from "react";

export function useAdminUserColumns() {

    const { handleDeactivateUser, handleAuthUser } = useAdminModifyFunctions();
    const activeStatusMap: StatusMapping = {
        'Y': { label: '활성', color: 'success' },
        'N': { label: '비활성', color: 'error' }
    };

    const verificationStatusMap: StatusMapping = {
        'Y': { label: '인증됨', color: 'success' },
        'N': { label: '미인증', color: 'warning' }
    };

    const columns: GridColDef<AdminUser>[] = [
        {
            field: 'name',
            headerName: '사용자명',
            flex: 1
        },
        {
            field: 'email',
            headerName: '이메일',
            flex: 1.5
        },
        {
            field: 'nation',
            headerName: '국가',
            width: 120,
            renderCell: (params: GridRenderCellParams<AdminUser>) => (
                <Chip
                    label={params.value}
                    color={params.value === 'KOR' ? 'primary' : 'default'}
                    size="small"
                />
            )
        },
        {
            field: 'is_active',
            headerName: '활성화',
            width: 100,
            renderCell: (params: GridRenderCellParams<AdminUser>) => {
                const status = activeStatusMap[params.value as 'Y' | 'N'];
                return (
                    <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                    />
                );
            }
        },
        {
            field: 'is_email_verified',
            headerName: '이메일 인증',
            width: 120,
            renderCell: (params: GridRenderCellParams<AdminUser>) => {
                const status = verificationStatusMap[params.value as 'Y' | 'N'];
                return (
                    <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                    />
                );
            }
        },
        { field: 'role', headerName: '권한', width: 120 },
        { field: 'created_at', headerName: '가입일', width: 180 },
        {
            field: 'actions',
            headerName: '관리',
            width: 120,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {params.id && (
                        <>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 'auto', p: 1 }}
                        onClick={() => handleAuthUser(params.id.toString())}
                        title="권한 부여"
                    >
                        <AdminPanelSettings
                            fontSize="small"
                            sx={{ color: params.row.role === 'auth_user' ? 'primary.main' : 'text.secondary' }}
                        />
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{ minWidth: 'auto', p: 1 }}
                        onClick={() => handleDeactivateUser(params.id.toString())}
                        title="계정 비활성화"
                    >
                        <Block fontSize="small" />
                    </Button>
            </>)}
                </Box>
            ),
        },
    ];

    return{
        columns,

    }
}