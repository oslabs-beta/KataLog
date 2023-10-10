import React from 'react';
import { useState } from 'react';
import '../style.css';
import ControlPlaneDialog from './ControlPlaneDialog';

function CloudController(props) {

  const [name, setName] = useState('Cloud Controller Manager');

  return (
    <React.Fragment>
        <ControlPlaneDialog logs={props.cloudControllerLogs} name={name}></ControlPlaneDialog>
    </React.Fragment>
  );
}

export default CloudController;