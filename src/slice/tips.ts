export interface TipsResponseDTO{
    id: number,
    title: string,
    content: string,
    view_count: number,
    user_id: number,
    category: string, // 수정필요
    created_at: string,
    updated_at: string;
}