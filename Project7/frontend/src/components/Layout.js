import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Snackbar,
  Switch as MuiSwitch,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isDesktop = useMediaQuery('(min-width:900px)');

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleThemeToggle = () => setDarkMode(!darkMode);

  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'Roboto, Arial',
      h6: {
        fontWeight: 600,
      },
    },
  });

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {[{ text: 'Dashboard', path: '/dashboard' }, { text: 'Books', path: '/books' }].map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path} onClick={() => setMobileOpen(false)}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: muiTheme.zIndex.drawer + 1 }}>
          <Toolbar>
            {!isDesktop && (
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Book Review Hub
            </Typography>

            <IconButton color="inherit" onClick={handleThemeToggle}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <MuiSwitch checked={darkMode} onChange={handleThemeToggle} />

            <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
              <Avatar alt="User" src="/user.png" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem disabled>user@example.com</MenuItem>
              <MenuItem component={Link} to="/login">
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Drawer
          variant={isDesktop ? 'permanent' : 'temporary'}
          open={isDesktop || mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {children}
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          message="Feedback message here"
          onClose={() => setSnackbarOpen(false)}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
