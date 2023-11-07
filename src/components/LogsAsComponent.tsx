import * as React from 'react';
import { Box, createTheme, ThemeProvider, CssBaseline, Container, Grid, Paper } from '@mui/material';
import Orders from './Orders';

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

console.log('inside logsascomponent...');

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const LogsAsComponent: React.FC<LogsProps> = ({ logs }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", color: 'white', }}>
          <Grid container spacing={3}>
            {/* *** CENTRALIZED LOGS SHOW HERE *** */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#424242' }}>
                <Orders logData={logs} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LogsAsComponent;
