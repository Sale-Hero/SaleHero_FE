// api.ts


export const userInfoApi = {
    // async submitUserInfo(data: UserInfoDTO): Promise<ApiResponse<UserInfoDTO>> {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/user/additional-info`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT 토큰
    //             },
    //             body: JSON.stringify(data),
    //         });
    //
    //         const result = await response.json();
    //
    //         if (!response.ok) {
    //             throw new Error(result.error || '서버 에러가 발생했습니다.');
    //         }
    //
    //         return {
    //             success: true,
    //             data: result,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.',
    //         };
    //     }
    // },
    //
    // async getUserInfo(userId: string): Promise<ApiResponse<UserInfoDTO>> {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/user/additional-info/${userId}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             },
    //         });
    //
    //         const result = await response.json();
    //
    //         if (!response.ok) {
    //             throw new Error(result.error || '서버 에러가 발생했습니다.');
    //         }
    //
    //         return {
    //             success: true,
    //             data: result,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.',
    //         };
    //     }
    // },
};