import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Box,
  Typography,
  IconButton,
  Slide,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Notifications as NotificationIcon
} from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

interface ToastNotificationsProps {
  notifications: ToastNotification[];
  onClose: (id: string) => void;
  maxNotifications?: number;
}

const ToastNotifications: React.FC<ToastNotificationsProps> = ({
  notifications,
  onClose,
  maxNotifications = 3
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState<ToastNotification[]>([]);

  useEffect(() => {
    // Show notifications with staggered timing
    const showNotification = (notification: ToastNotification, index: number) => {
      setTimeout(() => {
        setVisibleNotifications(prev => [...prev, notification]);
      }, index * 200); // Stagger by 200ms
    };

    // Clear old notifications and show new ones
    setVisibleNotifications([]);
    notifications.slice(0, maxNotifications).forEach((notification, index) => {
      showNotification(notification, index);
    });
  }, [notifications, maxNotifications]);

  const getNotificationIcon = (type: ToastNotification['type']) => {
    switch (type) {
      case 'success':
        return <SuccessIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return <NotificationIcon />;
    }
  };

  const getTransition = (direction: 'left' | 'right' | 'up' | 'down') => {
    return React.forwardRef(function Transition(
      props: TransitionProps & {
        children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>,
    ) {
      return <Slide direction={direction} {...props} ref={ref} />;
    });
  };

  const handleClose = (id: string) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id));
    onClose(id);
  };

  const handleAction = (notification: ToastNotification) => {
    if (notification.action) {
      notification.action.onClick();
      handleClose(notification.id);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        maxWidth: 400
      }}
    >
      {visibleNotifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration || 6000}
          onClose={() => handleClose(notification.id)}
          TransitionComponent={getTransition('left')}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            position: 'static',
            transform: 'none',
            '& .MuiSnackbarContent-root': {
              minWidth: 'auto',
              width: '100%'
            }
          }}
        >
          <Alert
            severity={notification.type}
            icon={notification.icon || getNotificationIcon(notification.type)}
            action={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {notification.action && (
                  <Typography
                    variant="body2"
                    sx={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      '&:hover': { opacity: 0.8 }
                    }}
                    onClick={() => handleAction(notification)}
                  >
                    {notification.action.label}
                  </Typography>
                )}
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => handleClose(notification.id)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            }
            sx={{
              width: '100%',
              boxShadow: 3,
              borderRadius: 2,
              '& .MuiAlert-message': {
                width: '100%'
              }
            }}
          >
            <AlertTitle sx={{ fontWeight: 'bold', mb: 0.5 }}>
              {notification.title}
            </AlertTitle>
            <Typography variant="body2">
              {notification.message}
            </Typography>
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default ToastNotifications; 