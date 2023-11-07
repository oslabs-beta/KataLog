import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { CssBaseline,  Box, Toolbar, List, Typography, Divider, IconButton, Badge, Container, Grid, Paper, Link } from '@mui/material';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface LogsProps {
  logs: Log[];
}

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
const DashboardAsComponent: React.FC<LogsProps> = ({ logs }) => {


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
                  <Chart logData={logs}/>
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
                  <Deposits numberOfLogs={logs.length}/>
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
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DashboardAsComponent;