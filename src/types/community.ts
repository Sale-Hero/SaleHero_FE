export enum CommunityCategories{
    ALL = '',
    DAILY = "DAILY",
    TECH = "TECH",
    STUDY = "STUDY",
    INFO = "INFO",
    NEWS = "NEWS",
    OVERSEAS_INFORMATION = "OVERSEAS_INFORMATION",

    COMMUNITY_POSTS = "COMMUNITY_POSTS",
    INTERVIEW_POSTS = "INTERVIEW_POSTS"
}

export interface CommunityDTO{
    "id": number,
    "title": string,
    "content": string,
    "username": string,
    "user_email": string,
    "user_id": number,
    "view_count": string,
    "nation": string,
    "created_at": string,
    "updated_at": string,
    "is_owner": true,
    "category": CommunityCategories
}

export interface CommunityPostDTO{
    title: string;
    content: string;
    category: CommunityCategories;
}

export enum CommunityType {
    COMMUNITY = "COMMUNITY",
    TIPS = "TIPS",
}

export interface CommunityFormProps {
    mode: 'create' | 'edit';
    initialData?: {
        title: string;
        content: string;
        category: CommunityCategories;
    };
    postId?: number;
}

export interface CommunityAnswerDetailDTO {
    "created_at": string,
    "updated_at": string,
    "deleted_at": string | null,
    "id": number,
    "user_id": number,
    "user_email": string;
    "post_id": number,
    "answer_content": string;
}