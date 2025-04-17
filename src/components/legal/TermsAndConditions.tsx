import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { ComponentHelmet } from "../../components/common/ComponentHelmet";
import { motion } from 'framer-motion';

export const TermsAndConditions: React.FC = () => {
  return (
      <Box sx={{
        minHeight: '100vh',
        py: 8,
        background: 'linear-gradient(135deg, #FFFCF2 0%, #FFF4D2 100%)',
      }}>
        <Container maxWidth="lg">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
                  mb: 4
                }}
            >
              <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    pb: 2,
                    borderBottom: '2px solid rgba(255, 205, 0, 0.3)',
                    background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
              >
                이용약관
              </Typography>
              <Typography
                  variant="body2"
                  sx={{ color: '#666', mb: 4 }}
                  paragraph
              >
                시행일자: 2024년 1월 1일
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F29727',
                      mb: 2
                    }}
                >
                  제1조 (목적)
                </Typography>
                <Typography paragraph sx={{ color: '#333' }}>
                  이 약관은 Sale Hero(이하 "회사")가 제공하는 할인 정보 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F29727',
                      mb: 2
                    }}
                >
                  제2조 (용어의 정의)
                </Typography>
                <Typography sx={{ color: '#333' }} paragraph>
                  1. "서비스"란 회사가 제공하는 모든 서비스를 의미합니다.<br />
                  2. "회원"이란 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 개인 또는 법인을 말합니다.<br />
                  3. "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 설정하고 회사가 승인하는 문자와 숫자의 조합을 말합니다.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F29727',
                      mb: 2
                    }}
                >
                  제3조 (약관의 효력 및 변경)
                </Typography>
                <Typography sx={{ color: '#333' }} paragraph>
                  1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.<br />
                  2. 회사는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.<br />
                  3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 서비스 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F29727',
                      mb: 2
                    }}
                >
                  제4조 (이용계약의 체결)
                </Typography>
                <Typography sx={{ color: '#333' }} paragraph>
                  1. 이용계약은 회원이 되고자 하는 자(이하 "가입신청자")가 약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.<br />
                  2. 회사는 가입신청자의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F29727',
                      mb: 2
                    }}
                >
                  제5조 (서비스의 제공 및 변경)
                </Typography>
                <Typography sx={{ color: '#333' }} paragraph>
                  1. 회사는 다음과 같은 서비스를 제공합니다:<br />
                  - 온라인 쇼핑몰 할인 정보 제공 서비스<br />
                  - 다양한 특가 및 프로모션 정보 제공<br />
                  - 할인 쿠폰 및 프로모션 코드 제공<br />
                  - 이메일 뉴스레터 발송 서비스<br />
                  - 커뮤니티 서비스<br />
                  2. 회사는 서비스의 내용을 변경할 수 있으며, 이 경우 변경된 서비스의 내용 및 제공일자를 명시하여 현재의 서비스 내용을 게시한 곳에 즉시 공지합니다.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F29727',
                      mb: 2
                    }}
                >
                  제6조 (서비스 이용시간)
                </Typography>
                <Typography sx={{ color: '#333' }} paragraph>
                  1. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.<br />
                  2. 회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면에 공지한 바에 따릅니다.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F29727',
                      mb: 2
                    }}
                >
                  제7조 (회원의 의무)
                </Typography>
                <Typography sx={{ color: '#333' }} paragraph>
                  1. 회원은 관계법령, 이 약관의 규정, 이용안내 및 주의사항 등 회사가 통지하는 사항을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안됩니다.<br />
                  2. 회원은 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다:<br />
                  - 다른 회원의 아이디를 부정 사용하는 행위<br />
                  - 서비스에서 얻은 정보를 회사의 사전승낙 없이 복제하거나 출판 및 방송 등에 사용하거나 제3자에게 제공하는 행위<br />
                  - 회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위<br />
                  - 공공질서 및 미풍양속에 위반되는 내용을 유포하는 행위
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F29727',
                      mb: 2
                    }}
                >
                  제8조 (회사의 의무)
                </Typography>
                <Typography sx={{ color: '#333' }} paragraph>
                  1. 회사는 관련법과 이 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여 노력합니다.<br />
                  2. 회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며 개인정보처리방침을 공시하고 준수합니다.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F29727',
                      mb: 2
                    }}
                >
                  제9조 (책임제한)
                </Typography>
                <Typography sx={{ color: '#333' }} paragraph>
                  1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.<br />
                  2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.<br />
                  3. 회사는 제공하는 할인 정보의 정확성, 유효성, 적시성에 대해 보증하지 않으며, 이로 인해 발생하는 손해에 대해 배상책임을 지지 않습니다.
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F29727',
                      mb: 2
                    }}
                >
                  제10조 (준거법 및 재판관할)
                </Typography>
                <Typography sx={{ color: '#333' }} paragraph>
                  1. 이 약관의 해석 및 회사와 회원간의 분쟁에 대하여는 대한민국의 법을 적용합니다.<br />
                  2. 서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 민사소송법상의 관할법원에 제기합니다.
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Container>
        <ComponentHelmet title={"Sale Hero - 이용약관"} />
      </Box>
  );
};

export default TermsAndConditions;