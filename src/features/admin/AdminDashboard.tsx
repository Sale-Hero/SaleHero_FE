import { motion } from 'framer-motion';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
} from '@mui/material';
import { Person, Article, Email } from '@mui/icons-material';
import {useAdminCommonGetter} from "../../features/admin/hooks/useAdminCommonGetter";
import {useEffect} from "react";

export function AdminDashboard() {

    const { getCompanyInfo, currentCount, } = useAdminCommonGetter();

    const statsCards = [
        { icon: Person, label: '전체 사용자', value: currentCount?.userCount, color: '#1976d2' },
        { icon: Article, label: '전체 게시글', value: currentCount?.communityCount, color: '#2e7d32' },
        { icon: Email, label: '전체 메일', value: '9,012', color: '#ed6c02' },
    ];

    useEffect(() => {
        getCompanyInfo();
    }, [getCompanyInfo]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <Container maxWidth="lg">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
            >
                <Typography variant="h4" sx={{ mb: 4 }}>대시보드</Typography>

                <Grid container spacing={3}>
                    {statsCards.map((card, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div variants={item}>
                                <Card>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <card.icon sx={{ fontSize: 40, color: card.color, mr: 2 }} />
                                            <Typography variant="h6" color="text.secondary">
                                                {card.label}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h4" component="div">
                                            {card.value}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <motion.div variants={item}>
                    <Paper sx={{ mt: 4, p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>최근 활동</Typography>
                        <Grid container spacing={2}>
                            {[
                                { text: '새로운 사용자 가입: 홍길동', time: '2분 전' },
                                { text: '새로운 게시글 작성: 안녕하세요', time: '5분 전' },
                                { text: '메일 발송 완료: 공지사항', time: '10분 전' },
                            ].map((activity, index) => (
                                <Grid item xs={12} key={index}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            bgcolor: 'background.default',
                                            '&:hover': { bgcolor: 'action.hover' }
                                        }}
                                    >
                                        <Typography variant="body1">{activity.text}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {activity.time}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </motion.div>
            </motion.div>
        </Container>
    );
}