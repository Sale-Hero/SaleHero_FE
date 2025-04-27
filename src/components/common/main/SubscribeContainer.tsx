import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {FeatureCard, Logo, StyledPaper} from "./styled/MainStyledComponents";
import saleHeroIco from "../../../assets/img/sale_hero.png";
import {NotificationsActive} from "@mui/icons-material";
import {SubscribeModal} from "./SubscribeModal";
import React, {useState} from "react";
import {useSubscribeFunctions} from "./hooks/useSubscribeFunctions";
import {ResponseDTO} from "../../../types/common";

export function SubscribeContainer() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string>('');
    const [openSubscribeModal, setOpenSubscribeModal] = useState(false)
    const { features } = useSubscribeFunctions();


    const handleOpenTermsModal = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(''); // 이전 오류 초기화

        // 이메일 유효성 검사
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        // 이메일 검증
        if (!email.trim()) {
            setError("이메일을 입력해주세요.");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("올바른 이메일 형식이 아닙니다.");
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/subscribe/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const responseData: ResponseDTO<boolean> = await response.json();
        if (!responseData.data) {
            setError("이미 구독중인 이메일입니다.");
            return;
        }

        setOpenSubscribeModal(true);
    };

    return(
        <>
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box textAlign="center" mb={12}>
                        <Logo src={saleHeroIco} alt="Sale Hero Logo" />
                        <Typography
                            variant="h2"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '2.5rem', md: '3.2rem' },
                                background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            매일 엄선된 알짜 할인정보
                        </Typography>
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                color: '#F29727'
                            }}
                        >
                            이메일로 한번에 받아보세요
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            mb={6}
                            sx={{
                                lineHeight: 1.8,
                                fontSize: { xs: '1.1rem', md: '1.3rem' }
                            }}
                        >
                            무수한 할인 정보 중 진짜 가치 있는 정보만<br />
                            엄격하게 선별하여 매일 아침 정리해 보내드립니다
                        </Typography>
                    </Box>

                    <Grid container spacing={6} justifyContent="center">
                        <Grid item xs={12} md={8}>
                            <StyledPaper elevation={3}>
                                <Box textAlign="center" mb={6}>
                                    <Typography
                                        variant="h4"
                                        gutterBottom
                                        fontWeight="bold"
                                        sx={{ color: '#F29727' }}
                                    >
                                        스마트한 할인 정보 알림 서비스
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        중요한 할인 정보만 골라 시간과 비용을 절약해드립니다
                                    </Typography>
                                </Box>

                                <Grid container spacing={3} sx={{ mb: 6 }}>
                                    {features.map((feature, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                            >
                                                <FeatureCard>
                                                    <Box sx={{
                                                        textAlign: 'center',
                                                        mb: 2,
                                                        '& .MuiSvgIcon-root': {
                                                            transition: 'all 0.3s ease',
                                                            filter: 'drop-shadow(0 3px 5px rgba(242, 151, 39, 0.3))'
                                                        }
                                                    }}>
                                                        {feature.icon}
                                                    </Box>
                                                    <Typography
                                                        variant="h6"
                                                        fontWeight="bold"
                                                        gutterBottom
                                                        sx={{ color: '#333' }}
                                                    >
                                                        {feature.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {feature.description}
                                                    </Typography>
                                                </FeatureCard>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>

                                <form onSubmit={handleOpenTermsModal}>
                                    <Box sx={{position: 'relative'}}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="이메일 주소를 입력하세요"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                setError(''); // 입력 시 오류 메시지 초기화
                                            }}
                                            error={!!error}
                                            sx={{
                                                backgroundColor: 'white',
                                                '& .MuiOutlinedInput-root': {
                                                    height: '60px',
                                                    fontSize: '1.1rem',
                                                    backgroundColor: 'white',
                                                    '& input': {
                                                        backgroundColor: 'white',
                                                    },
                                                    '& fieldset': {
                                                        borderColor: 'rgba(255, 205, 0, 0.5)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#FFCD00',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#F29727',
                                                    },
                                                }
                                            }}
                                        />
                                        {error && (
                                            <Typography
                                                color="error"
                                                variant="body2"
                                                sx={{
                                                    position: 'absolute',
                                                    mt: 1,
                                                    ml: 2,
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {error}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box sx={{display: 'flex', gap: 2, mt: error ? 3 : 2}}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            endIcon={<NotificationsActive/>}
                                            sx={{
                                                background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                                                color: 'white',
                                                marginTop: '20px',
                                                height: '60px',
                                                fontSize: '1.1rem',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #E18617 30%, #EFBD00 90%)',
                                                    boxShadow: '0 4px 8px rgba(242, 151, 39, 0.3)'
                                                }
                                            }}
                                        >
                                            할인 정보 구독하기
                                        </Button>
                                    </Box>
                                </form>
                            </StyledPaper>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>

            <SubscribeModal email={email} setEmail={setEmail}
                            error={error} setError={setError}
                            openSubscribeModal={openSubscribeModal}
                            setOpenSubscribeModal={setOpenSubscribeModal}
            />

        </>
    )
}