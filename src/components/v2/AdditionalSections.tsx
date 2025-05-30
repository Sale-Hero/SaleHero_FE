import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Avatar, Chip, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const GradientText = styled(Typography)`
    background: linear-gradient(90deg, #F29727 0%, #FFA41B 50%, #FFCD00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
`;

const GlassCard = styled(Card)`
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
`;

const FeatureCard = styled(motion.div)`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    height: 100%;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-4px);
    }
`;

const StatsCard = styled(Box)`
    background: rgba(242, 151, 39, 0.1);
    border: 1px solid rgba(242, 151, 39, 0.3);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(242, 151, 39, 0.15);
        transform: scale(1.02);
    }
`;

const DealCard = styled(Paper)`
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }
`;

export default function AdditionalSections() {
    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #070B14 0%, #121A2B 100%)',
            color: 'white',
            py: 8
        }}>
            {/* 1. 실시간 인기 할인 정보 섹션 */}
            <Container maxWidth="lg" sx={{ mb: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                            지금 가장 <GradientText>인기있는</GradientText> 할인
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', mx: 'auto' }}>
                            실시간으로 업데이트되는 가장 핫한 할인 정보들을 확인해보세요
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {[
                            {
                                brand: 'BBQ',
                                deal: '치킨 1+1 이벤트',
                                discount: '50%',
                                time: '2시간 남음',
                                category: '치킨',
                                views: '1,234'
                            },
                            {
                                brand: '롯데마트',
                                deal: '신선식품 특가',
                                discount: '30%',
                                time: '1일 남음',
                                category: '마트',
                                views: '2,567'
                            },
                            {
                                brand: 'CU편의점',
                                deal: '아메리카노 1+1',
                                discount: '50%',
                                time: '3일 남음',
                                category: '편의점',
                                views: '3,891'
                            }
                        ].map((deal, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <DealCard elevation={0}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                                            <Chip
                                                label={deal.category}
                                                size="small"
                                                sx={{
                                                    background: 'rgba(242, 151, 39, 0.2)',
                                                    color: '#FFA41B',
                                                    border: '1px solid rgba(242, 151, 39, 0.3)'
                                                }}
                                            />
                                            <Typography variant="h4" sx={{ color: '#FFA41B', fontWeight: 700 }}>
                                                {deal.discount}
                                            </Typography>
                                        </Box>

                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                            {deal.brand}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
                                            {deal.deal}
                                        </Typography>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <AccessTimeIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }} />
                                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                                    {deal.time}
                                                </Typography>
                                            </Box>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                                👀 {deal.views}
                                            </Typography>
                                        </Box>
                                    </DealCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>

            {/* 2. 세일히어로 특징/기능 섹션 */}
            <Container maxWidth="lg" sx={{ mb: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                            <GradientText>세일히어로</GradientText>가 특별한 이유
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            더 스마트하고 편리한 쇼핑을 위한 혁신적인 기능들
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            {
                                icon: <TrendingUpIcon sx={{ fontSize: 48, color: '#FFA41B' }} />,
                                title: '실시간 가격 추적',
                                description: 'AI가 24시간 실시간으로 가격을 모니터링하여 최적의 구매 타이밍을 알려드립니다.'
                            },
                            {
                                icon: <NotificationsActiveIcon sx={{ fontSize: 48, color: '#FFA41B' }} />,
                                title: '맞춤형 알림 서비스',
                                description: '개인의 쇼핑 패턴을 분석하여 관심 있는 할인 정보만 선별해서 알려드립니다.'
                            },
                            {
                                icon: <LocalOfferIcon sx={{ fontSize: 48, color: '#FFA41B' }} />,
                                title: '전국 모든 할인 정보',
                                description: '대형마트부터 동네 편의점까지, 전국 모든 할인 정보를 한 곳에서 확인하세요.'
                            }
                        ].map((feature, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <FeatureCard
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <Box sx={{ mb: 3 }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                                        {feature.description}
                                    </Typography>
                                </FeatureCard>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>

            {/* 3. 통계/수치 섹션 */}
            <Container maxWidth="lg" sx={{ mb: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                            <GradientText>숫자</GradientText>로 보는 세일히어로
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            { number: '10,000+', label: '활성 사용자', icon: '👥' },
                            { number: '50,000+', label: '매일 업데이트되는 할인 정보', icon: '🔄' },
                            { number: '평균 30%', label: '사용자 절약률', icon: '💰' },
                            { number: '24/7', label: '실시간 모니터링', icon: '⏰' }
                        ].map((stat, index) => (
                            <Grid item xs={6} md={3} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <StatsCard>
                                        <Typography variant="h4" sx={{ fontSize: '2rem', mb: 1 }}>
                                            {stat.icon}
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFA41B', mb: 1 }}>
                                            {stat.number}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                            {stat.label}
                                        </Typography>
                                    </StatsCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>

            {/* 4. 사용자 후기 섹션 */}
            <Container maxWidth="lg" sx={{ mb: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                            사용자들의 <GradientText>생생한</GradientText> 후기
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            {
                                name: '김민수',
                                role: '직장인',
                                avatar: '👨‍💼',
                                review: '매일 아침 할인 정보를 받아보니 정말 편해요. 한 달에 평균 10만원 정도 절약하고 있어요!',
                                rating: 5
                            },
                            {
                                name: '박지영',
                                role: '주부',
                                avatar: '👩‍🦱',
                                review: '마트 할인 정보를 놓치지 않게 되어서 장보기가 훨씬 경제적이 되었어요. 추천합니다!',
                                rating: 5
                            },
                            {
                                name: '이준호',
                                role: '대학생',
                                avatar: '👨‍🎓',
                                review: '편의점 할인 정보가 정말 유용해요. 학생에게는 작은 할인도 큰 도움이 됩니다.',
                                rating: 4
                            }
                        ].map((review, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <GlassCard>
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                                <Typography variant="h4" sx={{ mr: 2 }}>
                                                    {review.avatar}
                                                </Typography>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        {review.name}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                                        {review.role}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Box sx={{ display: 'flex', mb: 2 }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        sx={{
                                                            color: i < review.rating ? '#FFA41B' : 'rgba(255,255,255,0.3)',
                                                            fontSize: 20
                                                        }}
                                                    />
                                                ))}
                                            </Box>

                                            <Typography variant="body1" sx={{
                                                color: 'rgba(255,255,255,0.8)',
                                                lineHeight: 1.6,
                                                fontStyle: 'italic'
                                            }}>
                                                "{review.review}"
                                            </Typography>
                                        </CardContent>
                                    </GlassCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
}