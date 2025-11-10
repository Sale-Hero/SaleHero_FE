import React, {useEffect, useRef, useState} from 'react';
import {
    Box, Button, Container, Grid, Typography, useMediaQuery, useTheme, Modal,
    Fade,
    IconButton,
    Tooltip,
    Paper
} from '@mui/material';
import {motion, useScroll, useTransform} from 'framer-motion';
import hero_3d from '../../assets/img/sale_hero_ico_3d.png';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { ChatBot } from 'components/common/main/ChatBot';
import {ComponentHelmet} from "../../components/common/ComponentHelmet";
import {SubscribeContainerV2} from "./SubscribeContainerV2";
import {EmailPreview, FeatureBox, FloatingBlob, GlassCard, GradientText, HeroButton, HighlightTag, ModalContent} from './styled/MainComponentStyled';
import { DealsPreview } from '../deals/DealsPreview';
import { HeroDealHighlight } from './HeroDealHighlight';

export default function MainV2() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const {scrollY} = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 700], [1, 0]);
    const heroY = useTransform(scrollY, [0, 700], [0, 100]);
    // 모달 상태 관리
    const [openModal, setOpenModal] = useState(false);
    const [openSubscribeModal, setOpenSubscribeModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #070B14 0%, #121A2B 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* 3D 배경 효과 */}
            <HeroBackground/>
            <SubscribeContainerV2 open={openSubscribeModal} onClose={() => setOpenSubscribeModal(false)} />

            {/* 메인 히어로 섹션 */}
            <Container maxWidth="lg" sx={{position: 'relative', zIndex: 5, pt: {xs: 10, md: 15}}}>
                <motion.div
                    style={{
                        opacity: heroOpacity,
                        y: heroY
                    }}
                >
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8}}
                            >
                                <HighlightTag>세일 히어로</HighlightTag>
                                <Typography variant="h2" component="h1"
                                            sx={{
                                                fontWeight: 800,
                                                mb: 2,
                                                fontSize: {xs: '2.5rem', md: '2.2rem'},
                                                lineHeight: 1.2
                                            }}
                                >
                                    세상의 <GradientText sx={{
                                    fontWeight: 800,
                                    fontSize: {xs: '3.5rem', md: '3.5rem'},
                                }}>모든 할인</GradientText>을 한눈에
                                </Typography>

                                <Typography variant="h6"
                                            sx={{
                                                color: 'rgba(255,255,255,0.7)',
                                                fontWeight: 400,
                                                mb: 4,
                                                lineHeight: 1.6
                                            }}
                                >
                                    당신이 쇼핑하는 동안, 우리는 최고의 할인을 찾아냅니다.
                                    실시간 가격 추적과 맞춤형 알림으로 스마트한 쇼핑 경험을 시작하세요.
                                </Typography>

                                <Box sx={{display: 'flex', gap: 2, mt: 5, flexWrap: {xs: 'wrap', md: 'nowrap'}}}>
                                    <HeroButton variant="contained" size="large" onClick={() => setOpenSubscribeModal(true)}>
                                        무료로 시작하기
                                    </HeroButton>
                                    <Tooltip
                                        title="클릭하여 세일히어로의 메일 서비스에 대해 알아보세요"
                                        placement="top"
                                        arrow
                                    >
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            onClick={handleOpenModal}  // 이 부분이 변경됨
                                            sx={{
                                                borderRadius: '50px',
                                                padding: '0.8rem 2rem',
                                                textTransform: 'none',
                                                borderColor: 'rgba(255,255,255,0.3)',
                                                color: 'white',
                                                '&:hover': {
                                                    borderColor: 'rgba(255,255,255,0.5)',
                                                    background: 'rgba(255,255,255,0.05)'
                                                }
                                            }}
                                        >
                                            더 알아보기
                                        </Button>
                                    </Tooltip>
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 6,
                                    p: 2,
                                    borderRadius: 2,
                                    background: 'rgba(255,255,255,0.05)'
                                }}>
                                    <Box sx={{display: 'flex'}}>
                                        {['👨‍💼', '👩‍💼', '👨‍💻'].map((emoji, i) => (
                                            <Box key={i} sx={{
                                                ml: i !== 0 ? -1 : 0,
                                                fontSize: '1.5rem',
                                                background: '#121A2B',
                                                borderRadius: '50%',
                                                border: '2px solid rgba(255,255,255,0.1)',
                                                width: 40,
                                                height: 40,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {emoji}
                                            </Box>
                                        ))}
                                    </Box>
                                    <Typography variant="body2" sx={{ml: 2, color: 'rgba(255,255,255,0.7)'}}>
                                        <strong>10,000+</strong> 사용자들이 이미 Sale Hero와 함께 스마트한 쇼핑을 시작했습니다
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.8, delay: 0.2}}
                            >
                                <Box sx={{
                                    position: 'relative',
                                    height: {xs: '300px', md: '500px'},
                                    width: '100%'
                                }}>
                                    {/* 3D 렌더링된 쇼핑 아이템 또는 앱 목업 이미지 */}
                                    <Box
                                        component="img"
                                        src={hero_3d}
                                        alt="Sale Hero App"
                                        sx={{
                                            width: '240px',
                                            height: '240px',
                                            objectFit: 'contain',
                                            borderRadius: '24px',
                                            boxShadow: '0 20px 80px rgba(0,0,0,0.3)',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                    />

                                    {/* 오늘의 핫딜 카드 */}
                                    <Box sx={{ position: 'absolute', top: '20%', right: { xs: '5%', md: '0' }, display: { xs: 'none', md: 'block' } }}>
                                        <HeroDealHighlight />
                                    </Box>

                                    {/* 앱 기능 표시 효과 */}
                                    <Box
                                        component={motion.div}
                                        initial={{opacity: 0, x: 50}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.6, duration: 0.8}}
                                        sx={{
                                            position: 'absolute',
                                            bottom: {xs: '-5%', md: '10%'},
                                            right: {xs: '5%', md: '-10%'},
                                            width: {xs: '70%', md: '50%'},
                                            zIndex: 10
                                        }}
                                    >
                                        <GlassCard>
                                            <Typography variant="h6" fontWeight={600} mb={1}>
                                                💰 다양한 할인 상품
                                            </Typography>
                                            <Typography variant="body2" color="rgba(255,255,255,0.7)">
                                                가전, 식품, 여행, 금융 등 다양한 할인정보를 제공해드립니다.
                                            </Typography>
                                        </GlassCard>
                                    </Box>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </motion.div>

                {/* 브랜드 로고 섹션 (옵션) */}
                <Box sx={{
                    mt: {xs: 10, md: 15},
                    mb: 5,
                    textAlign: 'center',
                    opacity: 0.6,
                    position: 'relative',
                    zIndex: 5
                }}>
                    <Typography variant="subtitle2" sx={{color: 'rgba(255,255,255,0.6)', mb: 3}}>
                        세상의 모든 할인 소식
                    </Typography>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        {['치킨', '마트', '프로모션 소식', '편의점', '행사'].map((brand, index) => (
                            <Grid item key={index}>
                                <Typography variant="h6" sx={{opacity: 0.7}}>
                                    {brand}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>

            {/* 주요 할인 정보 미리보기 섹션 */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5, pb: { xs: 8, md: 12 } }}>
                <DealsPreview />
            </Container>

            {/* 추가 컴포넌트 */}
            {/*<SubscribeContainer />*/}
            <ChatBot />
            <ComponentHelmet title="Sale Hero - 매일 세상의 모든 할인정보" />
            {/* 정보 모달 */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Fade in={openModal}>
                    <ModalContent>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                right: 16,
                                top: 16,
                                color: 'rgba(255,255,255,0.6)',
                                '&:hover': {
                                    color: 'white',
                                    background: 'rgba(255,255,255,0.1)'
                                }
                            }}
                            onClick={handleCloseModal}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Box sx={{ mb: 3 }}>
                            <GradientText
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1
                                }}
                            >
                                세일히어로 알림 서비스
                            </GradientText>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255,255,255,0.7)',
                                    mb: 2
                                }}
                            >
                                원하는 할인 정보를 놓치지 않도록 알림과 이메일로 받아보세요
                            </Typography>
                            <Box
                                sx={{
                                    width: 60,
                                    height: 4,
                                    background: 'linear-gradient(90deg, #F29727 0%, #FFA41B 100%)',
                                    borderRadius: 2,
                                    mb: 4
                                }}
                            />
                        </Box>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} md={4}>
                                <FeatureBox>
                                    <MailOutlineIcon sx={{ color: '#FFA41B', fontSize: 36, mb: 2 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        맞춤형 이메일
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                        관심 카테고리의 할인 정보를 매일 아침 받아보세요
                                    </Typography>
                                </FeatureBox>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FeatureBox>
                                    <NotificationsActiveIcon sx={{ color: '#FFA41B', fontSize: 36, mb: 2 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        실시간 알림
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                        특가 할인과 한정 프로모션을 즉시 알려드립니다
                                    </Typography>
                                </FeatureBox>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FeatureBox>
                                    <LocalOfferIcon sx={{ color: '#FFA41B', fontSize: 36, mb: 2 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        가격 추적
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                        관심 상품의 가격이 내려가면 바로 알려드립니다
                                    </Typography>
                                </FeatureBox>
                            </Grid>
                        </Grid>

                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                            이메일 알림 예시
                        </Typography>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <EmailPreview>
                                {/* 이메일 헤더 */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box
                                        component="img"
                                        src={hero_3d}
                                        alt="Sale Hero"
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            mr: 1.5
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1D2A3D' }}>
                                            세일히어로 일일 할인 정보
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#666' }}>
                                            2025년 5월 20일 화요일
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* 이메일 내용 */}
                                <Typography variant="body1" sx={{ color: '#1D2A3D', fontWeight: 600, mb: 2 }}>
                                    오늘의 추천 할인 정보
                                </Typography>

                                <Box sx={{
                                    p: 2,
                                    background: 'rgba(255, 164, 27, 0.1)',
                                    borderRadius: 2,
                                    mb: 2,
                                    border: '1px solid rgba(255, 164, 27, 0.2)'
                                }}>
                                    <Typography variant="subtitle2" sx={{ color: '#F29727', mb: 1 }}>
                                        BBQ, 대구국제 뮤지컬 페스티벌 외 2건
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        대구국제 뮤지컬 페스티벌 티켓 소지자 한정, 5월 30일까지
                                    </Typography>
                                </Box>

                                {/* 할인 항목들 */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body2" sx={{ color: '#1D2A3D' }}>
                                        <CheckCircleIcon sx={{ fontSize: 16, mr: 0.5, color: 'green' }} />
                                        편의점 할인: CU 아메리카노 1+1
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        ~5/25
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body2" sx={{ color: '#1D2A3D' }}>
                                        <CheckCircleIcon sx={{ fontSize: 16, mr: 0.5, color: 'green' }} />
                                        롯데마트 신선식품 20% 할인
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        ~5/26
                                    </Typography>
                                </Box>

                                {/* 버튼 */}
                                <Box sx={{
                                    textAlign: 'center',
                                    mt: 3,
                                    p: 1.5,
                                    borderRadius: 2,
                                    background: '#F29727',
                                }}>
                                    <Typography variant="button" sx={{ color: 'white', fontWeight: 600 }}>
                                        할인정보 더보기
                                    </Typography>
                                </Box>
                            </EmailPreview>
                        </motion.div>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <HeroButton onClick={() => {
                                handleCloseModal();
                                setOpenSubscribeModal(true);
                            }}>
                                무료로 시작하기
                            </HeroButton>
                        </Box>
                    </ModalContent>
                </Fade>
            </Modal>
        </Box>
    );
}

// 3D 배경 효과 컴포넌트
function HeroBackground() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {/* 그라디언트 블롭 배경 */}
            <FloatingBlob
                sx={{
                    width: {xs: '300px', md: '600px'},
                    height: {xs: '300px', md: '600px'},
                    background: 'radial-gradient(circle, rgba(242,151,39,0.3) 0%, rgba(242,151,39,0) 70%)',
                    top: '-10%',
                    right: '-10%'
                }}
                animate={{
                    x: [0, 20, 0],
                    y: [0, 15, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: 'easeInOut'
                }}
            />

            <FloatingBlob
                sx={{
                    width: {xs: '400px', md: '800px'},
                    height: {xs: '400px', md: '800px'},
                    background: 'radial-gradient(circle, rgba(255,205,0,0.15) 0%, rgba(255,205,0,0) 70%)',
                    bottom: '-20%',
                    left: '-10%'
                }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, 20, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 25,
                    ease: 'easeInOut'
                }}
            />

            {/* 그리드 배경 */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                zIndex: 1,
                opacity: 0.4
            }}/>

            {/* 움직이는 별 입자 */}
            <StarParticles/>

            {/* 흐릿한 라이트 효과 */}
            <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 0%, rgba(242,151,39,0.15) 0%, rgba(0,0,0,0) 50%)',
                zIndex: 2
            }}/>
        </>
    );
}

// 별 같은 입자 효과 컴포넌트
function StarParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 캔버스 크기 설정
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // 별 입자 생성
        interface Star {
            x: number;
            y: number;
            size: number;
            opacity: number;
            speed: number;
        }

        let stars: Star[] = [];

        const createStars = () => {
            stars = [];
            const count = Math.min(window.innerWidth, window.innerHeight) * 0.1;

            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.7 + 0.3,
                    speed: Math.random() * 0.05 + 0.02
                });
            }
        };

        // 별 그리기
        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                // 별 움직임
                star.y += star.speed;

                // 화면 밖으로 나가면 위로 다시 돌리기
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });

            requestAnimationFrame(drawStars);
        };

        window.addEventListener('resize', () => {
            resizeCanvas();
            createStars();
        });

        resizeCanvas();
        createStars();
        drawStars();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <Box
            component="canvas"
            ref={canvasRef}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 3,
                pointerEvents: 'none'
            }}
        />
    );
}
