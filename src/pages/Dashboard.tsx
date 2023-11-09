import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline,  Box, Toolbar, Container, Grid, Paper, } from '@mui/material';
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
      // navigate to splash page after 1.5 seconds
      setTimeout(() => {navigate('/')}, 1500);
    // else (i.e. JWT token does not exist)
    } else {
      // no token in local storage
      console.log('No token found in local storage');
    }
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

  const initialLogData: Log[] = [];

  const [logData, setLogData] = useState<Log[]>(initialLogData);
  const [numberOfLogs, setNumberOfLogs] = useState(0)

  const onProjectSelect = (projectName : string) => {

    fetch(`/api/logs/${projectName}`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json() as Promise<Log[]>; // Specify the response type as an array of Log
      })
      .then((data) => {
        setLogData(data); // Use data directly if it's an array
        setNumberOfLogs(data.length);
      })
      .catch((err) => console.error('An error occurred in getting logs: ', err));
  };


  const paperStyle = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    height: 800,
    marginBottom: '20px',
    backgroundColor: '#181923',
    overflowX: 'auto',
    position: 'relative',
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <HeaderAndSidebar onProjectSelect={onProjectSelect}/>
        <Box
          component="main"
          sx={{
            // backgroundColor: (theme) =>
            //   theme.palette.mode === 'dark'
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            backgroundColor: '#1A202C',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", color: 'white', }}>
            <Grid container spacing={3}>
              <Grid spacing={3} item xs={12} md={8} lg={9}>
                <Paper sx={paperStyle}>
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
                    backgroundColor: '#181923',
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
                    backgroundColor: '#181923',
                  }}
                >
                  <Health></Health>
                </Paper>
              </Grid>
              <Grid item xs={12} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 600,
                    marginBottom: "20px",
                    backgroundColor: '#181923',
                  }}
                >
                  <Metrics logData={logData} setLogData={setLogData}></Metrics>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
