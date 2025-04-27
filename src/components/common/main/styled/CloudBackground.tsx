import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const Cloud = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 40px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  filter: blur(5px);
  opacity: 0.6;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
  }

  &::before {
    width: 50px;
    height: 50px;
    top: -20px;
    left: 15px;
  }

  &::after {
    width: 30px;
    height: 30px;
    top: -10px;
    left: 45px;
  }
`;

const clouds = [
  { top: '10%', left: '-10%', duration: 60 },
  { top: '20%', left: '-15%', duration: 45 },
  { top: '35%', left: '-5%', duration: 55 },
  { top: '50%', left: '-20%', duration: 50 },
  { top: '65%', left: '-8%', duration: 65 },
  { top: '80%', left: '-12%', duration: 40 },
];

export function CloudBackground() {
  return (
    <>
      {clouds.map((cloud, index) => (
        <Cloud
          key={index}
          style={{
            top: cloud.top,
            left: cloud.left,
          }}
          animate={{
            x: ['0vw', '120vw'],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </>
  );
}
