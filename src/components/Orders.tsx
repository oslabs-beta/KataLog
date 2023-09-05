import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {

  // assign a key id?
  interface Log {
    timestamp: string;
    sourceInfo: string;
    logObject: LogObject;
  }
  
  interface LogObject {
    log: string;
    stream: string;
  }
  
  const initialLogData: Log[] = [];
  
    const [logData, setLogData] = useState<Log[]>(initialLogData);
  
    useEffect(() => {
      fetch('/api/logs')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json() as Promise<Log[]>; // Specify the response type as an array of Log
        })
        .then((data) => {
          const newData = data.slice(0, data.length - 1);
          setLogData(newData); // Use data directly if it's an array
        })
        .catch((err) => console.error('An error occurred in getting logs: ', err));
    }, []);



  return (
    <React.Fragment>
  <Title>Your Centralized Kubernetes Logs:</Title>
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>Time Stamp</TableCell>
        <TableCell>Source</TableCell>
        <TableCell align="left">Log</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {logData.map((row) => (
        <TableRow key={row.timestamp}>
          <TableCell>{row.timestamp}</TableCell>
          <TableCell>{row.sourceInfo}</TableCell>
          <TableCell align="left" >{row.logObject.log}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
    See more Logs
  </Link>
</React.Fragment>
  )}