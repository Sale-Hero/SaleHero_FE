import React, { useState } from 'react';
import {
    Modal,
    Fade,
    Paper,
    Box,
    Typography,
    IconButton,
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Divider,
    CircularProgress,
    Alert,
    Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Email, LockClock } from '@mui/icons-material';
import { motion } from 'framer-motion';
import {DayBox, GradientText, ModalContent, SubmitButton} from "./styled/SubscriberModalStyled";
import { TermsBox } from 'components/common/main/styled/MainStyledComponents';
interface SubscribeContainerV2Props {
    open: boolean;
    onClose: () => void;
}

export function SubscribeContainerV2({ open, onClose }: SubscribeContainerV2Props) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [marketingAgreed, setMarketingAgreed] = useState(false);
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [remainingTime, setRemainingTime] = useState(180);
    const [isVerified, setIsVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const weekDays = [
        { key: 'MONDAY', label: '월' },
        { key: 'TUESDAY', label: '화' },
        { key: 'WEDNESDAY', label: '수' },
        { key: 'THURSDAY', label: '목' },
        { key: 'FRIDAY', label: '금' },
        { key: 'SATURDAY', label: '토' },
        { key: 'SUNDAY', label: '일' }
    ];

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setEmail('');
        setError('');
        setTermsAgreed(false);
        setMarketingAgreed(false);
        setIsVerificationSent(false);
        setVerificationCode('');
        setRemainingTime(180);
        setIsVerified(false);
        setIsVerifying(false);
    };

    const handleSendVerification = async () => {
        if (!email.trim()) {
            setError('이메일을 입력해주세요.');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setError('올바른 이메일 형식이 아닙니다.');
            return;
        }

        if (!termsAgreed) {
            setError('필수 약관에 동의해주세요.');
            return;
        }

        try {
            setError('');
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/mail-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail: email })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '이메일 인증 요청에 실패했습니다.');
            }

            setIsVerificationSent(true);
            setRemainingTime(180);

            // 타이머 시작
            const timer = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsVerificationSent(false);
                        setVerificationCode('');
                        return 180;
                    }
                    return prev - 1;
                });
            }, 1000);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '이메일 인증 요청 중 오류가 발생했습니다.';
            setError(errorMessage);
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) return;

        setIsVerifying(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/mail-verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: email,
                    code: verificationCode
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '인증 코드 확인에 실패했습니다.');
            }

            setIsVerified(true);
            setError('');

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '인증 코드 확인 중 오류가 발생했습니다.';
            setError(errorMessage);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleSubmit = async () => {
        if (!termsAgreed || !isVerified) {
            return;
        }

        try {
            const requestData = {
                userEmail: email,
                dayOfWeek: ['MONDAY', 'WEDNESDAY', 'FRIDAY'], // 월수금 고정
                isMarketingAgreed: marketingAgreed,
            };

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '구독 신청에 실패했습니다.');
            }

            resetForm();
            onClose();
            setOpenSnackbar(true);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '구독 신청 중 오류가 발생했습니다.';
            setError(errorMessage);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Fade in={open}>
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
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Box sx={{ mb: 3, zIndex: 1, position: 'relative' }}>
                            <GradientText
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1
                                }}
                            >
                                세일히어로 구독하기
                            </GradientText>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255,255,255,0.7)',
                                    mb: 2
                                }}
                            >
                                매주 월, 수, 금요일에 엄선된 할인 정보를 받아보세요
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

                        {/* 이메일 입력 */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                이메일 주소
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="이메일 주소를 입력하세요"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError('');
                                }}
                                disabled={isVerificationSent}
                                error={!!error}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        '& fieldset': {
                                            borderColor: 'rgba(255, 255, 255, 0.2)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#F29727',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white',
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        opacity: 1,
                                    }
                                }}
                            />
                            {error && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    {error}
                                </Typography>
                            )}
                        </Box>

                        {/* 수신 요일 안내 */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                수신 요일
                            </Typography>
                            <Alert
                                severity="info"
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    '& .MuiAlert-icon': {
                                        color: '#2196f3'
                                    }
                                }}
                            >
                                세일히어로는 매주 <strong>월요일, 수요일, 금요일</strong>에 할인 정보를 전송합니다.
                            </Alert>

                            <Grid container spacing={1}>
                                {weekDays.map(({ key, label }) => {
                                    const isSelected = ['MONDAY', 'WEDNESDAY', 'FRIDAY'].includes(key);
                                    return (
                                        <Grid item xs={12/7} key={key}>
                                            <DayBox
                                                className={!isSelected ? 'disabled' : ''}
                                                sx={{
                                                    backgroundColor: isSelected
                                                        ? 'rgba(242, 151, 39, 0.2)'
                                                        : 'rgba(255, 255, 255, 0.05)',
                                                    borderColor: isSelected
                                                        ? 'rgba(242, 151, 39, 0.5)'
                                                        : 'rgba(255, 255, 255, 0.1)',
                                                    color: isSelected
                                                        ? '#FFA41B'
                                                        : 'rgba(255, 255, 255, 0.5)'
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={isSelected}
                                                            disabled={true}
                                                            sx={{
                                                                color: isSelected ? '#F29727' : 'rgba(255, 255, 255, 0.3)',
                                                                '&.Mui-checked': {
                                                                    color: '#F29727',
                                                                },
                                                                '&.Mui-disabled': {
                                                                    color: isSelected ? '#F29727' : 'rgba(255, 255, 255, 0.3)',
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={label}
                                                    sx={{
                                                        m: 0,
                                                        '& .MuiFormControlLabel-label': {
                                                            fontWeight: 'bold',
                                                            fontSize: '0.9rem',
                                                            color: isSelected ? '#FFA41B' : 'rgba(255, 255, 255, 0.5)',
                                                            '&.Mui-disabled': {
                                                                color: isSelected ? '#FFA41B' : 'rgba(255, 255, 255, 0.5)',
                                                            }
                                                        }
                                                    }}
                                                />
                                            </DayBox>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>

                        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                        {/* 약관 동의 */}
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            약관 동의
                        </Typography>

                        <TermsBox onClick={() => !isVerificationSent && setTermsAgreed(!termsAgreed)}>
                            <Checkbox
                                checked={termsAgreed}
                                onChange={(e) => setTermsAgreed(e.target.checked)}
                                disabled={isVerificationSent}
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
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
                                    할인 정보 메일을 받기 위해 필요한 개인정보 수집에 동의합니다.
                                </Typography>
                            </Box>
                        </TermsBox>

                        <TermsBox onClick={() => !isVerificationSent && setMarketingAgreed(!marketingAgreed)}>
                            <Checkbox
                                checked={marketingAgreed}
                                onChange={(e) => setMarketingAgreed(e.target.checked)}
                                disabled={isVerificationSent}
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
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
                                    할인 정보 외 이벤트, 프로모션 등의 마케팅 정보를 제공받습니다.
                                </Typography>
                            </Box>
                        </TermsBox>

                        {/* 인증 코드 입력 */}
                        {isVerificationSent && !isVerified && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Box sx={{
                                    mt: 3,
                                    p: 2,
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <LockClock sx={{ mr: 1, color: '#F29727' }} />
                                        이메일 인증 코드 입력
                                        <Typography variant="body2" color="error" sx={{ ml: 2 }}>
                                            남은 시간: {formatTime(remainingTime)}
                                        </Typography>
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <TextField
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            placeholder="인증 코드 6자리 입력"
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    color: 'white',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#F29727',
                                                    },
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: 'white',
                                                },
                                                '& .MuiInputBase-input::placeholder': {
                                                    color: 'rgba(255, 255, 255, 0.5)',
                                                    opacity: 1,
                                                }
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleVerifyCode}
                                            disabled={!verificationCode || isVerifying}
                                            sx={{
                                                bgcolor: '#F29727',
                                                '&:hover': { bgcolor: '#e08a24' },
                                                minWidth: '100px'
                                            }}
                                        >
                                            {isVerifying ? <CircularProgress size={24} color="inherit" /> : '확인'}
                                        </Button>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
                                        * 입력하신 이메일로 전송된 인증 코드를 입력해주세요.
                                    </Typography>
                                </Box>
                            </motion.div>
                        )}

                        {/* 버튼 */}
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            {!isVerificationSent ? (
                                <SubmitButton
                                    onClick={handleSendVerification}
                                    disabled={!termsAgreed || !email.trim()}
                                    startIcon={<Email />}
                                    fullWidth
                                >
                                    메일 인증하기
                                </SubmitButton>
                            ) : isVerified ? (
                                <SubmitButton
                                    onClick={handleSubmit}
                                    startIcon={<Email />}
                                    fullWidth
                                >
                                    구독 시작하기
                                </SubmitButton>
                            ) : (
                                <SubmitButton
                                    disabled={true}
                                    startIcon={<Email />}
                                    fullWidth
                                >
                                    인증 대기 중
                                </SubmitButton>
                            )}
                        </Box>
                    </ModalContent>
                </Fade>
            </Modal>

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
                    <br />매주 월, 수, 금요일에 할인 정보를 받아보실 수 있습니다.
                </Alert>
            </Snackbar>
        </>
    );
}
