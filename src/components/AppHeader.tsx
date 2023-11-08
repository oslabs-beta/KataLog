import React from 'react';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Logout as LogoutIcon } from '@mui/icons-material';

interface AppHeaderProps {
  open: boolean;
  toggleDrawer: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ open, toggleDrawer }) => {
  return (
    <AppBar position="absolute">
      <Toolbar
        sx={{
          pr: '24px',
          backgroundColor: 'green',
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          KataLog
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
