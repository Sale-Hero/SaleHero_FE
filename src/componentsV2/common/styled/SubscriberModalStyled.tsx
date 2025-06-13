import {styled} from "@mui/material/styles";
import {Box, Button, Paper, Typography} from "@mui/material";

export function SubscriberModalStyled() {}

// 스타일드 컴포넌트들
export const ModalContent = styled(Paper)`
   background: linear-gradient(135deg, #0F1924 0%, #1D2A3D 100%);
   border-radius: 24px;
   border: 1px solid rgba(255, 255, 255, 0.1);
   padding: 2.5rem;
   outline: none;
   max-width: 700px;
   width: 90%;
   position: relative;
   color: white;
   overflow: hidden;
   max-height: 90vh;
   overflow-y: auto;

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

export const GradientText = styled(Typography)`
   background: linear-gradient(90deg, #F29727 0%, #FFA41B 50%, #FFCD00 100%);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   background-clip: text;
   display: inline-block;
`;

export const SubmitButton = styled(Button)`
   background: linear-gradient(90deg, #F29727 0%, #FFA41B 100%);
   color: white;
   border-radius: 50px;
   padding: 0.8rem 2rem;
   font-weight: 600;
   text-transform: none;
   font-size: 1rem;
   box-shadow: 0 4px 20px rgba(242, 151, 39, 0.3);
   
   &:hover {
       transform: translateY(-2px);
       box-shadow: 0 6px 25px rgba(242, 151, 39, 0.4);
   }
   
   &:disabled {
       background: rgba(255, 255, 255, 0.2);
       color: rgba(255, 255, 255, 0.5);
   }
`;

export const TermsBox = styled(Box)`
   display: flex;
   align-items: flex-start;
   padding: 1rem;
   border-radius: 12px;
   border: 1px solid rgba(255, 255, 255, 0.1);
   background: rgba(255, 255, 255, 0.05);
   margin: 1rem 0;
   cursor: pointer;
   transition: all 0.2s ease;
   
   &:hover {
       background: rgba(255, 255, 255, 0.08);
       border-color: rgba(242, 151, 39, 0.3);
   }
`;

export const DayBox = styled(Paper)`
   padding: 1rem;
   text-align: center;
   border-radius: 12px;
   cursor: not-allowed;
   background: rgba(255, 255, 255, 0.05);
   border: 1px solid rgba(255, 255, 255, 0.1);
   color: rgba(255, 255, 255, 0.5);
   position: relative;
   
   &.disabled {
       opacity: 0.5;
   }
`;

