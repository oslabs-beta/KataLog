import React from 'react';
import '../style.css';
import { useState } from 'react';
import ControlPlaneDialog from './ControlPlaneDialog';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI

function ControlManager(props) {

  const [name, setName] = useState('Controller Manager');

  return (
    <React.Fragment>

        <ControlPlaneDialog logs={props.controllerManagerLogs} name={name}></ControlPlaneDialog>

    </React.Fragment>
  );
}

export default ControlManager;


