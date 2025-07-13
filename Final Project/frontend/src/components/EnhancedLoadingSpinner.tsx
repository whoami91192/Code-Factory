import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  LinearProgress,
  Skeleton,
  Card,
  CardContent,
  Grid,
  Fade,
  Zoom
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  LocalPizza as PizzaIcon,
  LunchDining as BurgerIcon,
  RestaurantMenu as SaladIcon,
  LocalCafe as DrinkIcon,
  RestaurantMenu as DessertIcon,
  Timer as TimerIcon,
  Euro as EuroIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

interface LoadingSpinnerProps {
  type?: 'circular' | 'linear' | 'skeleton' | 'food' | 'dots' | 'pulse';
  size?: 'small' | 'medium' | 'large';
  message?: string;
  showProgress?: boolean;
  progress?: number;
  variant?: 'determinate' | 'indeterminate';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const foodLoadingAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-40px) rotate(180deg);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-20px) rotate(270deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0) rotate(360deg);
    opacity: 1;
  }
`;

const dotsAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const EnhancedLoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  type = 'circular',
  size = 'medium',
  message = 'Loading...',
  showProgress = false,
  progress = 0,
  variant = 'indeterminate',
  color = 'primary'
}) => {
  const theme = useTheme();

  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 64;
      default:
        return 40;
    }
  };

  const getFoodIcon = (index: number) => {
    const icons = [PizzaIcon, BurgerIcon, SaladIcon, DrinkIcon, DessertIcon];
    const IconComponent = icons[index % icons.length];
    return <IconComponent />;
  };

  const renderCircularSpinner = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <CircularProgress
        size={getSize()}
        color={color}
        variant={variant}
        value={variant === 'determinate' ? progress : undefined}
        sx={{
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }}
      />
      {message && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {message}
        </Typography>
      )}
      {showProgress && variant === 'determinate' && (
        <Typography variant="caption" color="text.secondary">
          {Math.round(progress)}%
        </Typography>
      )}
    </Box>
  );

  const renderLinearSpinner = () => (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <LinearProgress
        color={color}
        variant={variant}
        value={variant === 'determinate' ? progress : undefined}
        sx={{
          height: 6,
          borderRadius: 3,
          '& .MuiLinearProgress-bar': {
            borderRadius: 3,
          }
        }}
      />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
      {showProgress && variant === 'determinate' && (
        <Typography variant="caption" color="text.secondary">
          {Math.round(progress)}%
        </Typography>
      )}
    </Box>
  );

  const renderSkeletonSpinner = () => (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <Skeleton variant="rectangular" height={120} />
              <CardContent>
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={16} width="60%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {message && (
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );

  const renderFoodSpinner = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box sx={{ position: 'relative', width: 80, height: 80 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `${foodLoadingAnimation} 2s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
              color: theme.palette[color].main,
              fontSize: 24
            }}
          >
            {getFoodIcon(index)}
          </Box>
        ))}
      </Box>
      {message && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {message}
        </Typography>
      )}
      {showProgress && (
        <Box sx={{ width: 200 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={color}
            sx={{ height: 4, borderRadius: 2 }}
          />
          <Typography variant="caption" color="text.secondary" textAlign="center" display="block" sx={{ mt: 1 }}>
            {Math.round(progress)}%
          </Typography>
        </Box>
      )}
    </Box>
  );

  const renderDotsSpinner = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: theme.palette[color].main,
              animation: `${dotsAnimation} 1.4s ease-in-out infinite both`,
              animationDelay: `${index * 0.16}s`
            }}
          />
        ))}
      </Box>
      {message && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {message}
        </Typography>
      )}
    </Box>
  );

  const renderPulseSpinner = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: getSize(),
          height: getSize(),
          borderRadius: '50%',
          bgcolor: theme.palette[color].main,
          animation: `${pulseAnimation} 2s ease-in-out infinite`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}
      >
        <RestaurantIcon />
      </Box>
      {message && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {message}
        </Typography>
      )}
    </Box>
  );

  const renderSpinner = () => {
    switch (type) {
      case 'circular':
        return renderCircularSpinner();
      case 'linear':
        return renderLinearSpinner();
      case 'skeleton':
        return renderSkeletonSpinner();
      case 'food':
        return renderFoodSpinner();
      case 'dots':
        return renderDotsSpinner();
      case 'pulse':
        return renderPulseSpinner();
      default:
        return renderCircularSpinner();
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: size === 'large' ? 200 : 100,
          p: 2
        }}
      >
        {renderSpinner()}
      </Box>
    </Fade>
  );
};

export default EnhancedLoadingSpinner; 