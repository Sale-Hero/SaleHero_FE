import React from 'react';
import {Box, Container, Grid, IconButton, Typography} from '@mui/material';
import {Facebook, Instagram, LinkedIn, Twitter} from '@mui/icons-material';
import {Link as RouterLink} from 'react-router-dom';
import styles from '../../assets/scss/common/footer.module.scss';

export const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'rgba(255, 252, 242, 0.95)',
                backgroundImage: 'linear-gradient(to right, rgba(255, 252, 242, 0.95), rgba(255, 248, 225, 0.95))',
                borderTop: '1px solid rgba(255, 205, 0, 0.3)',
                py: 6
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            About Sale Hero
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#333',
                                lineHeight: 1.6
                            }}
                        >
                            매일 엄선된 할인 정보를 제공하는 Sale Hero가 여러분의 현명한 소비를 돕습니다.
                            특가 세일부터 숨겨진 할인 코드까지, 모든 쇼핑 정보를 한 곳에서 확인하세요.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            Quick Links
                        </Typography>
                        <Box component="ul" sx={{
                            listStyle: 'none',
                            p: 0,
                            m: 0
                        }}>
                            <Box component="li" sx={{ mb: 1 }}>
                                <Box
                                    sx={{
                                        '&:hover': {
                                            '& a': {
                                                color: '#F29727'
                                            }
                                        }
                                    }}
                                >
                                    <RouterLink
                                        to="/contact"
                                        style={{
                                            color: '#333',
                                            textDecoration: 'none',
                                            display: 'block',
                                            paddingTop: '0.5rem',
                                            paddingBottom: '0.5rem',
                                            transition: 'color 0.3s ease'
                                        }}
                                    >
                                        문의하기
                                    </RouterLink>
                                </Box>
                            </Box>
                            <Box component="li" sx={{ mb: 1 }}>
                                <Box
                                    sx={{
                                        '&:hover': {
                                            '& a': {
                                                color: '#F29727'
                                            }
                                        }
                                    }}
                                >
                                    <RouterLink
                                        to="/faq"
                                        style={{
                                            color: '#333',
                                            textDecoration: 'none',
                                            display: 'block',
                                            paddingTop: '0.5rem',
                                            paddingBottom: '0.5rem',
                                            transition: 'color 0.3s ease'
                                        }}
                                    >
                                        자주 묻는 질문
                                    </RouterLink>
                                </Box>
                            </Box>
                            <Box component="li" sx={{ mb: 1 }}>
                                <Box
                                    sx={{
                                        '&:hover': {
                                            '& a': {
                                                color: '#F29727'
                                            }
                                        }
                                    }}
                                >
                                    <RouterLink
                                        to="/terms"
                                        style={{
                                            color: '#333',
                                            textDecoration: 'none',
                                            display: 'block',
                                            paddingTop: '0.5rem',
                                            paddingBottom: '0.5rem',
                                            transition: 'color 0.3s ease'
                                        }}
                                    >
                                        이용약관
                                    </RouterLink>
                                </Box>
                            </Box>
                            <Box component="li" sx={{ mb: 1 }}>
                                <Box
                                    sx={{
                                        '&:hover': {
                                            '& a': {
                                                color: '#F29727'
                                            }
                                        }
                                    }}
                                >
                                    <RouterLink
                                        to="/privacy"
                                        style={{
                                            color: '#333',
                                            textDecoration: 'none',
                                            display: 'block',
                                            paddingTop: '0.5rem',
                                            paddingBottom: '0.5rem',
                                            transition: 'color 0.3s ease'
                                        }}
                                    >
                                        개인정보처리방침
                                    </RouterLink>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            Contact Us
                        </Typography>
                        <Typography
                            variant="body2"
                            paragraph
                            sx={{
                                color: '#333',
                                lineHeight: 1.8
                            }}
                        >
                            Email: contactsalehero@gmail.com<br />
                            Phone: +82 02-987-6543<br />
                            Address: 서울특별시 강남구 삼성로
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <IconButton
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: '#F29727',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 205, 0, 0.1)',
                                        transform: 'translateY(-3px)'
                                    }
                                }}
                            >
                                <Facebook />
                            </IconButton>
                            <IconButton
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: '#F29727',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 205, 0, 0.1)',
                                        transform: 'translateY(-3px)'
                                    }
                                }}
                            >
                                <Twitter />
                            </IconButton>
                            <IconButton
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: '#F29727',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 205, 0, 0.1)',
                                        transform: 'translateY(-3px)'
                                    }
                                }}
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: '#F29727',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 205, 0, 0.1)',
                                        transform: 'translateY(-3px)'
                                    }
                                }}
                            >
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{
                    mt: 6,
                    pt: 3,
                    borderTop: '1px solid rgba(255, 205, 0, 0.3)',
                    textAlign: 'center'
                }}>
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            color: '#333',
                            '& a': {
                                color: '#F29727',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }
                        }}
                    >
                        © {new Date().getFullYear()} Sale Hero. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

// 추가로 아래 SCSS 모듈을 업데이트할 것을 권장합니다:
/*
.footer {
  background-color: rgba(255, 252, 242, 0.95);
  padding: 3rem 0;
  border-top: 1px solid rgba(255, 205, 0, 0.3);
}

.title {
  font-weight: 600;
  margin-bottom: 1.2rem;
}

.description {
  color: #666;
  line-height: 1.6;
}

.linkList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link {
  color: #666;
  text-decoration: none;
  display: block;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: #F29727;
    text-decoration: none;
  }
}

.contactInfo {
  color: #666;
  line-height: 1.8;
}

.socialLinks {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.socialIcon {
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
}

.bottom {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 205, 0, 0.3);
}

.copyright {
  color: #888;
}
*/