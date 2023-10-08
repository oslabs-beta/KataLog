import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, Route, Routes, useParams, Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Title from './Title';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import image from './assets/Kubernetes.png';
import { Paper, makeStyles, Theme } from '@mui/material';
import { Grid } from '@mui/material';
import ControlPlane from './ControlPlane';
import Node from './Node';
import Hexagon from './Hexagon';
import API from './API';
import ControlManager from './ControlManager';
import Scheduler from './Scheduler';
import Etcd from './Etcd';
import CloudController from './CloudController';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../style.css';


export default function Metrics (props): JSX.Element {
  const theme = useTheme();


  return (
    <React.Fragment>
          <Typography variant="h6" color="white" fontWeight="bold" marginBottom={3}>
            Your Kubernetes Cluster Metrics:
          </Typography>
    </React.Fragment>
  );
}
