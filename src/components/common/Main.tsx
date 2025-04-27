import React from 'react';
import {Box} from '@mui/material';
import {ComponentHelmet} from "../../components/common/ComponentHelmet";
import {ChatBot} from "../../components/common/main/ChatBot";
import {SubscribeContainer} from "./main/SubscribeContainer";
import {BackgroundEffects} from "./main/BackgroundEffects";


export default function Main() {

    return (
        <Box sx={{
            minHeight: '100vh',
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 12 },
            background: 'linear-gradient(135deg, #FFF4D2 0%, #FFE8B3 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/*  메인 배경 효과  */}
            <BackgroundEffects />

            {/*  구독 관련 컨테이너  */}
            <SubscribeContainer />

            {/*  챗봇  */}
            <ChatBot/>
            <ComponentHelmet title="Sale Hero - 매일 세상의 모든 할인정보"/>
        </Box>
    );
}