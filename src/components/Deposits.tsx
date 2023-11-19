import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}
  
  export default function Deposits(props) {
    
    // const [numberOfLogs, setNumberOfLogs] = useState(props.logData.length)

    const [myNodes, setMyNodes] = useState<string[]>([]);
    const [myContainers, setMyContainers] = useState<string[]>([]);
    
    useEffect(() => {
      // Create a Set to store unique sourceInfo values
      const uniqueNodes = new Set(myNodes);
      const uniqueContainers = new Set(myContainers);
  
      const uniqueNodeParsing = props.logData.filter(log => {
        if (log.type === 'proxy' && !uniqueNodes.has(log.sourceInfo)) {
          uniqueNodes.add(log.sourceInfo);
          return false;
        }
        return true;
      });

      const uniqueContainerParsing = props.logData.filter(log => {
        if (log.type === 'pod' && !uniqueContainers.has(log.sourceInfo)) {
          uniqueContainers.add(log.sourceInfo);
          return false;
        }
        return true;
      });
      
      // Convert the Set back to an array
      const updatedMyNodes = [...uniqueNodes];
      const updatedContainers = [...uniqueContainers]
      
      setMyNodes(updatedMyNodes);
      setMyContainers(updatedContainers);
    }, [props]);


  return (
    <React.Fragment>
     <Typography variant="h6" color="white" fontWeight="bold" marginBottom={6}>You currently have: </Typography>
     <Typography textAlign='center' variant="h6" color="white" fontWeight="bold" marginBottom={0}>{props.numberOfLogs} </Typography>
     <Typography textAlign='center' variant="h6" color="white" fontWeight="bold" marginBottom={4}>Logs Generated </Typography>
     <Typography textAlign='center' variant="h6" color="white" fontWeight="bold" marginBottom={0}>{myNodes.length} </Typography>
     <Typography textAlign='center' variant="h6" color="white" fontWeight="bold" marginBottom={4}>Node Running </Typography>
     <Typography textAlign='center'variant="h6" color="white" fontWeight="bold" marginBottom={0}>{myContainers.length}</Typography>
     <Typography textAlign='center'variant="h6" color="white" fontWeight="bold" marginBottom={0}>Containers Deployed </Typography>
    </React.Fragment>
  );
}
