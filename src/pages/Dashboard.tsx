import * as React from 'react';
import { useState, } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline,  Box, Toolbar,  Container, Grid, Paper } from '@mui/material';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Metrics from '../components/Metrics';
import Health from '../components/Health';
import HeaderAndSidebar from '../components/HeaderAndSidebar';


const defaultTheme = createTheme();

export default function Dashboard() {

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
        <HeaderAndSidebar/>
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
