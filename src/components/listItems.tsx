import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import GitHubIcon from '@mui/icons-material/GitHub';

export const mainListItems = (
  <React.Fragment >

    {/* Dashboard Link */}
    <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
          <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    {/* GitHub Link */}
    <a href="https://github.com/oslabs-beta/Katalog"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none', // Remove underline
        color: 'black',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
  >
  <ListItemButton>
    <ListItemIcon>
      <GitHubIcon />
    </ListItemIcon>
    <ListItemText primary="GitHub" />
  </ListItemButton>
    </a>

    {/* Team Link */}
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Team" />
    </ListItemButton>

    {/* Logs Link */}
    <Link to='/api/logs' style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
          <ListItemText primary="Logs" />
      </ListItemButton>
    </Link>

    {/* Integration Link */}
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current report" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last report" />
    </ListItemButton> */}
    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);
