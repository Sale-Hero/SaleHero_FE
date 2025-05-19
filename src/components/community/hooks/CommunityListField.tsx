import {Box, CardContent, Typography} from "@mui/material";
import {CardFooter, CommunityCard, StyledAvatar, TypeChip} from "./useCommunityStyles";
import {AccessTime as AccessTimeIcon, Visibility as VisibilityIcon} from "@mui/icons-material";
import React from "react";
import {CommunityCategory, CommunityDTO} from "../../../types/community";

interface Args {
    post: CommunityDTO,
    sx?: {
        "& .title": { color: string };
        "& .category": { backgroundColor: string; color: string };
        "& .date": { color: string };
        "& .likes, & .views, & .comments": { color: string }
    }
}

export function CommunityListField({post, sx}: Args) {

    // 날짜 포맷팅 함수
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    // 시간 포맷팅 함수
    const formatTime = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit'};
        return new Date(dateString).toLocaleTimeString('ko-KR', options);
    };

    // 카테고리 라벨 가져오기
    const getCategoryLabel = (category: CommunityCategory): string => {
        return category === CommunityCategory.INFORMATION ? '정보' : '커뮤니티';
    };

    return (
        <CommunityCard key={post.id}>
            <CardContent>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                    <TypeChip
                        label={getCategoryLabel(post.category)}
                        category={post.category}
                        size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                        {formatDate(post.createdAt)}
                    </Typography>
                </Box>

                <Typography variant="h6" fontWeight="medium" sx={{mb: 1}}>
                    {post.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" noWrap>
                    {post.content}
                </Typography>

                <CardFooter>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <StyledAvatar>{post.writerName.charAt(0)}</StyledAvatar>
                        <Typography variant="body2">{post.writerName}</Typography>
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <VisibilityIcon sx={{fontSize: 16, color: '#9E9E9E', mr: 0.5}}/>
                        <Typography variant="caption" color="text.secondary" sx={{mr: 2}}>
                            {post.viewCount}
                        </Typography>
                        <AccessTimeIcon sx={{fontSize: 16, color: '#9E9E9E', mr: 0.5}}/>
                        <Typography variant="caption" color="text.secondary">
                            {formatTime(post.createdAt)}
                        </Typography>
                    </Box>
                </CardFooter>
            </CardContent>
        </CommunityCard>
    )
}