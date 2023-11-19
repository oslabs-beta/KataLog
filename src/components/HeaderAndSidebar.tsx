import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { mainListItems, secondaryListItems } from './listItems';
import { CssBaseline, Box, Toolbar, List, Typography, Divider, IconButton, Badge, Grid, Paper } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Notifications as NotificationsIcon, Logout as LogoutIcon } from '@mui/icons-material';
import test from './assets/Logo.png';

interface Project {
  projectName: string;
  _id: string;
}


interface HeaderAndSidebarProps {
  onProjectSelect: (projectName: string) => void;
}

  
const HeaderAndSidebar: React.FC<HeaderAndSidebarProps> = ({ onProjectSelect }) => { 

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  


  // logout functionality:
  const navigate = useNavigate();
  // define a function handleLogout, no params
  const handleLogout = () => {
    // grab JWT token from local storage
    const token = localStorage.getItem('token');
    // if JWT token exists in local storage
    if (token) {
      // remove token from local storage
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      // navigate to splash page
      navigate('/');
    // else (i.e. JWT token does not exist)
    } else {
      // no token in local storage
      console.log('No token found in local storage');
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      // Retrieve token inside useEffect
      const token = localStorage.getItem('token');
  
      if (token) {
        fetch('/api/projects', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setProjects(data);
          } else {
            // Handle the case where data is not an array
            console.error('Expected an array of projects, but received:', data);
          }
        })
        .catch(err => console.error('An error occurred in getting projects: ', err));
      }
    }
  }, [isAuthenticated]);
  

  useEffect(() => {
  if (selectedProject) {
      fetch(`/api/logs/${selectedProject}`, {
          headers: {
              'Content-Type': 'application/json',
          }
      })
      .then(response => response.json())
      // .then(data => onProjectSelect(data))
      // .then(data => setLogs(data))
      .catch(err => console.error('An error occurred in getting logs: ', err));
  }
  }, [selectedProject]);


  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectName = event.target.value;
    setSelectedProject(event.target.value);
    onProjectSelect(projectName);
  }


  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
      setOpen(!open);
  };
  
    
  return (   
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
          <AppBar >
            <Toolbar
              sx={{
              pr: '24px', // keep right padding when drawer closed
              backgroundColor: '#181923',
            }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <img src={test} alt="Your Image" width="65" height="65"/>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                text-align='center'
                marginLeft='45px'
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}
              >
                
              </Typography>

              <Grid item xs={12} >
                {/* <Paper sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', backgroundColor: 'transparent'}}> */}
                  {/* <FormControl sx={{ m: 1, width: 200, height: 20, color: 'white' }}>
                  <Select 
                  onChange={handleProjectChange}
                  sx={{
                    height: 30,
                    color: 'white', // Set the text color to white
                    backgroundColor: 'transparent', // Set the background color to transparent
                    '& option': {
                      color: 'white', // Set the option text color to the desired color (e.g., black)
                    },
                    '&:before': {
                      borderColor: 'white', // Set the outline color to white
                    },
                    '&:after': {
                      borderColor: 'white', // Set the arrow color to white
                    },
                  }}
                >
                    {projects?.map(project => (
                      <MenuItem key={project._id} value={project.projectName}>{project.projectName} </MenuItem>
                      ))}
                  </Select>
                      </FormControl> */}
                {/* </Paper> */}

                <Paper sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', backgroundColor: 'transparent'}}>
                  <select onChange={handleProjectChange}>
                    <option value="" >Select a project</option>
                    {projects && projects.map(project => (
                      <option key={project._id} value={project._id}>{project.projectName}</option>
                    ))}
                  </select>
                </Paper>
              </Grid>

              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon></LogoutIcon>
              </IconButton> 
            </Toolbar>
          </AppBar>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" sx={{}}>
            {mainListItems}
            <Divider sx={{ my: 1,  }} />
            {secondaryListItems}
          </List>
          <Box
          component="main"
          sx={{
            // backgroundColor: (theme) =>
            //   theme.palette.mode === 'dark'
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            backgroundColor: '#1A202C',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
          >
          <Toolbar />
        </Box>
      </Box>
  )
}

export default HeaderAndSidebar;