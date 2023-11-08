import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
// import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { CssBaseline,  Box, Toolbar, List, Typography, Divider, IconButton, Badge, Container, Grid, Paper, Link } from '@mui/material';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../components/listItems';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Metrics from '../components/Metrics';
import Health from '../components/Health';
import HeaderAndSidebar from '../components/HeaderAndSidebar';


const defaultTheme = createTheme();

export default function Dashboard() {
  // logout functionality:
  const navigate = useNavigate();
  // define a function handleLogout, no params
  const handleLogout = () => {
    // grab JWT token from local storage
    const token = localStorage.getItem('token');
    // if JWT token exists in local storage
    if (token) {
      // remove token from local storage
      localStorage.removeItem('token');
      // navigate to login page after 1.5 seconds
      setTimeout(() => {navigate('/login')}, 1500);
    // else (i.e. JWT token does not exist)
    } else {
      // no token in local storage
      console.log('No token found in local storage');
    }
  }

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  interface Log {
    timestamp: string;
    sourceInfo: string;
    logObject: LogObject;
    podInfo: PodObject;
    type: string;
  }

  interface LogObject {
    log: string;
    stream: string;
  }

  interface PodObject {
    containerName: string;
    namespace: string;
    podName: string;
  }

  const initialLogData: Log[] = [];

  const [logData, setLogData] = useState<Log[]>(initialLogData);
  const [numberOfLogs, setNumberOfLogs] = useState(0)



  const paperStyle = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    height: 800,
    marginBottom: '20px',
    backgroundColor: '#424242',
    overflowX: 'auto',
    position: 'relative',
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              backgroundColor: '#316CE6',
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
              <LogoutIcon onClick={handleLogout}></LogoutIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            {/* <Typography style={{ textAlign: 'left' }}>Main Menu</Typography> */}
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" sx={{}}>
            {mainListItems}
            <Divider sx={{ my: 1,  }} />
            {secondaryListItems}
          </List>
        </Drawer >
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", color: 'white', }}>
            <Grid container spacing={3}>
              {/* *** NODE VISUALIZATION SHOW HERE *** */}
              <Grid spacing={3} item xs={12} md={8} lg={9}>
                <Paper sx={paperStyle}>
                  {/* <div style={lineStyle}></div>
                  <div style={lineStyle2}></div>
                  <div style={lineStyle3}></div> */}
                  <Chart logData={logData}/>
                </Paper>
                  <Container></Container>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                    backgroundColor: '#424242',
                    marginBottom: '30px'
                  }}
                >
                  <Deposits numberOfLogs={numberOfLogs}/>
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 270,
                    backgroundColor: '#424242',
                  }}
                >
                  <Health></Health>
                </Paper>
              </Grid>

              {/* ***** METRICS ***** */}
              <Grid item xs={12} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 600,
                    marginBottom: "20px",
                    backgroundColor: '#424242',
                  }}
                >
                  {/* add component here */}
                  <Metrics></Metrics>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}