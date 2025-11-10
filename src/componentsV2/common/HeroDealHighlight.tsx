import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography, IconButton, Fade, Button } from '@mui/material';
import { Whatshot, Close } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { useArticleGetter } from '../../hooks/useArticleGetter';
import { ArticleResponseDTO } from '../../types/adminArticle';

// 아이콘 주변에 빛나는 효과 (파란색 계열로 변경)
const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 174, 239, 0.5), 0 0 10px rgba(0, 229, 229, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 174, 239, 0.9), 0 0 30px rgba(0, 229, 229, 0.7);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 174, 239, 0.5), 0 0 10px rgba(0, 229, 229, 0.4);
  }
`;

export function HeroDealHighlight() {
    const { getArticles, articles } = useArticleGetter();
    const [isOpen, setIsOpen] = useState(false);
    const [latestArticles, setLatestArticles] = useState<ArticleResponseDTO[]>([]);

    useEffect(() => {
        getArticles({ page: 0, size: 3 }); // API 호출
    }, [getArticles]);

    useEffect(() => {
        if (articles?.content && articles.content.length > 0) {
            setLatestArticles(articles.content); // 받아온 최신 데이터를 그대로 사용
        }
    }, [articles]);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* 새로 디자인된 클릭 아이콘 (파란색 계열) */}
            <Box
                onClick={togglePopup}
                sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '16px',
                    background: 'linear-gradient(45deg, #00AEEF 10%, #00E5E5 90%)', // 새로운 파란색 그라데이션
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    animation: `${glow} 2.5s ease-in-out infinite`,
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    }
                }}
            >
                <Whatshot sx={{ color: 'white', fontSize: 32 }} />
            </Box>

            {/* 팝업 */}
            <Fade in={isOpen}>
                <Paper
                    elevation={8}
                    sx={{
                        position: 'absolute',
                        right: '110%', // 아이콘 왼쪽에 나타나도록 설정
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 300,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid #FFCD00',
                        background: 'linear-gradient(135deg, #1D2A3D 0%, #0F1924 100%)',
                        color: 'white'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: '8px 16px',
                            background: 'linear-gradient(45deg, #F29727 10%, #FFCD00 90%)',
                            color: '#1D2A3D',
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            ✨ 최신 아티클
                        </Typography>
                        <IconButton onClick={togglePopup} size="small" sx={{ color: '#1D2A3D' }}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        {latestArticles.map((article) => (
                            <Link to={`/articles/${article.id}`} key={article.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Box
                                    sx={{
                                        py: 1,
                                        my: 0.5,
                                        px: 1,
                                        borderRadius: '8px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            color: '#F29727'
                                        },
                                        transition: 'background-color 0.2s'
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {article.title}
                                    </Typography>
                                </Box>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ textAlign: 'center', pb: 2 }}>
                        <Link to="/articles" style={{ textDecoration: 'none' }}>
                            <Button size="small" variant="outlined" sx={{
                                borderRadius: '20px',
                                borderColor: '#F29727',
                                color: '#F29727',
                                '&:hover': {
                                    backgroundColor: 'rgba(242, 151, 39, 0.1)',
                                    borderColor: '#F29727'
                                }
                            }}>
                                전체 할인정보 보기
                            </Button>
                        </Link>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
}
