import * as React from 'react';
import { useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ListItemButton from '@mui/material/ListItemButton';
import ScrollDialog from './Filter';
import { TextField, Box, Grid, Typography, Pagination, Stack, Paper } from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import NestedRowData from './NestedRowData';



function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders(props) {

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
  const itemsPerPage = 15; // Number of items to display per page
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const [logData, setLogData] = useState<Log[]>(initialLogData);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>(initialLogData);
  const [searchLogs, setSearchLogs] = useState<Log[]>(initialLogData);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');


  // function to handle the logic of filtering logs
  const handleFilterLogs = () => {
    // iterate over logData
    // on each iteration, check to see if the type of the current index matches anything within filterTypes
    // if yes, then push to filteredLogs (don't actually push, just update state at the end)
    // if logdata includes filtertypes
    setFilteredLogs(props.logData.filter((log) => filterTypes.includes(log.type)));
  };

  const handleSearchLogs = (e: { target: { value: string; }; }) => {

    setSearchTerm(e.target.value);

    const temp : Log[] = [];

    // search filtered logs if they exist, otherwise search through all logs. (passed in log data)
    const logsToSearch = filteredLogs.length ? filteredLogs : props.logData;

      for (let i = 0; i < logsToSearch.length; i++) {
        const currentObj = logsToSearch[i];
        for (let key in currentObj) {
          if (key === 'logObject') {
            if (currentObj.logObject.log.log.includes(searchTerm) || currentObj.logObject.stream.includes(searchTerm)){
              temp.push(currentObj);
              break;
            }
          } else if (key === 'podInfo' && currentObj.type === 'pod') {
            if (currentObj.podInfo.podName.includes(searchTerm) || currentObj.podInfo.containerName.includes(searchTerm) || currentObj.podInfo.namespace.includes(searchTerm)) {
              temp.push(currentObj);
              break;
            }
          } else {
            if (key !== 'podInfo' ) {
              if (typeof currentObj[key]  === 'string')
              if (currentObj[key].includes(searchTerm)) {
                temp.push(currentObj);
                break;
              }
            }
          }
        }
      }
      setSearchLogs(temp);
    }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    }
  const handleClearFilter = () => {
    setFilteredLogs([]);
    setFilterTypes([]);
    setSearchLogs([]);
    setSearchTerm('');
    let text : any = document.getElementById("standard-basic");
    text.value = '';
  };

    // if there is search text, set returned logs to be search logs.
    // if there is a filter and no search logs, set returned logs to be filtered logs.
    // if theres neither, set returned logs to be all logs.
    const returnedLogs = searchTerm ? searchLogs :
                          filterTypes.length > 0 && !searchTerm ? filteredLogs : props.logData;
                          // filterTypes.length === 0 && text ? searchLogs : props.logData;
    const displayedLogs = returnedLogs.slice(startIndex, endIndex);

  return (
    <React.Fragment>
      <Box display="flex" alignItems="center">
        {/* <Typography variant="h6">Your Centralized Kubernetes Logs:</Typography> */}
        <Typography variant="h6" color="white" fontWeight="bold" marginBottom={3}>
          Your Centralized Kubernetes Logs:
        </Typography>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
            <TextField id="standard-basic"
              onChange={handleSearchLogs}
              label="Search"
              variant="standard"
              sx={{
                width: '300px',
                '& .MuiInputBase-root': {
                  color: 'white',          // Text color
                  borderColor: 'white',   // Border color
                  '&:focus': {
                    borderColor: 'white', // Border color when focused
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'white',          // Label color
                  '&.Mui-focused': {
                    color: 'white',        // Label color when focused
                  },
                },
              }}/>
          </Grid>
        </Grid>
        <Grid>
        <ListItemButton >
          <FilterAltOffIcon style={{ color: 'white' }}onClick={handleClearFilter}/>
        </ListItemButton>
        </Grid>
          <Grid item>
              <ScrollDialog handleFilterLogs={handleFilterLogs} filterTypes={filterTypes} setFilterTypes={setFilterTypes}/>
          </Grid>
      </Box>
    <Table size="small">
      <TableHead>
        <TableRow >
          <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Time Stamp</TableCell>
          <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Type</TableCell>
          <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Log</TableCell>
          <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Show More Info</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          <>
          {displayedLogs?.map((row, index) => {
              if (!row.logObject || typeof row.logObject.log.log !== 'string') {
                console.error('Invalid logObject:', row.logObject);
                return null; // Or some fallback component
          }
           return <NestedRowData row={row} />
        })}
          </>
      </TableBody>
   
    </Table>
    <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
      See more Logs
    </Link>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#424242' }}>
      <Stack spacing={2} sx={{ justifyContent: 'center' }}>
          <Pagination
            count={Math.ceil(returnedLogs.length / itemsPerPage)} // set this according to search type
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
      </Stack>
    </Paper>
  </React.Fragment>
)}
