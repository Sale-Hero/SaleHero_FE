import {AppBar, Box, Button, ListItemButton, MenuItem, styled, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export function HeaderAndFooterStyled() {}


// 스타일드 컴포넌트
export const GradientText = styled(Typography)`
  background: linear-gradient(90deg, #F29727 0%, #FFCD00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
`;

export const FooterLink = styled(RouterLink)`
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

// ㅡㅡㅡㅡㅡㅡ 위 기존 푸터 / 아래 헤더


// 스타일 컴포넌트 정의
export const GlassAppBar = styled(AppBar)(({ theme }) => ({
    background: 'rgba(7, 11, 20, 0.8)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

interface GradientButtonProps {
    component?: React.ElementType;
    [key: string]: any;
}

export const HeaderGradientButton = styled(Button)<GradientButtonProps>(({ theme }) => ({
    background: 'linear-gradient(90deg, #F29727 0%, #FFA41B 100%)',
    color: 'white',
    borderRadius: '50px',
    padding: '8px 24px',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 20px rgba(242, 151, 39, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 25px rgba(242, 151, 39, 0.4)',
        background: 'linear-gradient(90deg, #F29727 0%, #FFCD00 100%)',
    }
}));

interface GlassCardProps {
    component?: React.ElementType;
    [key: string]: any;
}

export const GlassCard = styled(Box)<GlassCardProps>(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
}));

export const HeaderGradientText = styled(Typography)`
    background: linear-gradient(90deg, #F29727 0%, #FFCD00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
`;

export const NavButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>(({ theme, active }) => ({
    color: active ? '#FFA41B' : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '8px 16px',
    marginLeft: '8px',
    marginRight: '8px',
    fontWeight: active ? 600 : 500,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(242, 151, 39, 0.15)',
        color: '#FFCD00',
        '& .MuiSvgIcon-root': {
            color: '#FFCD00',
        },
        '&::after': {
            transform: 'scaleX(1)',
        }
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, #F29727 0%, #FFCD00 100%)',
        transform: active ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'bottom left',
        transition: 'transform 0.3s ease',
    },
    '& .MuiSvgIcon-root': {
        color: active ? '#FFA41B' : 'rgba(255, 255, 255, 0.6)',
        transition: 'color 0.2s ease',
        marginRight: '6px',
    },
}));

export const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
    padding: '10px 16px',
    margin: '4px 8px',
    borderRadius: '8px',
    '&:hover': {
        background: 'rgba(242, 151, 39, 0.15)',
    },
}));

export const DrawerItemButton = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>(({ theme, active }) => ({
    padding: '12px 16px',
    borderRadius: '12px',
    margin: '8px 12px',
    marginBottom: '8px',
    '&:hover': {
        background: 'rgba(242, 151, 39, 0.15)',
        color: '#FFCD00',
        '& .MuiListItemIcon-root': {
            color: '#FFCD00',
        }
    },
    ...(active && {
        background: 'rgba(242, 151, 39, 0.2)',
        color: '#FFCD00',
        '& .MuiListItemIcon-root': {
            color: '#FFCD00',
        }
    })
}));
