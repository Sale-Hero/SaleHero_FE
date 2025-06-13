import {motion} from "framer-motion";

import {Alert, Box, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography} from '@mui/material';
import {Email} from '@mui/icons-material';
import {TermsBox} from 'components/common/main/styled/MainStyledComponents';
import {DayBox, GradientText, SubmitButton} from "../styled/SubscriberModalStyled";
import {weekDays} from "../../../util/etcUtil";

interface Args {
    email: string,
    setEmail: (_:string) => void,
    error:string,
    setError: (_:string) => void,
    termsAgreed: boolean,
    setTermsAgreed: (_:boolean) => void,
    marketingAgreed: boolean,
    setMarketingAgreed: (_:boolean) => void,
    onSendVerification: () => void
}

export function EmailInputStep(
    {
        email, setEmail, error, setError, termsAgreed, setTermsAgreed,
        marketingAgreed, setMarketingAgreed, onSendVerification
    }: Args) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
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
                    {weekDays.map(({key, label}) => {
                        const isSelected = ['MONDAY', 'WEDNESDAY', 'FRIDAY'].includes(key);
                        return (
                            <Grid item xs={12 / 7} key={key}>
                                <DayBox>
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
                                    >
                                </FormControlLabel>
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

            <TermsBox onClick={() => setTermsAgreed(!termsAgreed)}>
                <Checkbox
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
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

            <TermsBox onClick={() => setMarketingAgreed(!marketingAgreed)}>
                <Checkbox
                    checked={marketingAgreed}
                    onChange={(e) => setMarketingAgreed(e.target.checked)}
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

            {/* 버튼 */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <SubmitButton
                    onClick={onSendVerification}
                    disabled={!termsAgreed || !email.trim()}
                    startIcon={<Email />}
                    fullWidth
                >
                    메일 인증하기
                </SubmitButton>
            </Box>
        </motion.div>
    );
}
