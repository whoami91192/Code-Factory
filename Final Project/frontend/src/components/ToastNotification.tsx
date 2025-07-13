import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { Slide, SlideProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ToastNotificationProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 3000
}) => {
  const theme = useTheme();
  
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
      sx={{
        '& .MuiAlert-root': {
          borderRadius: 2,
          boxShadow: `0 4px 20px ${theme.palette.primary.main}30`,
        }
      }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ 
          width: '100%',
          fontWeight: 500,
          '& .MuiAlert-icon': {
            fontSize: 20
          }
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification; 