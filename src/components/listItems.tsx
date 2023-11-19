import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Check, Dashboard, People, BarChart, Layers, GitHub, Login, WebStories, Coffee } from '@mui/icons-material';
import { Link } from 'react-router-dom'

// Define a shared style object
const linkStyle = {
  textDecoration: 'none',
  color: 'black',
};

export const mainListItems = (
  <React.Fragment >

    {/* Dashboard Link */}
    <Link to='/dashboard' style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="" />
      </ListItemButton>
    </Link>

    {/* Logs Link */}
    <Link to='/api/logs' style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <BarChart />
        </ListItemIcon>
        <ListItemText primary="" />
      </ListItemButton>
    </Link>

    <Link to="/configuration" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <Layers />
        </ListItemIcon>
        <ListItemText primary="" />
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
          <GitHub />
        </ListItemIcon>
        <ListItemText primary="" />
      </ListItemButton>
    </a>




    {/* <Link to="/login" style={{ textDecoration: 'none', color: 'inherit'}}>
      <ListItemButton>
        <ListItemIcon>
          <Login />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItemButton>
    </Link>

    <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit'}}>
      <ListItemButton>
        <ListItemIcon>
          <Coffee />
        </ListItemIcon>
        <ListItemText primary="Sign Up" />
      </ListItemButton>
    </Link> */}

    {/* <Link to="/projects" style={{ textDecoration: 'none', color: 'inherit'}}>
      <ListItemButton>
        <ListItemIcon>
          <Check />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>
    </Link> */}

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
