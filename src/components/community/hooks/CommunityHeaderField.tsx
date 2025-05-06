import {HeroSection} from "./useCommunityStyles";
import {Box, Typography} from "@mui/material";
import saleHeroLogo from "../../../assets/img/sale_hero_ico.png";
import React from "react";

export function CommunityHeaderField() {
    return(
        <HeroSection>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img src={saleHeroLogo} alt="세일히어로" width="80" />
            </Box>
            <Typography
                variant="h4"
                fontWeight="bold"
                color="#FF6F00"
                gutterBottom
            >
                세일히어로 커뮤니티
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                다양한 할인 정보와 경험을 공유하는 공간입니다
            </Typography>
        </HeroSection>
    )
}