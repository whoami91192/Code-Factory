import React, { Component, ErrorInfo } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
  Report as ReportIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const { error, errorInfo } = this.state;
    const errorDetails = `
Error: ${error?.message}
Stack: ${error?.stack}
Component Stack: ${errorInfo?.componentStack}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}
    `.trim();
    
    // Copy to clipboard
    navigator.clipboard.writeText(errorDetails).then(() => {
      alert('Error details copied to clipboard. Please report this to support.');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = errorDetails;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Error details copied to clipboard. Please report this to support.');
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            
            <Typography variant="h4" gutterBottom component="h1">
              Oops! Something went wrong
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We encountered an unexpected error. Don't worry, our team has been notified.
            </Typography>

            <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
              <AlertTitle>What you can do:</AlertTitle>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>Try refreshing the page</li>
                <li>Go back to the home page</li>
                <li>Clear your browser cache</li>
                <li>Report this error if it persists</li>
              </ul>
            </Alert>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                <AlertTitle>Development Error Details:</AlertTitle>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'action.hover', 
                  borderRadius: 1, 
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  overflow: 'auto',
                  maxHeight: '200px'
                }}>
                  <Typography variant="body2" component="pre" sx={{ margin: 0 }}>
                    {this.state.error.message}
                  </Typography>
                  {this.state.error.stack && (
                    <Typography variant="body2" component="pre" sx={{ margin: 0, mt: 1 }}>
                      {this.state.error.stack}
                    </Typography>
                  )}
                </Box>
              </Alert>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleReset}
                size="large"
              >
                Try Again
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={this.handleGoHome}
                size="large"
              >
                Go Home
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<ReportIcon />}
                onClick={this.handleReportError}
                size="large"
                color="secondary"
              >
                Report Error
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 