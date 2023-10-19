import React, { useEffect } from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Kubelet from './Kubelet'
import Typography from '@mui/material/Typography';
import ControlPlaneDialog from './ControlPlaneDialog';

export default function Node(props) {

    const [name] = useState('K-Proxy');
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const specificLogs = props.proxyLogs.filter(log => log.sourceInfo === props.element);
        setLogs(specificLogs);
}, [])

    return (
        <div >
            <Box sx={{
                width: 216,
                height: 456,
                backgroundColor: 'gray',
                marginLeft: '10px',
                marginRight: '10px',
            }}
                onClick={props.hexagonClick}>
                    <Typography variant="h6" color="white" fontWeight="bold" textAlign={'center'} marginTop={1}>{props.element}</Typography>
            <Kubelet/>
            <ControlPlaneDialog logs={logs} name={name}></ControlPlaneDialog>
            </Box>
        </div>
    )
};
