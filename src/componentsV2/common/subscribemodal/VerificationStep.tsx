import {motion} from "framer-motion";

import {Box, Button, CircularProgress, TextField, Typography} from '@mui/material';
import {Email, LockClock} from '@mui/icons-material';
import {GradientText, SubmitButton} from "../styled/SubscriberModalStyled";

interface Args {
    email: string,
    verificationCode: string;
    setVerificationCode: (_:string)=> void;
    verificationError:string,
    setVerificationError: (_:string) => void,
    remainingTime: number;
    isVerified: boolean;
    isVerifying: boolean;
    resendCount: number;
    maxResendCount: number;
    formatTime: (seconds: number) => string
    onVerifyCode: () => void
    onResendVerification: () => void
    onSubmit: () => void
}

export function VerificationStep(
    {email,verificationCode,setVerificationCode,verificationError, setVerificationError,remainingTime,
        isVerified,isVerifying, resendCount, maxResendCount, formatTime,
        onVerifyCode, onResendVerification,onSubmit}: Args) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Box sx={{ mb: 3, zIndex: 1, position: 'relative' }}>
                <GradientText
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 1
                    }}
                >
                    이메일 인증
                </GradientText>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'rgba(255,255,255,0.7)',
                        mb: 1
                    }}
                >
                    <strong>{email}</strong>로 전송된 인증 코드를 입력해주세요
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'rgba(255,255,255,0.5)',
                        mb: 2
                    }}
                >
                    스팸 메일함도 확인해보세요
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

            {!isVerified ? (
                <>
                    {/* 인증 코드 입력 */}
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                <LockClock sx={{ mr: 1, color: '#F29727' }} />
                                인증 코드
                            </Typography>
                            <Typography variant="body2" color="error">
                                남은 시간: {formatTime(remainingTime)}
                            </Typography>
                        </Box>

                        <TextField
                            value={verificationCode}
                            onChange={(e) => {
                                setVerificationCode(e.target.value);
                                setVerificationError('');
                            }}
                            placeholder="인증 코드 6자리 입력"
                            fullWidth
                            variant="outlined"
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
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
                                    textAlign: 'center',
                                    letterSpacing: '0.3em'
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    opacity: 1,
                                }
                            }}
                        />

                        {verificationError && (
                            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                                {verificationError}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            onClick={onVerifyCode}
                            disabled={!verificationCode || isVerifying}
                            fullWidth
                            sx={{
                                bgcolor: '#F29727',
                                '&:hover': { bgcolor: '#e08a24' },
                                py: 1.5,
                                mb: 2
                            }}
                        >
                            {isVerifying ? <CircularProgress size={24} color="inherit" /> : '인증 확인'}
                        </Button>

                        {/* 재전송 */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                                메일이 도착하지 않았나요?
                            </Typography>
                            <Button
                                onClick={onResendVerification}
                                disabled={resendCount >= maxResendCount}
                                sx={{
                                    color: '#F29727',
                                    fontSize: '0.9rem',
                                    '&:hover': {
                                        backgroundColor: 'rgba(242, 151, 39, 0.1)'
                                    },
                                    '&.Mui-disabled': {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    }
                                }}
                            >
                                {resendCount >= maxResendCount ? '재전송 완료' : '다시 보내기'}
                            </Button>
                        </Box>
                    </Box>
                </>
            ) : (
                <>
                    {/* 인증 완료 */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: 'rgba(76, 175, 80, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2
                        }}>
                            <Typography sx={{ fontSize: '2rem' }}>✅</Typography>
                        </Box>
                        <Typography variant="h6" sx={{ color: '#4CAF50', mb: 1 }}>
                            인증이 완료되었습니다!
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            이제 구독을 시작할 수 있습니다
                        </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <SubmitButton
                            onClick={onSubmit}
                            startIcon={<Email />}
                            fullWidth
                        >
                            구독 시작하기
                        </SubmitButton>
                    </Box>
                </>
            )}
        </motion.div>
    );
}
