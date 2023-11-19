import React from 'react';
import { useState } from 'react';
import '../style.css';
import ControlPlaneDialog from './ControlPlaneDialog';

function Etcd(props) {

  const [name, setName] = useState('etcd');

  return (
    <React.Fragment>
      <ControlPlaneDialog logs={props.etcdLogs} name={name}></ControlPlaneDialog>
    </React.Fragment>
  );
}

export default Etcd;