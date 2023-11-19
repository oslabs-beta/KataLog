import React from 'react';
import { useState } from 'react';
import '../style.css';
import ControlPlaneDialog from './ControlPlaneDialog';

function Scheduler(props) {

  const [name, setName] = useState('Scheduler');

  return (
    <React.Fragment>
      <ControlPlaneDialog logs={props.schedulerLogs} name={name}></ControlPlaneDialog>
    </React.Fragment>
  );
}

export default Scheduler;