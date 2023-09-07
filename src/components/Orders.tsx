import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import BuildIcon from '@mui/icons-material/Build';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import Title from './Title';
import ScrollDialog from './Filter';
import { TextField, Box, Grid, Typography } from '@mui/material';
// import ClearIcon from '@mui/icons-material/Clear';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {

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
  const [filteredLogs, setFilteredLogs] = useState<Log[]>(initialLogData);
  const [searchLogs, setSearchLogs] = useState<Log[]>(initialLogData);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);

  // function to handle the logic of filtering logs
  const handleFilterLogs = () => {
    // iterate over logData
      // on each iteration, check to see if the type of the current index matches anything within filterTypes
        // if yes, then push to filteredLogs (don't actually push, just update state at the end)
        // if logdata includes filtertypes
    setFilteredLogs(logData.filter((log) => filterTypes.includes(log.type)));
  };

  const handleSearchLogs = (e) => {

    const searchTerm : string = e.target.value;

    const temp : Log[] = [];
    const logsToSearch = filteredLogs.length ? filteredLogs : logData;

      for (let i = 0; i < logsToSearch.length; i++) {
        const currentObj = logsToSearch[i];
        for (let key in currentObj) {
          // console.log(key);
          if (key === 'logObject') {
            if (currentObj.logObject.log.includes(searchTerm) || currentObj.logObject.stream.includes(searchTerm)){
              temp.push(currentObj);
              // break;
            }
          } else if (key === 'podInfo') {
            // if (currentObj.podInfo.podName.includes(searchTerm) || currentObj.podInfo.containerName.includes(searchTerm) || currentObj.podInfo.namespace.includes(searchTerm)){
              temp.push(currentObj);
              // console.log('currentObj', currentObj);
              // console.log('errthang', currentObj.podInfo.podName);
              console.log('temp', temp);
              console.log('currentObj', currentObj);
              // break;
            // }
          // } else {
          //   if (currentObj[key].includes(searchTerm))
          //   temp.push(currentObj);
          //   // break;
          // }
          }
        }
      } 
      // console.log('temp', temp);
      setSearchLogs(temp);
      console.log(searchLogs);
  };
  
  const handleClearFilter = () => {
    setFilteredLogs([]);
  };

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
        console.log(newData);
        setLogData(newData); // Use data directly if it's an array
      })
      .catch((err) => console.error('An error occurred in getting logs: ', err));
  }, []);

  return (
    <React.Fragment>
      <Box display="flex" alignItems="center">
        {/* <Typography variant="h6">Your Centralized Kubernetes Logs:</Typography> */}
        <Title>Your Centralized Kubernetes Logs: </Title>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
            <TextField id="standard-basic" onChange={handleSearchLogs} label="Search" variant="standard" sx={{ width: '300px' }}/>
          </Grid>
        </Grid>
        <Grid>
        <ListItemButton >
          <FilterAltOffIcon onClick={handleClearFilter}/>
        </ListItemButton>
        </Grid>
          <Grid item>
              <ScrollDialog handleFilterLogs={handleFilterLogs} filterTypes={filterTypes} setFilterTypes={setFilterTypes}/>
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
      {!filteredLogs.length && !searchLogs.length && (
        <>
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
        </>
      )}
      </TableBody>
        <TableBody>
      {filteredLogs.length && !searchLogs.length && (
        <>
        {filteredLogs.map((row, index) => (
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
        </>
      )}
      </TableBody>  
      <TableBody>
      {searchLogs.length && (
        <>
        {searchLogs.map((row, index) => (
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
        </>
      )}
      </TableBody>
    </Table>
    <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
      See more Logs
    </Link>
  </React.Fragment>
)}