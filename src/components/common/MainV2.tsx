import React, {useEffect, useRef} from 'react';
import {Box, Button, Container, Grid, Typography, useMediaQuery, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';
import {motion, useScroll, useTransform} from 'framer-motion';
import hero_3d from '../../assets/img/sale_hero_ico_3d.png';

// 스타일드 컴포넌트
const GradientText = styled(Typography)`
  background: linear-gradient(90deg, #F29727 0%, #FFA41B 50%, #FFCD00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: all 0.75s ease;
  }
  
  &:hover::before {
    left: 125%;
  }
`;

const FloatingBlob = styled(motion.div)`
  position: absolute;
  filter: blur(50px);
  border-radius: 50%;
  z-index: 0;
  mix-blend-mode: lighten;
`;

const HeroButton = styled(Button)`
  background: linear-gradient(90deg, #F29727 0%, #FFA41B 100%);
  color: white;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font-weight: 600;
  text-transform: none;
  font-size: 1rem;
  box-shadow: 0 4px 20px rgba(242, 151, 39, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(242, 151, 39, 0.4);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: all 0.75s ease;
  }
  
  &:hover::after {
    left: 125%;
  }
`;

const HighlightTag = styled(Typography)`
  display: inline-block;
  background: rgba(242, 151, 39, 0.15);
  color: #F29727;
  border-radius: 50px;
  padding: 0.3rem 1rem;
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

export default function MainV2() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 700], [1, 0]);
    const heroY = useTransform(scrollY, [0, 700], [0, 100]);

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #070B14 0%, #121A2B 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* 3D 배경 효과 */}
            <HeroBackground />

            {/* 메인 히어로 섹션 */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5, pt: { xs: 10, md: 15 } }}>
                <motion.div
                    style={{
                        opacity: heroOpacity,
                        y: heroY
                    }}
                >
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <HighlightTag>세일 히어로</HighlightTag>
                                <Typography variant="h2" component="h1"
                                            sx={{
                                                fontWeight: 800,
                                                mb: 2,
                                                fontSize: { xs: '2.5rem', md: '2.2rem' },
                                                lineHeight: 1.2
                                            }}
                                >
                                    세상의 <GradientText sx={{
                                        fontWeight: 800,
                                    fontSize: { xs: '3.5rem', md: '3.5rem' },
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

                                <Box sx={{ display: 'flex', gap: 2, mt: 5, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                                    <HeroButton variant="contained" size="large">
                                        무료로 시작하기
                                    </HeroButton>
                                    <Button
                                        variant="outlined"
                                        size="large"
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
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 6,
                                    p: 2,
                                    borderRadius: 2,
                                    background: 'rgba(255,255,255,0.05)'
                                }}>
                                    <Box sx={{ display: 'flex' }}>
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
                                    <Typography variant="body2" sx={{ ml: 2, color: 'rgba(255,255,255,0.7)' }}>
                                        <strong>10,000+</strong> 사용자들이 이미 Sale Hero와 함께 스마트한 쇼핑을 시작했습니다
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <Box sx={{
                                    position: 'relative',
                                    height: { xs: '300px', md: '500px' },
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

                                    {/* 앱 기능 표시 효과 */}
                                    <Box
                                        component={motion.div}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        sx={{
                                            position: 'absolute',
                                            bottom: { xs: '-5%', md: '10%' },
                                            right: { xs: '5%', md: '-10%' },
                                            width: { xs: '70%', md: '50%' },
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
                    mt: { xs: 10, md: 15 },
                    mb: 5,
                    textAlign: 'center',
                    opacity: 0.6,
                    position: 'relative',
                    zIndex: 5
                }}>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
                        세상의 모든 할인 소식
                    </Typography>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        {['치킨', '마트', '프로모션 소식', '편의점', '행사'].map((brand, index) => (
                            <Grid item key={index}>
                                <Typography variant="h6" sx={{ opacity: 0.7 }}>
                                    {brand}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>

            {/* 추가 컴포넌트 */}
            {/*<SubscribeContainer />*/}
            {/*<ChatBot />*/}
            {/*<ComponentHelmet title="Sale Hero - 매일 세상의 모든 할인정보" />*/}
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
                    width: { xs: '300px', md: '600px' },
                    height: { xs: '300px', md: '600px' },
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
                    width: { xs: '400px', md: '800px' },
                    height: { xs: '400px', md: '800px' },
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
            }} />

            {/* 움직이는 별 입자 */}
            <StarParticles />

            {/* 흐릿한 라이트 효과 */}
            <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 0%, rgba(242,151,39,0.15) 0%, rgba(0,0,0,0) 50%)',
                zIndex: 2
            }} />
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