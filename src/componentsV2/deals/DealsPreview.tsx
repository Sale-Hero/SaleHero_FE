import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    CircularProgress,
    useMediaQuery,
    useTheme,
    alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserNewsLetterGetter } from '../../components/deals/hooks/useUserNewsLetterGetter';
import { ArrowForward as ArrowForwardIcon, Stars as StarsIcon } from '@mui/icons-material';

// 우주 테마 컬러 (DealsV2와 일관성 유지)
const spaceTheme = {
    primary: '#F9A825',
    secondary: '#FFD54F',
    background: 'transparent', // 부모 컴포넌트의 배경을 사용
    paper: 'rgba(22, 28, 45, 0.7)',
    text: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0',
    },
    divider: 'rgba(255, 255, 255, 0.1)'
};

export function DealsPreview() {
    const navigate = useNavigate();
    const { getNewsLetters, newsLetters, isLoading } = useUserNewsLetterGetter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        getNewsLetters();
    }, [getNewsLetters]);

    const dealsToShow = newsLetters?.content?.slice(0, 4) || [];

    const extractSummary = (content: string): string => {
        const strippedContent = content.replace(/<[^>]*>/g, ' ');
        return strippedContent.substring(0, 100) + (strippedContent.length > 100 ? '...' : '');
    };

    return (
        <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: spaceTheme.background }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* 섹션 헤더 */}
                <Box sx={{ mb: 5, textAlign: 'center' }}>
                    <Typography
                        variant={isMobile ? "h4" : "h3"}
                        component="h2"
                        fontWeight="bold"
                        sx={{
                            color: spaceTheme.primary,
                            mb: 2,
                            background: `linear-gradient(45deg, ${spaceTheme.primary} 10%, ${spaceTheme.secondary} 90%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: `0 0 15px ${alpha(spaceTheme.primary, 0.3)}`,
                        }}
                    >
                        주요 할인 정보
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: spaceTheme.text.secondary, maxWidth: '600px', margin: '0 auto' }}>
                        놓치지 말아야 할 최신 프로모션을 확인해보세요.
                    </Typography>
                </Box>

                {/* 할인 정보 카드 그리드 */}
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress sx={{ color: spaceTheme.primary }} />
                    </Box>
                ) : (
                    <Grid container spacing={isMobile ? 2 : 3}>
                        {dealsToShow.map((deal, index) => (
                            <Grid item xs={12} sm={6} md={3} key={deal.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 3,
                                            backgroundColor: alpha(spaceTheme.paper, 0.7),
                                            backdropFilter: 'blur(10px)',
                                            boxShadow: `0 6px 28px ${alpha('#000', 0.2)}`,
                                            transition: 'all 0.3s ease',
                                            border: `1px solid ${alpha(spaceTheme.text.primary, 0.1)}`,
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: `0 10px 25px ${alpha(spaceTheme.primary, 0.2)}`,
                                                borderColor: alpha(spaceTheme.primary, 0.3),
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                gutterBottom
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '1.1rem',
                                                    color: spaceTheme.text.primary,
                                                    cursor: 'pointer',
                                                    '&:hover': { color: spaceTheme.primary },
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    minHeight: '44px' // 2줄 높이 확보
                                                }}
                                                onClick={() => navigate(`/deals/${deal.id}`)}
                                            >
                                                {deal.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: spaceTheme.text.secondary, lineHeight: 1.6 }}>
                                                {extractSummary(deal.content)}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ p: 2, pt: 0 }}>
                                            <Button
                                                fullWidth
                                                variant="text"
                                                onClick={() => navigate(`/deals/${deal.id}`)}
                                                endIcon={<ArrowForwardIcon />}
                                                sx={{
                                                    color: spaceTheme.primary,
                                                    fontWeight: 600,
                                                    justifyContent: 'flex-start',
                                                    '&:hover': {
                                                        backgroundColor: alpha(spaceTheme.primary, 0.1),
                                                    },
                                                }}
                                            >
                                                자세히 보기
                                            </Button>
                                        </Box>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* 더보기 버튼 */}
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/deals')}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            backgroundColor: spaceTheme.primary,
                            color: '#000',
                            fontWeight: 600,
                            borderRadius: '50px',
                            px: 5,
                            py: 1.5,
                            transition: 'all 0.3s ease',
                            boxShadow: `0 4px 15px ${alpha(spaceTheme.primary, 0.3)}`,
                            '&:hover': {
                                backgroundColor: spaceTheme.secondary,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 6px 20px ${alpha(spaceTheme.primary, 0.4)}`,
                            },
                        }}
                    >
                        모든 할인 정보 보기
                    </Button>
                </Box>
            </motion.div>
        </Box>
    );
}
