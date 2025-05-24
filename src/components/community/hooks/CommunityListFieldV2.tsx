import {Box, Typography} from "@mui/material";
import {AccessTime as AccessTimeIcon, Visibility as VisibilityIcon} from "@mui/icons-material";
import React from "react";
import {CommunityCategory, CommunityDTO} from "../../../types/community";

const darkSpaceTheme = {
    primary: '#F9A825',
    secondary: '#FFD54F',
    text: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0'
    }
};

interface Args {
    post: CommunityDTO,
    sx?: {
        "& .title": { color: string };
        "& .category": { backgroundColor: string; color: string };
        "& .date": { color: string };
        "& .likes, & .views, & .comments": { color: string }
    }
}

export function CommunityListFieldV2({post, sx}: Args) {

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    const formatTime = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit'};
        return new Date(dateString).toLocaleTimeString('ko-KR', options);
    };

    const getCategoryLabel = (category: CommunityCategory): string => {
        return category === CommunityCategory.INFORMATION ? '정보' : '커뮤니티';
    };

    return (
        <Box sx={{ width: '100%', padding: 0 }}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                <Box
                    className="category"
                    sx={{
                        backgroundColor: `${darkSpaceTheme.primary}`,
                        color: '#000000',
                        fontWeight: '600',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        display: 'inline-block'
                    }}
                >
                    {getCategoryLabel(post.category)}
                </Box>
                <Typography
                    className="date"
                    variant="caption"
                    sx={{
                        color: '#B0B0B0',
                        fontWeight: '400',
                        fontSize: '0.85rem'
                    }}
                >
                    {formatDate(post.createdAt)}
                </Typography>
            </Box>

            <Typography
                className="title"
                variant="h6"
                sx={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: '1.1rem',
                    mb: 2,
                    lineHeight: 1.4,
                    cursor: 'pointer'
                }}
            >
                {post.title}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    color: '#B0B0B0',
                    fontWeight: '400',
                    mb: 3,
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}
            >
                {post.content}
            </Typography>

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box
                        sx={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: darkSpaceTheme.primary,
                            color: '#000000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            mr: 1.5
                        }}
                    >
                        {post.writerName.charAt(0)}
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#B0B0B0',
                            fontWeight: '400',
                            fontSize: '0.9rem'
                        }}
                    >
                        {post.writerName}
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <VisibilityIcon
                            sx={{
                                fontSize: 16,
                                color: '#B0B0B0',
                                mr: 0.5
                            }}
                        />
                        <Typography
                            className="views"
                            variant="caption"
                            sx={{
                                color: '#B0B0B0',
                                fontWeight: '400',
                                fontSize: '0.85rem'
                            }}
                        >
                            {post.viewCount}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <AccessTimeIcon
                            sx={{
                                fontSize: 16,
                                color: '#B0B0B0',
                                mr: 0.5
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#B0B0B0',
                                fontWeight: '400',
                                fontSize: '0.85rem'
                            }}
                        >
                            {formatTime(post.createdAt)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}