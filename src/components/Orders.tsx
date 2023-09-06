import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BuildIcon from '@mui/icons-material/Build';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Title from './Title';
import ScrollDialog from './Filter';
import { TextField, Box, Grid, Typography } from '@mui/material';


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const itemsPerPage = 10;

export default function Orders() {

  // assign a key id?
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
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      fetch('/api/logs')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json() as Promise<Log[]>; // Specify the response type as an array of Log
        })
        .then((data) => {
          // console.log(data);
          const newData = data.slice(0, data.length - 1);
          setLogData(newData); // Use data directly if it's an array
        })
        .catch((err) => console.error('An error occurred in getting logs: ', err));
    }, []);

    const totalPages = Math.ceil(logData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogData = logData.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <React.Fragment>
      <Box display="flex" alignItems="center">
        {/* <Typography variant="h6">Your Centralized Kubernetes Logs:</Typography> */}
        <Title>Your Centralized Kubernetes Logs: </Title>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
            <TextField id="standard-basic" label="Search" variant="standard" sx={{ width: '300px' }}/>
          </Grid>
        </Grid>
          <Grid item>
              <ScrollDialog />
          </Grid>
      </Box>
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>Time Stamp</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Source</TableCell>
        <TableCell>Namespace</TableCell>
        <TableCell>Container</TableCell>
        <TableCell>Pod</TableCell>
        <TableCell>Log</TableCell>
        <TableCell align="left">Stream</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {logData.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.timestamp}</TableCell>
          <TableCell>{row.type}</TableCell>
          <TableCell>{row.sourceInfo}</TableCell>
          <TableCell>{row.podInfo.namespace}</TableCell>
          <TableCell>{row.podInfo.containerName}</TableCell>
          <TableCell>{row.podInfo.podName}</TableCell>
          <TableCell>{row.logObject.log}</TableCell>
          <TableCell align="left" >{row.logObject.stream}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  {/* Pagination controls */}
  <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i + 1);
            }}
            style={{ padding: '4px', cursor: 'pointer', fontWeight: i + 1 === currentPage ? 'bold' : 'normal' }}
          >
            {i + 1}
          </Link>
        ))}
      </Box>
  <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
    See more Logs
  </Link>
</React.Fragment>
  )}