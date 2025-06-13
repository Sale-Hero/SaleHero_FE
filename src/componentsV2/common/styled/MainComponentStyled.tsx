import {styled} from '@mui/material/styles';
import {Box, Button, Paper, Typography} from '@mui/material';
import {motion} from 'framer-motion';

export function MainComponentStyled() {
}

// 모달 관련 스타일 컴포넌트들 추가
export const ModalContent = styled(Paper)`
    background: linear-gradient(135deg, #0F1924 0%, #1D2A3D 100%);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2.5rem;
    outline: none;
    max-width: 600px;
    width: 90%;
    position: relative;
    color: white;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(242, 151, 39, 0.2) 0%, rgba(242, 151, 39, 0) 70%);
        border-radius: 0 0 0 100%;
        z-index: 0;
    }
`;

export const FeatureBox = styled(Box)`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.08);

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-4px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
    }
`;

export const EmailPreview = styled(Box)`
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    color: #333;
    transform: rotate(2deg);
    transition: all 0.3s ease;

    &:hover {
        transform: rotate(0deg) scale(1.02);
    }
`;

// 스타일드 컴포넌트
export const GradientText = styled(Typography)`
    background: linear-gradient(90deg, #F29727 0%, #FFA41B 50%, #FFCD00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
`;

export const GlassCard = styled(motion.div)`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -50%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.1) 50%,
                rgba(255, 255, 255, 0) 100%
        );
        transform: skewX(-25deg);
        transition: all 0.75s ease;
    }

    &:hover::before {
        left: 125%;
    }
`;

export const FloatingBlob = styled(motion.div)`
    position: absolute;
    filter: blur(50px);
    border-radius: 50%;
    z-index: 0;
    mix-blend-mode: lighten;
`;

export const HeroButton = styled(Button)`
    background: linear-gradient(90deg, #F29727 0%, #FFA41B 100%);
    color: white;
    border-radius: 50px;
    padding: 0.8rem 2rem;
    font-weight: 600;
    text-transform: none;
    font-size: 1rem;
    box-shadow: 0 4px 20px rgba(242, 151, 39, 0.3);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(242, 151, 39, 0.4);
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0) 100%
        );
        transform: skewX(-25deg);
        transition: all 0.75s ease;
    }

    &:hover::after {
        left: 125%;
    }
`;

export const HighlightTag = styled(Typography)`
    display: inline-block;
    background: rgba(242, 151, 39, 0.15);
    color: #F29727;
    border-radius: 50px;
    padding: 0.3rem 1rem;
    font-weight: 600;
    font-size: 0.8rem;
    margin-bottom: 1rem;
`;
