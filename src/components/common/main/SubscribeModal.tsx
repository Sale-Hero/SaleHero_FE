import {StyledDialog, SubmitButton, TermsBox} from "./styled/MainStyledComponents";
import {
    Alert,
    Box, Button,
    Checkbox, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    Grid,
    Paper, Snackbar,
    Typography
} from "@mui/material";
import {Email} from "@mui/icons-material";
import React, {useState} from "react";
import {DayOfWeek, SubscribePostDTO} from "../../../types/subscribe";
import {useSubscribeFunctions} from "./hooks/useSubscribeFunctions";

interface Args{
    email: string;
    setEmail: (_: string) => void;
    error: string;
    setError: (_: string) => void
    openSubscribeModal: boolean;
    setOpenSubscribeModal: (_:boolean) => void
}
export function SubscribeModal(
    {email, setEmail, error, setError, openSubscribeModal, setOpenSubscribeModal}
    :Args) {
    const [selectedWeekDays, setSelectedWeekDays] = useState<DayOfWeek[]>([]);
    console.log(selectedWeekDays)
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [marketingAgreed, setMarketingAgreed] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const { getDaysOfWeek} = useSubscribeFunctions();

    const handleCloseTermsModal = () => {
        setOpenSubscribeModal(false);
    };

    const handleTermsAgreement = () => {
        setTermsAgreed(!termsAgreed);
    };

    const handleMarketingAgreement = () => {
        setMarketingAgreed(!marketingAgreed);
    };

    const handleSubmit = async () => {
        if (!termsAgreed) {
            return; // 필수 약관에 동의하지 않았으면 제출 불가
        }

        try {
            // 서버 요청 데이터 준비
            const requestData: SubscribePostDTO = {
                userEmail: email,
                dayOfWeek: selectedWeekDays,
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
            setOpenSubscribeModal(false);
            setOpenSnackbar(true);

        } catch (error) {
            // 오류 처리
            const errorMessage = error instanceof Error ? error.message : '구독 신청 중 오류가 발생했습니다.';
            setError(errorMessage);
            console.error('구독 오류:', error);
        }
    };

    const toggleDay = (day: DayOfWeek) => {
        setSelectedWeekDays(prevDays => {
            // 이미 선택된 요일이면 제거
            if (prevDays.includes(day)) {
                const updated = prevDays.filter(d => d !== day);
                // 최소 1개 이상 유지
                return updated.length > 0 ? updated : prevDays;
            }

            // 새로운 요일 추가 (최대 5개로 제한)
            if (prevDays.length < 5) {
                return [...prevDays, day];
            }

            // 5개 초과시 기존 상태 유지
            return prevDays;
        });
    };

    return(
        <>
            <StyledDialog
                open={openSubscribeModal}
                onClose={handleCloseTermsModal}
                maxWidth="md"
            >
                <DialogTitle>
                    <Typography variant="h5" fontWeight="bold">구독 약관 동의</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, mb: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#F29727' }}>
                            수신 요일 선택 (1~5개)
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                            원하는 요일을 언제든지 변경할 수 있습니다.
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            {getDaysOfWeek().map(({ key, label }) => (
                                <Grid item xs={2.4} key={key}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            textAlign: 'center',
                                            border: selectedWeekDays.includes(key)
                                                ? '2px solid #F29727'
                                                : '1px solid #ccc',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            backgroundColor: selectedWeekDays.includes(key) ? '#fff7ed' : '#fff',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%', // 높이 일정하게
                                            '&:hover': {
                                                boxShadow: '0 3px 10px rgba(242, 151, 39, 0.1)',
                                            }
                                        }}
                                        onClick={() => toggleDay(key)}
                                    >
                                        <FormControlLabel
                                            control={<Checkbox checked={selectedWeekDays.includes(key)} />}
                                            label={label}
                                            sx={{
                                                m: 0,
                                                width: '100%',
                                                '& .MuiFormControlLabel-label': {
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem'
                                                }
                                            }}
                                        />
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
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
        </>
    )
}