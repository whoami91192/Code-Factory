import React from 'react';
import { Box, keyframes } from '@mui/material';

interface PulseAnimationProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  scale?: number;
}

const PulseAnimation: React.FC<PulseAnimationProps> = ({ 
  children, 
  duration = 1000, 
  delay = 0, 
  scale = 1.05 
}) => {
  const pulseAnimation = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(${scale});
    }
    100% {
      transform: scale(1);
    }
  `;

  return (
    <Box
      sx={{
        animation: `${pulseAnimation} ${duration}ms ease-in-out ${delay}ms infinite`,
        display: 'inline-block'
      }}
    >
      {children}
    </Box>
  );
};

export default PulseAnimation; 