import {CommunityCategories} from "..//types/community";

export interface CommunitySubmitDTO {
    title: string;
    content: string;
    category: CommunityCategories;
}

export interface PostsDTO{
    id: number,
    title: string,
    content: string,
    user_email: string,
    username: string,
    nation: string,
    created_at: string,
    updated_at: string,
    is_owner: boolean;
    category: CommunityCategories;
    comments:Comments[]
}

export interface CommentPostDTO{
    post_id: number;
    content: string;
}

export interface Comments{
    created_at: string;
    id: number;
    content: string;
    user_email: string;
}