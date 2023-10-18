import * as React from 'react';
import { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Box } from '@mui/material';


export default function NestedRowData(props) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  }


  console.log('props', props);

  return (
    <>
      <TableRow>
        <TableCell sx={{ color: 'white' }}>{props.row.logDataObject.timestamp}</TableCell>
        <TableCell sx={{ color: 'white' }}>{props.row.logDataObject.type}</TableCell>
        <TableCell sx={{ color: 'white', maxWidth: "400px", wordWrap: 'break-word', overflowWrap: "break-word" }}>
          {props.row.logDataObject.logObject.log}
        </TableCell>
        <TableCell>
          <ExpandMoreIcon onClick={toggleExpanded} />
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography sx={{ color: 'white' }} variant="body1">Namespace: {props.row.logDataObject.podInfo.namespace}</Typography>
              <Typography sx={{ color: 'white' }} variant="body1">Source Info: {props.row.logDataObject.sourceInfo}</Typography>
              <Typography sx={{ color: 'white' }} variant="body1">Container Name: {props.row.logDataObject.podInfo.containerName}</Typography>
              <Typography sx={{ color: 'white' }} variant="body1">Stream: {props.row.logDataObject.logObject.stream}</Typography>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
