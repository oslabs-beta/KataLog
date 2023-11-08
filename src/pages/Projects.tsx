import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Drawer as MuiDrawer, Box, Toolbar, List, Typography, Divider, IconButton, Badge, Container, Grid, Paper, Link } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { mainListItems, secondaryListItems } from '../components/listItems';
import DashboardAsComponent from '../components/DashboardAsComponent';
import LogsAsComponent from '../components/LogsAsComponent';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Notifications as NotificationsIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';


interface Log {
  timestamp: string;
  sourceInfo: string;
  logObject: LogObject;
  podInfo: PodObject;
  type: string;
}

interface LogObject {
  log: string;
  stream: string;
}

interface PodObject {
  containerName: string;
  namespace: string;
  podName: string;
}


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [logs, setLogs] = useState<Log[]>([]);
  




  const [newProjectFormData, setNewProjectFormData] = useState({
    projectName: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const newProjectName  = newProjectFormData;

  const onChange = (e) => {
    setNewProjectFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to the server
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProjectFormData)
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful, clear the form and display success message
        setNewProjectFormData({
          projectName: ''
        });
        setSuccessMessage(data.message);
        setErrorMessage('');
        // render Login page after 1.5 seconds
      } else if (data && data.err) {
        // Error message in the expected format
        setErrorMessage(data.err);
      } else {
        // Handle other error formats or set a default error message
        setErrorMessage('An error occurred');
      }
      setSuccessMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  interface Project {
    projectName: string;
    _id: string;
  }

  const token = localStorage.getItem('token');

  const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

  useEffect(() => {
      fetch('/api/projects', {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          // body: JSON.stringify({ user_id: '653dd3cb077bca1fb79856cf' }) // Replace 'user123' with the actual username
      })
      .then(response => response.json())
      .then(data => setProjects(data))
      .then(data => console.log('projects', projects))
      .catch(err => console.error('An error occurred in getting logs: ', err));
  }, []);

  useEffect(() => {
    if (selectedProject) {
        fetch(`/api/logs/${selectedProject}`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        // .then(response => console.log('response,', response))
        .then(data => setLogs(data))
        .catch(err => console.error('An error occurred in getting logs: ', err));
    }
}, [selectedProject]);


      
  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
                backgroundColor: '#316CE6',
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
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                KataLog
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <LogoutIcon></LogoutIcon>
              </IconButton>
            </Toolbar>
          </AppBar>
        <Drawer variant="permanent" open={open} >
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
        </Drawer >
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
        <Toolbar />  
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", color: 'white', }}>
          
          <Grid item xs={12}>
            <Paper sx={{ width: '33%', p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#424242' }}>
              <select onChange={handleProjectChange}>
                <option value="" disabled selected>Select a project</option>
                {projects.map(project => (
                  <option key={project._id} value={project._id}>{project.projectName}</option>
                ))}
              </select>

            </Paper>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0px',
              height: '33%',
              width: '100%'
            }}
          >
            {logs.length > 0 && <LogsAsComponent logs={logs} />}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0px',
              height: '100vh',
              width: '100%'
            }}
          >
            {logs.length > 0 && <DashboardAsComponent logs={logs} />}
          </Box>




          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0px',
              height: '33%',
              width: '100%'
            }}
          >
            <Typography variant="h5">Create New Project: </Typography>
            {successMessage && (
              <Typography variant="body1">
                {successMessage}
              </Typography>
            )}
            {errorMessage && (
              <Typography variant="body1" color="error">
                {errorMessage}
              </Typography>
            )}
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '20px',
              }}
            >
              <TextField
                label="Project Name"
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                name="projectName"
                value={newProjectFormData.projectName}
                onChange={onChange}
              />
              <Button type="submit" variant="contained" sx={{ marginTop: '10px' }}>
                Create New Project
              </Button>
            </Box>
          </Box>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
