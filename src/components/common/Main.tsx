import React, {useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import {motion} from 'framer-motion';
import saleHeroIco from '../../assets/img/sale_hero.png';
import {CloudBackground} from './CloudBackground';
import {ParticleBackground} from './ParticleBackground';
import {Discount, Email, NotificationsActive} from '@mui/icons-material';
import {ComponentHelmet} from "../../components/common/ComponentHelmet";
import {ChatBot} from "../../components/common/main/ChatBot";
import {FeatureCard, Logo, StyledDialog, StyledPaper, SubmitButton, TermsBox} from "./hooks/MainStyledComponents";
import {BackgroundAnimationContainer} from "./hooks/MainStyledAnimation";
import {ResponseDTO} from "../../types/common";
import {NewsLetterFrequency, SubscribePostDTO} from "../../types/subscribe";


export default function Main() {
    const [email, setEmail] = useState("");
    const [frequency, setFrequency] = useState<NewsLetterFrequency>(NewsLetterFrequency.WEEKLY_ONCE);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [marketingAgreed, setMarketingAgreed] = useState(false);
    const [openTermsModal, setOpenTermsModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

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

        setOpenTermsModal(true);
    };

    const handleCloseTermsModal = () => {
        setOpenTermsModal(false);
    };

    const handleTermsAgreement = () => {
        setTermsAgreed(!termsAgreed);
    };

    const handleMarketingAgreement = () => {
        setMarketingAgreed(!marketingAgreed);
    };

    const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFrequency(event.target.value as NewsLetterFrequency.WEEKLY_ONCE | NewsLetterFrequency.WEEKLY_FIVE);
    };

    const handleSubmit = async () => {
        if (!termsAgreed) {
            return; // 필수 약관에 동의하지 않았으면 제출 불가
        }

        try {
            // 서버 요청 데이터 준비
            const requestData: SubscribePostDTO = {
                userEmail: email,
                frequency: frequency,
                isMarketingAgreed: marketingAgreed,
            };

            // 구독 API 호출
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            // 응답 오류 처리
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '구독 신청에 실패했습니다.');
            }

            // 성공 처리
            setEmail("");
            setTermsAgreed(false);
            setMarketingAgreed(false);
            setOpenTermsModal(false);
            setOpenSnackbar(true);

        } catch (error) {
            // 오류 처리
            const errorMessage = error instanceof Error ? error.message : '구독 신청 중 오류가 발생했습니다.';
            setError(errorMessage);
            console.error('구독 오류:', error);
        }
    };

    const features = [
        {
            icon: <Discount sx={{ fontSize: 40, color: '#F29727' }}/>,
            title: "오늘의 특가 세일",
            description: "매일 엄선된 다양한 카테고리의 최저가 특가 정보"
        },
        // {
        //     icon: <ShoppingCart sx={{ fontSize: 40, color: '#F29727' }}/>,
        //     title: "쇼핑몰 할인 정보",
        //     description: "인기 쇼핑몰의 할인 행사 및 프로모션 정보 안내"
        // },
        // {
        //     icon: <LocalOffer sx={{ fontSize: 40, color: '#F29727' }}/>,
        //     title: "카테고리별 맞춤 정보",
        //     description: "식품, 생활용품, 가전제품 등 분야별 맞춤 할인 정보"
        // },
        // {
        //     icon: <NotificationsActive sx={{ fontSize: 40, color: '#F29727' }}/>,
        //     title: "놓치면 아쉬운 핫딜",
        //     description: "한정 수량 특가 및 타임세일 빠른 알림 서비스"
        // },
        // {
        //     icon: <PriceCheck sx={{ fontSize: 40, color: '#F29727' }}/>,
        //     title: "정확한 가격 정보",
        //     description: "플랫폼별 가격 비교로 현명한 소비를 돕는 정보 제공"
        // }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 12 },
            background: 'linear-gradient(135deg, #FFF4D2 0%, #FFE8B3 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <ParticleBackground />
            <CloudBackground />

            <BackgroundAnimationContainer />

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

            {/* 약관 동의 모달 */}
            <StyledDialog
                open={openTermsModal}
                onClose={handleCloseTermsModal}
                maxWidth="md"
            >
                <DialogTitle>
                    <Typography variant="h5" fontWeight="bold">구독 약관 동의</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, mb: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#F29727' }}>
                            수신 빈도 선택
                        </Typography>
                        <RadioGroup
                            value={frequency}
                            onChange={handleFrequencyChange}
                            sx={{ mt: 1 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            border: frequency === NewsLetterFrequency.WEEKLY_ONCE
                                                ? '2px solid #F29727'
                                                : '1px solid #ddd',
                                            borderRadius: '10px',
                                            transition: 'all 0.2s ease',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                borderColor: '#F29727',
                                                boxShadow: '0 3px 10px rgba(242, 151, 39, 0.15)',
                                            }
                                        }}
                                        onClick={() => setFrequency(NewsLetterFrequency.WEEKLY_ONCE)}
                                    >
                                        <FormControlLabel
                                            value="WEEKLY_ONCE"
                                            control={<Radio />}
                                            label="주 1회 (토요일)"
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            border: frequency === NewsLetterFrequency.WEEKLY_FIVE
                                                ? '2px solid #F29727'
                                                : '1px solid #ddd',
                                            borderRadius: '10px',
                                            transition: 'all 0.2s ease',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                borderColor: '#F29727',
                                                boxShadow: '0 3px 10px rgba(242, 151, 39, 0.15)',
                                            }
                                        }}
                                        onClick={() => setFrequency(NewsLetterFrequency.WEEKLY_FIVE)}
                                    >
                                        <FormControlLabel
                                            value="WEEKLY_FIVE"
                                            control={<Radio />}
                                            label="주 5회 (월~금)"
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </RadioGroup>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ color: '#F29727' }}>
                        필수 약관 동의
                    </Typography>

                    <TermsBox onClick={handleTermsAgreement}>
                        <Checkbox
                            checked={termsAgreed}
                            onChange={handleTermsAgreement}
                            sx={{
                                color: '#F29727',
                                '&.Mui-checked': {
                                    color: '#F29727',
                                },
                            }}
                        />
                        <Box sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="medium">
                                (필수) 서비스 이용약관 및 개인정보 처리방침에 동의합니다
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                할인 정보 메일을 받기 위해 필요한 개인정보 수집에 동의합니다. 수집된 정보는 메일 전송 목적으로만 사용됩니다.
                            </Typography>
                        </Box>
                    </TermsBox>

                    <TermsBox onClick={handleMarketingAgreement}>
                        <Checkbox
                            checked={marketingAgreed}
                            onChange={handleMarketingAgreement}
                            sx={{
                                color: '#F29727',
                                '&.Mui-checked': {
                                    color: '#F29727',
                                },
                            }}
                        />
                        <Box sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="medium">
                                (선택) 마케팅 및 이벤트 알림 수신에 동의합니다
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                할인 정보 외 이벤트, 프로모션 등의 마케팅 정보를 제공받는 것에 동의합니다.
                            </Typography>
                        </Box>
                    </TermsBox>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center' }}>
                    <Button
                        onClick={handleCloseTermsModal}
                        sx={{
                            borderRadius: '30px',
                            px: 3,
                            mr: 1,
                            color: '#666'
                        }}
                    >
                        취소
                    </Button>
                    <SubmitButton
                        onClick={handleSubmit}
                        disabled={!termsAgreed}
                        startIcon={<Email />}
                        sx={{ px: 4 }}
                    >
                        구독 메일 받기
                    </SubmitButton>
                </DialogActions>
            </StyledDialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    top: '30% !important',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Alert
                    severity="success"
                    sx={{
                        width: 'auto',
                        minWidth: '400px',
                        background: 'linear-gradient(135deg, #FFCD00 0%, #F29727 100%)',
                        color: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(242, 151, 39, 0.2)',
                        fontSize: '1.2rem',
                        padding: '15px 30px',
                        '& .MuiAlert-icon': {
                            fontSize: '2.5rem',
                            color: 'white'
                        },
                        '& .MuiAlert-message': {
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    }}
                >
                    🎉 구독 신청 완료!
                    <br />곧 할인 정보를 받아보실 수 있습니다.
                </Alert>
            </Snackbar>
            <ChatBot/>
            <ComponentHelmet title="Sale Hero - 매일 세상의 모든 할인정보"/>
        </Box>
    );
}