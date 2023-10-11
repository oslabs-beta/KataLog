import * as React from 'react';
import { useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits(props) {

  // const [numberOfLogs, setNumberOfLogs] = useState(props.logData.length)

  return (
    <React.Fragment>
     <Typography variant="h6" color="white" fontWeight="bold" marginBottom={6}>You currently have: </Typography>
     <Typography textAlign='center' variant="h6" color="white" fontWeight="bold" marginBottom={0}>{props.numberOfLogs} </Typography>
     <Typography textAlign='center' variant="h6" color="white" fontWeight="bold" marginBottom={4}>Logs Generated </Typography>
     <Typography textAlign='center' variant="h6" color="white" fontWeight="bold" marginBottom={0}>1 </Typography>
     <Typography textAlign='center' variant="h6" color="white" fontWeight="bold" marginBottom={4}>Node Running </Typography>
     <Typography textAlign='center'variant="h6" color="white" fontWeight="bold" marginBottom={0}>6</Typography>
     <Typography textAlign='center'variant="h6" color="white" fontWeight="bold" marginBottom={0}>Containers Deployed </Typography>
    </React.Fragment>
  );
}
