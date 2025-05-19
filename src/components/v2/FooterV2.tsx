import React from 'react';
import { Box, Container, Grid, IconButton, Typography, alpha, styled } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// 스타일드 컴포넌트
const GradientText = styled(Typography)`
  background: linear-gradient(90deg, #F29727 0%, #FFCD00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
`;

const FooterLink = styled(RouterLink)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: block;
  padding: 0.6rem 0;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 400;
  font-size: 0.95rem;
  
  &:hover {
    color: #FFCD00;
    transform: translateX(4px);
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, #F29727 0%, rgba(255, 205, 0, 0) 100%);
    transition: width 0.3s ease;
  }
  
  &:hover::before {
    width: 100%;
  }
`;

interface commonProps {
    component?: React.ElementType;
    [key: string]: any;
}

const SocialButton = styled(IconButton)<commonProps>`
  color: #F29727;
  background: rgba(242, 151, 39, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(242, 151, 39, 0.2);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 15px rgba(242, 151, 39, 0.2);
  }
`;

export const FooterV2: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'rgba(7, 11, 20, 0.9)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                py: 8,
                position: 'relative',
                overflow: 'hidden',
                color: 'white'
            }}
        >
            {/* 배경 장식 블롭 */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(242,151,39,0.05) 0%, rgba(242,151,39,0) 70%)',
                    top: '-250px',
                    right: '-100px',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,205,0,0.03) 0%, rgba(255,205,0,0) 70%)',
                    bottom: '-200px',
                    left: '-100px',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <GradientText
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    fontSize: '1.5rem',
                                    letterSpacing: '0.02em',
                                }}
                            >
                                About Sale Hero
                            </GradientText>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    lineHeight: 1.8,
                                    mb: 3,
                                    fontSize: '0.95rem',
                                    maxWidth: '90%'
                                }}
                            >
                                매일 엄선된 할인 정보를 제공하는 Sale Hero가 여러분의 현명한 소비를 돕습니다.
                                특가 세일부터 숨겨진 할인 코드까지, 모든 쇼핑 정보를 한 곳에서 확인하세요.
                            </Typography>

                            <Box
                                sx={{
                                    mt: 4,
                                    display: 'inline-block',
                                    py: 1.5,
                                    px: 2.5,
                                    backgroundColor: 'rgba(242, 151, 39, 0.1)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(242, 151, 39, 0.2)',
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: '#FFCD00',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        letterSpacing: '0.05em'
                                    }}
                                >
                                    🛍️ SMART SHOPPING STARTS HERE
                                </Typography>
                            </Box>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <GradientText
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    fontSize: '1.5rem',
                                    letterSpacing: '0.02em',
                                }}
                            >
                                Quick Links
                            </GradientText>
                            <Box component="ul" sx={{
                                listStyle: 'none',
                                p: 0,
                                m: 0
                            }}>
                                <Box component="li">
                                    <FooterLink to="/contact">
                                        문의하기
                                    </FooterLink>
                                </Box>
                                <Box component="li">
                                    <FooterLink to="/faq">
                                        자주 묻는 질문
                                    </FooterLink>
                                </Box>
                                <Box component="li">
                                    <FooterLink to="/terms">
                                        이용약관
                                    </FooterLink>
                                </Box>
                                <Box component="li">
                                    <FooterLink to="/privacy">
                                        개인정보처리방침
                                    </FooterLink>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <GradientText
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    fontSize: '1.5rem',
                                    letterSpacing: '0.02em',
                                }}
                            >
                                Contact Us
                            </GradientText>
                            <Box
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '16px',
                                    p: 2.5,
                                    mb: 3,
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        lineHeight: 2,
                                        fontSize: '0.95rem',
                                        '& strong': {
                                            color: '#FFCD00',
                                            fontWeight: 600
                                        }
                                    }}
                                >
                                    <strong>Email:</strong> contactsalehero@gmail.com<br />
                                    <strong>Phone:</strong> +82 02-987-6543<br />
                                    <strong>Address:</strong> 서울특별시 강남구 삼성로
                                </Typography>
                            </Box>

                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    mb: 2,
                                    fontSize: '0.85rem',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                FOLLOW US
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <SocialButton
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    component={motion.button}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Facebook />
                                </SocialButton>
                                <SocialButton
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    component={motion.button}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Twitter />
                                </SocialButton>
                                <SocialButton
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    component={motion.button}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Instagram />
                                </SocialButton>
                                <SocialButton
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    component={motion.button}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <LinkedIn />
                                </SocialButton>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>

                <Box sx={{
                    mt: 8,
                    pt: 3,
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '0.9rem',
                            letterSpacing: '0.03em'
                        }}
                    >
                        © {new Date().getFullYear()} <Box component="span" sx={{ color: '#F29727', fontWeight: 600 }}>Sale Hero</Box>. All rights reserved.
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '0.85rem',
                            mt: { xs: 2, sm: 0 }
                        }}
                    >
                        Made with <Box component="span" sx={{ color: '#F29727' }}>❤</Box> in Seoul, South Korea
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};