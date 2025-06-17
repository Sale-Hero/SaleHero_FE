import React, {useState} from 'react';
import {Alert, Fade, IconButton, Modal, Snackbar, CircularProgress} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {ArrowBack} from '@mui/icons-material';
import {ModalContent} from "./styled/SubscriberModalStyled";
import {SubscribeStep} from "../../types/modal";
import {EmailInputStep} from "./subscribemodal/EmailInputStep";
import {VerificationStep} from "./subscribemodal/VerificationStep";
import {ResponseDTO} from "../../types/common";

interface SubscribeContainerV2Props {
    open: boolean;
    onClose: () => void;
}

export function SubscribeContainerV2({ open, onClose }: SubscribeContainerV2Props) {
    const [currentStep, setCurrentStep] = useState(SubscribeStep.EMAIL_INPUT);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [marketingAgreed, setMarketingAgreed] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [remainingTime, setRemainingTime] = useState(180);
    const [isVerified, setIsVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [resendCount, setResendCount] = useState(0);
    const [isSendingEmail, setIsSendingEmail] = useState(false); // 이메일 발송 로딩 상태
    const maxResendCount = 1;

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setCurrentStep(SubscribeStep.EMAIL_INPUT);
        setEmail('');
        setError('');
        setTermsAgreed(false);
        setMarketingAgreed(false);
        setVerificationCode('');
        setRemainingTime(180);
        setIsVerified(false);
        setIsVerifying(false);
        setResendCount(0);
        setVerificationError('');
        setIsSendingEmail(false);
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
            setIsSendingEmail(true); // 로딩 시작

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/mail-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail: email })
            });

            const responseData: ResponseDTO<string> = await response.json();

            if (!responseData.success) {
                setError(responseData.message);
                return;
            }

            setCurrentStep(SubscribeStep.VERIFICATION);
            setRemainingTime(180);

            // 타이머 시작
            const timer = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setCurrentStep(SubscribeStep.EMAIL_INPUT); // 시간 초과시 첫 단계로 복귀
                        setVerificationCode('');
                        return 180;
                    }
                    return prev - 1;
                });
            }, 1000);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '이메일 인증 요청 중 오류가 발생했습니다.';
            console.log(errorMessage);
        } finally {
            setIsSendingEmail(false); // 로딩 종료
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) return;

        setIsVerifying(true);
        setVerificationError('');

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
                const errorMessage = errorData.errorCode?.msg || errorData.message || '인증 코드 확인에 실패했습니다.';
                throw new Error(errorMessage);
            }

            setIsVerified(true);
            setVerificationError('');

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '인증 코드 확인 중 오류가 발생했습니다.';
            setVerificationError(errorMessage);
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
                dayOfWeek: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
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
            setVerificationError(errorMessage);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleResendVerification = async () => {
        if (resendCount >= maxResendCount) {
            setVerificationError('재전송 횟수를 초과했습니다.');
            return;
        }

        try {
            setVerificationError('');
            setIsSendingEmail(true); // 재전송 로딩 시작

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/mail-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail: email })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '이메일 재전송에 실패했습니다.');
            }

            setResendCount(prev => prev + 1);
            setRemainingTime(180);
            setVerificationCode('');

            // 타이머 시작
            const timer = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setCurrentStep(SubscribeStep.EMAIL_INPUT);
                        setVerificationCode('');
                        return 180;
                    }
                    return prev - 1;
                });
            }, 1000);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '이메일 재전송 중 오류가 발생했습니다.';
            setVerificationError(errorMessage);
        } finally {
            setIsSendingEmail(false); // 재전송 로딩 종료
        }
    };

    const handleBackToEmailStep = () => {
        setCurrentStep(SubscribeStep.EMAIL_INPUT);
        setVerificationCode('');
        setVerificationError('');
        setIsVerified(false);
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
                        {/* 로딩 오버레이 */}
                        {isSendingEmail && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1000,
                                    borderRadius: '16px'
                                }}
                            >
                                <div style={{ textAlign: 'center', color: 'white' }}>
                                    <CircularProgress
                                        size={40}
                                        sx={{
                                            color: '#FFCD00',
                                            marginBottom: '16px'
                                        }}
                                    />
                                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        인증 메일을 발송 중입니다...
                                    </div>
                                </div>
                            </div>
                        )}

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

                        {/* 뒤로가기 버튼 (2단계에서만 표시) */}
                        {currentStep === SubscribeStep.VERIFICATION && (
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    left: 16,
                                    top: 16,
                                    color: 'rgba(255,255,255,0.6)',
                                    '&:hover': {
                                        color: 'white',
                                        background: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                                onClick={handleBackToEmailStep}
                            >
                                <ArrowBack />
                            </IconButton>
                        )}

                        {/* 1단계: 이메일 입력 */}
                        {currentStep === SubscribeStep.EMAIL_INPUT && (
                            <EmailInputStep
                                email={email}
                                setEmail={setEmail}
                                error={error}
                                setError={setError}
                                termsAgreed={termsAgreed}
                                setTermsAgreed={setTermsAgreed}
                                marketingAgreed={marketingAgreed}
                                setMarketingAgreed={setMarketingAgreed}
                                onSendVerification={handleSendVerification}
                                isSendingEmail={isSendingEmail} // 로딩 상태 전달
                            />
                        )}

                        {/* 2단계: 인증 코드 입력 */}
                        {currentStep === SubscribeStep.VERIFICATION && (
                            <VerificationStep
                                email={email}
                                verificationCode={verificationCode}
                                setVerificationCode={setVerificationCode}
                                verificationError={verificationError}
                                setVerificationError={setVerificationError}
                                remainingTime={remainingTime}
                                isVerified={isVerified}
                                isVerifying={isVerifying}
                                resendCount={resendCount}
                                maxResendCount={maxResendCount}
                                formatTime={formatTime}
                                onVerifyCode={handleVerifyCode}
                                onResendVerification={handleResendVerification}
                                onSubmit={handleSubmit}
                                isSendingEmail={isSendingEmail} // 재전송 로딩 상태 전달
                            />
                        )}
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
