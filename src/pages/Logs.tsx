import * as React from 'react';
import { useState } from 'react';
import { CssBaseline, Box, Toolbar, Container, Grid, Paper } from '@mui/material'
import Orders from '../components/Orders';
import HeaderAndSidebar from '../components/HeaderAndSidebar';


export default function Logs() {

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

    // const [page, setPage] = useState(1);

    const initialLogData: Log[] = [];
    const [logData, setLogData] = useState<Log[]>(initialLogData);
    const [,setNumberOfLogs] = useState(0)

    const onProjectSelect = (projectName : string) => {

      fetch(`/api/logs/${projectName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json() as Promise<Log[]>; // Specify the response type as an array of Log
        })
        .then((data) => {
          // const newData = data.slice(0, data.length - 1);
          setLogData(data); // Use data directly if it's an array
          setNumberOfLogs(data.length);
        })
        .catch((err) => console.error('An error occurred in getting logs: ', err));
    };


  return (
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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#181923' }}>
                  <Orders logData={logData} setLogData={setLogData}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
  );
}
