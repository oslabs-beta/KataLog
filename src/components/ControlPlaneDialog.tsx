import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Title from './Title';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TextField, Box, Grid, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NestedRowData from './NestedRowData';
import HexagonIcon from '@mui/icons-material/Hexagon';
import CloseIcon from '@mui/icons-material/Close';


export default function ControlPlaneDialog(props) {

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

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [searchLogs, setSearchLogs] = useState<Log[]>(props.logs);

  const handleSearchLogs = (e) => {

    const searchTerm : string = e.target.value;

    const temp : Log[] = [];
    const logsToSearch = props.logs;

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

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // #303030

  return (
    <div>
      <Button onClick={handleClickOpen('paper')} sx={{
    '&:hover': {
      backgroundColor: 'white', // Change this to the desired gray color
    },
  }}>
    <div style={{ position: 'relative', color: '#316CE6', fontSize: '15px' }}>
    <HexagonIcon style={{ fontSize: '200px',  }} />
    <span style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textTransform: 'none', fontFamily: 'inherit', fontWeight: 'bold',}}>{props.name}</span>
    </div>
      </Button>
      {/* <Button onClick={handleClickOpen('body')}></Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle
  sx={{
    backgroundColor: '#1A202C',
    display: 'flex',
    alignItems: 'center',
  }}
  fontWeight="bold"
  color="white"
  id="scroll-dialog-title"
>
  <span style={{ flex: 1 }}>{props.name} Centralized Logs:</span>
  <TextField id="standard-basic"
              onChange={handleSearchLogs}
              label="Search"
              variant="standard"
              sx={{
                marginRight: '50px',
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
  <ListItemButton onClick={handleClose} sx={{ position: 'absolute', right: 0 }}>
    <CloseIcon />
  </ListItemButton>
</DialogTitle>


                
        <DialogContent dividers={scroll === 'paper'} sx={{backgroundColor: '#1A202C', }}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* logic goes here */}
            <Box display="flex" alignItems="center">
        {/* <Typography variant="h6">Your Centralized Kubernetes Logs:</Typography> */}
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
            {/* <TextField id="standard-basic" onChange={handleSearchLogs} label="Search" variant="standard" sx={{ width: '300px' }}/> */}
          </Grid>
        </Grid>
        <Grid>
        {/* <ListItemButton >
          <FilterAltOffIcon onClick={handleClearFilter}/>
        </ListItemButton> */}
        </Grid>
          <Grid item>
              {/* <ScrollDialog handleFilterLogs={handleFilterLogs} filterTypes={filterTypes} setFilterTypes={setFilterTypes}/> */}
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
      {/* {!searchLogs.length && ( */}
        <>
        {(!searchLogs.length ? props.logs : searchLogs).map((row, index) => (
          <NestedRowData row={row} />
        ))}
        </>
      </TableBody>
      {/* <TableBody>
      {searchLogs.length && (
        <>
        {searchLogs.map((row, index) => (
           <NestedRowData row={row} />
        ))}
        </>
      )}
      </TableBody> */}
    </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{backgroundColor: '#1A202C', }}>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}