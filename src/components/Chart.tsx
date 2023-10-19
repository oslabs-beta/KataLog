import React, { useEffect } from 'react';
import { useState } from 'react';
// import { Link, Route, Routes, useParams, Outlet, useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material/styles';
// import Title from './Title';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import image from './assets/Kubernetes.png';
// import { Paper, makeStyles, Theme } from '@mui/material';
import { Grid, TextField } from '@mui/material';
// import ControlPlane from './ControlPlane';
import Node from './Node';
// import Hexagon from './Hexagon';
import API from './API';
import ControlManager from './ControlManager';
import Scheduler from './Scheduler';
import Etcd from './Etcd';
import CloudController from './CloudController';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../style.css';

// for the search functionality I need to make it so that the nodes get reset if there is no search term. Also figure out why the search term only updates 1 search term later.
export default function Chart(props): JSX.Element {

  // const theme = useTheme();

  // initializing example nodes
  const exampleNodes = ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5',];
  const [myNodes, setMyNodes] = useState<string[]>(exampleNodes);
  const [cluster, showCluster] = useState<boolean>(true);
  const [controllerManagerLogs, setControllerManagerLogs] = useState<string[]>([]);
  const [etcdLogs, setEtcdLogs] = useState<string[]>([]);
  const [schedulerLogs, setSchedulerLogs] = useState<string[]>([]);
  const [cloudControllerLogs, setCloudControllerLogs] = useState<string[]>([]);
  const [proxyLogs, setProxyLogs] = useState<string[]>([]);
  const [nodeSearch, setNodeSearch] = useState<string>('')

  useEffect(() => {
    const controllerManagerLogs= props.logData.filter(log => log.type === 'controller-manager');
    const etcdLogs = props.logData.filter(log => log.type === 'etcd');
    const schedulerLogs = props.logData.filter(log => log.type === 'scheduler');
    const cloudControllerLogs = props.logData.filter(log => log.type === 'cloud-controller-manager');
    const proxyLogs = props.logData.filter(log => log.type === 'proxy');
    // Create a Set to store unique sourceInfo values
    const uniqueNodes = new Set(myNodes);

    // const UniqueNodeParsing = props.logData.filter(log => {
    //   if (log.type === 'proxy' && !uniqueNodes.has(log.sourceInfo)) {
    //     uniqueNodes.add(log.sourceInfo);
    //     return false;
    //   }
    //   return true;
    // });

    // Convert the Set back to an array
    const updatedMyNodes = [...uniqueNodes];

    setControllerManagerLogs(controllerManagerLogs);
    setEtcdLogs(etcdLogs);
    setSchedulerLogs(schedulerLogs);
    setCloudControllerLogs(cloudControllerLogs);
    setProxyLogs(proxyLogs);
    setMyNodes(updatedMyNodes);
  }, [props.logData]);




  function hexagonClick() {
    showCluster(false);
    // setControllerManagerLogs(props.logData.filter(log => log.type === 'controller-manager'));
  }

  function backButtonClick() {
    showCluster(true);
  }
  const handleSearchLogs = (e: { target: { value: string; }; }) => {

    console.log('my nodes: ', nodeSearch)
    let search = e.target.value
    let filteredNodes: string[] = [];
    if (search === "") {setMyNodes(exampleNodes)
    } else {
      // search filtered logs if they exist, otherwise search through all logs. (passed in log data)
      filteredNodes = exampleNodes.filter(node => node.includes(search))
      // set the filtered nodes in the myNodes state variable
      setMyNodes(filteredNodes);
    }



      console.log('my nodes: ', myNodes, search)
  }

  const lineStyle = {
    borderBottom: '10px solid white',
    width: '60%', // Stretch the line to the full width
    position: 'absolute' as 'absolute',
    top: '36%', // Position it in the middle vertically
    left: '75%', // Position it to the right
    transform: 'translate(-100%, -50%) rotate(25deg)', // Rotate the line by -45 degrees
  };
  const lineStyle2 = {
    borderBottom: '10px solid white',
    width: '60%', // Stretch the line to the full width
    position: 'absolute' as 'absolute',
    top: '66%', // Position it in the middle vertically
    left: '75%', // Position it to the right
    transform: 'translate(-100%, -50%) rotate(-25deg)', // Rotate the line by -45 degrees
  };
  const lineStyle3 = {
    borderBottom: '10px solid white',
    width: '60%', // Stretch the line to the full width
    position: 'absolute' as 'absolute',
    top: '55%', // Position it in the middle vertically
    left: '105.5%', // Position it to the right
    transform: 'translate(-100%, -50%) rotate(90deg)', // Rotate the line by -45 degrees
  };

  return (
    <React.Fragment>
      {cluster ? (
        <div>
          <div style={lineStyle}></div>
          <div style={lineStyle2}></div>
          <div style={lineStyle3}></div>
          <Typography variant="h6" color="white" fontWeight="bold" marginBottom={3}>
            Kubernetes Cluster Dashboard:
          </Typography>
          <div className="grid-container">
          <Grid container spacing={2}>
        {/* Top left quadrant */}
        <Grid item xs={6} className="grid-item top-left">
          <div style={ {marginBottom: '-100px', marginLeft: '50px' }}>
          <ControlManager controllerManagerLogs={controllerManagerLogs}></ControlManager>
          </div>
        </Grid>
        {/* Top right quadrant */
          /* ****** TO BE ADDED CLOUD CONTROLLER MANAGER */
        }
        <Grid item xs={6} className="grid-item top-right">
          <div style={{ padding: '0px', marginLeft: '100px' }}>
            <CloudController cloudControllerLogs={cloudControllerLogs}></CloudController>
          </div>
        </Grid>
        {/* Middle left quadrant */}
        <Grid item xs={6} className="grid-item middle-left">
          <div style={{ padding: '0px', marginLeft: '50px' }}>
          </div>
        </Grid>
        {/* Middle right quadrant */}
        <Grid item xs={6} className="grid-item middle-right">
          <div style={{ padding: '0px', marginLeft: '100px' }}>
          <API hexagonClick={hexagonClick}></API>
          </div>
        </Grid>
        {/* Bottom left quadrant */}
        <Grid item xs={6}>
          <div style={{ padding: '0px', marginLeft: '50px' }}>
          <Etcd etcdLogs={etcdLogs}></Etcd>
          </div>
        </Grid>
        {/* Bottom right quadrant */}
        <Grid item xs={6}>
          <div style={{ padding: '0px', marginLeft: '100px' }}>
          <Scheduler schedulerLogs={schedulerLogs}></Scheduler>
          </div>
        </Grid>
      </Grid>
      </div>
        </div>
      ) : (
        <div>
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
        <Button sx={{
            '&:hover': {
            backgroundColor: 'gray', // Change this to the desired gray color
          },
          color: 'white',
        }}>
          <ArrowBackIosIcon onClick={backButtonClick}></ArrowBackIosIcon>
        </Button>
        <Typography variant="h6" color="white" fontWeight="bold" marginTop={2} sx={{ marginBottom: '16px' }}>
          Nodes:
        </Typography>
        <div style={{
          display: 'flex',
          justifyContent: 'left', // Horizontally center the Node components
          alignItems: 'center', // Vertically center the Node components
          marginTop: "100px"
        }}>
          {/* Map over the array and render a Node component for each node */}
          {myNodes.map((element, index) => (
            <Node index={index} key={index} element={element} proxyLogs={proxyLogs}/>
          ))}
        </div>
      </div>


      )}

    </React.Fragment>
  );
}
