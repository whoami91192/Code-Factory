import React from 'react';
import { Box, Card, CardContent, Skeleton, Grid, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LoadingSpinnerProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  showProgress = false, 
  progress = 0 
}) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom align="center" color="text.secondary">
        {message}
      </Typography>
      
      {showProgress && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette.primary.main
              }
            }}
          />
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            {Math.round(progress)}%
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Card sx={{ height: '100%' }}>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="40%" height={24} />
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Skeleton variant="rectangular" width={80} height={36} />
                  <Skeleton variant="rectangular" width={80} height={36} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LoadingSpinner; 