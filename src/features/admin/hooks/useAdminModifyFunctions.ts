import {useCookieFunctions} from "../../../components/common/hooks/useCookieFunctions";
import {ModifyAuthUser} from "../../../types/adminUser";

export function useAdminModifyFunctions() {
    const { getCookie } = useCookieFunctions();
    const handleAuthUser = async (id: string): Promise<void> => {
        try {
            const accessToken = getCookie('accessToken');
            const data: ModifyAuthUser = {
                id: id,
                role: 'admin',
                is_active: 'Y'

            };

            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/admin/users/${id}/modify`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update user auth');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error updating user auth:', error);
        }
    };


    const handleDeactivateUser = async (id: string): Promise<void> => {
        try {
            const accessToken = getCookie('accessToken');
            const data: ModifyAuthUser = {
                id: id,
                role: 'user',
                is_active: 'N'
            };

            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/admin/users/${id}/modify`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to deactivate user');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error deactivating user:', error);
        }
    };

    return{
        handleAuthUser, handleDeactivateUser

    }
}