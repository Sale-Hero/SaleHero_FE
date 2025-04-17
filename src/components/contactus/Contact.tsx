import React, {useState} from 'react';
import {Alert, Box, Button, Container, Grid, IconButton, Paper, Snackbar, TextField, Typography} from '@mui/material';
import {AccessTime, Email, LocationOn, Phone, Send,} from '@mui/icons-material';
import {motion} from 'framer-motion';
import {ComponentHelmet} from "../../components/common/ComponentHelmet";
import {InquiryPostDTO} from "../../types/inquiry";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    title: '',
    content: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dto: InquiryPostDTO = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        title: formData.title,
        content: formData.content
      };

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });

      if (!response.ok) {
        throw new Error('서버 에러가 발생했습니다.');
      }

      setSnackbar({
        open: true,
        message: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.',
        severity: 'success',
      });
      resetFormData();

    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : '일시적인 오류가 발생했습니다.\n다시 시도해주세요.',
        severity: 'error',
      });
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      phone_number: '',
      title: '',
      content: '',
    });
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const contactInfo = [
    {
      icon: <Email />,
      title: '이메일',
      content: 'contactsalehero@gmail.com',
      description: '24시간 이내 답변 드리겠습니다',
    },
    {
      icon: <Phone />,
      title: '전화',
      content: '+82 02-987-6543',
      description: '평일 09:00 - 18:00 (한국 시간)',
    },
    {
      icon: <LocationOn />,
      title: '주소',
      content: '서울특별시 강남구 삼성로',
      description: '오피스는 현재 준비중입니다.',
    },
  ];

  return (
      <Box
          sx={{
            minHeight: '100vh',
            py: 8,
            background: 'linear-gradient(135deg, #FFFCF2 0%, #FFF4D2 100%)',
          }}
      >
        <Container maxWidth="lg">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
            >
              문의하기
            </Typography>
            <Typography
                variant="h6"
                sx={{
                  color: '#666',
                  mb: 4,
                }}
            >
              할인 정보에 관한 모든 궁금증, Sale Hero가 해결해드립니다
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 205, 0, 0.3)',
                      boxShadow: '0 8px 20px rgba(242, 151, 39, 0.15)',
                      height: '100%',
                    }}
                >
                  <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: '#F29727',
                      }}
                  >
                    연락처 정보
                  </Typography>

                  {contactInfo.map((info, index) => (
                      <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            mb: 3,
                          }}
                      >
                        <IconButton
                            sx={{
                              bgcolor: 'rgba(255, 205, 0, 0.1)',
                              color: '#F29727',
                              mr: 2,
                              '&:hover': {
                                bgcolor: 'rgba(255, 205, 0, 0.2)',
                              }
                            }}
                        >
                          {info.icon}
                        </IconButton>
                        <Box>
                          <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: '#333',
                              }}
                          >
                            {info.title}
                          </Typography>
                          <Typography
                              variant="body1"
                              sx={{ color: '#333' }}
                          >
                            {info.content}
                          </Typography>
                          <Typography
                              variant="body2"
                              sx={{ color: '#666' }}
                          >
                            {info.description}
                          </Typography>
                        </Box>
                      </Box>
                  ))}

                  <Box
                      sx={{
                        mt: 4,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 205, 0, 0.1)',
                      }}
                  >
                    <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                        }}
                    >
                      <AccessTime sx={{ color: '#F29727', mr: 1 }} />
                      <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: '#333',
                          }}
                      >
                        상담 가능 시간
                      </Typography>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{ color: '#333' }}
                    >
                      평일: 09:00 - 18:00 (한국 시간)<br />
                      점심시간: 12:00 - 13:00<br />
                      주말 및 공휴일: 휴무
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={7}>
              <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 205, 0, 0.3)',
                      boxShadow: '0 8px 20px rgba(242, 151, 39, 0.15)',
                    }}
                >
                  <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: '#F29727',
                      }}
                  >
                    문의하기
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            label="이름"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'rgba(255, 205, 0, 0.5)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#FFCD00',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#F29727',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#F29727',
                              },
                            }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            label="이메일"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'rgba(255, 205, 0, 0.5)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#FFCD00',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#F29727',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#F29727',
                              },
                            }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="연락처"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'rgba(255, 205, 0, 0.5)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#FFCD00',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#F29727',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#F29727',
                              },
                            }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="제목"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'rgba(255, 205, 0, 0.5)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#FFCD00',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#F29727',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#F29727',
                              },
                            }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="문의 내용"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            multiline
                            rows={6}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'rgba(255, 205, 0, 0.5)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#FFCD00',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#F29727',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#F29727',
                              },
                            }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            endIcon={<Send />}
                            sx={{
                              mt: 2,
                              py: 1.5,
                              px: 4,
                              background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                              color: 'white',
                              boxShadow: '0 4px 10px rgba(242, 151, 39, 0.2)',
                              borderRadius: 2,
                              '&:hover': {
                                background: 'linear-gradient(45deg, #E18617 30%, #EFBD00 90%)',
                                boxShadow: '0 6px 12px rgba(242, 151, 39, 0.3)',
                                transform: 'translateY(-2px)'
                              },
                              transition: 'all 0.3s ease'
                            }}
                        >
                          문의하기
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
                onClose={handleCloseSnackbar}
                severity={snackbar.severity}
                sx={{
                  width: '100%',
                  ...(snackbar.severity === 'success' && {
                    background: 'linear-gradient(135deg, #FFCD00 0%, #F29727 100%)',
                    color: 'white',
                    '& .MuiAlert-icon': {
                      color: 'white'
                    }
                  })
                }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

          <ComponentHelmet title={"Sale Hero - 문의하기"} />
        </Container>
      </Box>
  );
};

export default Contact;