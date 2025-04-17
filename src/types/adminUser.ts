export interface AdminUser {
    id: number;
    name: string;
    email: string;
    nation: string;
    is_active: 'Y' | 'N';
    is_email_verified: 'Y' | 'N';
    role: string;
    created_at: string;
    updated_at: string;
    user_info: null | any;  // 필요한 경우 더 구체적인 타입으로 변경
}

export interface AdminCurrentCount{
    userCount: number;
    communityCount: number;
}

export interface ModifyAuthUser{
    id: string;
    role: string;
    is_active: 'Y' | 'N';
}

// export interface ModifyDeactivateUser{
//     id: string;
//     is_active: 'Y' | 'N';
// }