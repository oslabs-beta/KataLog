import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../components/listItems';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';
import LogoutIcon from '@mui/icons-material/Logout';
import Metrics from '../components/Metrics';
import Health from '../components/Health';

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

export default function Logs() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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

  const initialLogData: Log[] = [];

  const [logData, setLogData] = useState<Log[]>(initialLogData);
  // const [expanded, setExpanded] = useState(false);
  const [numberOfLogs, setNumberOfLogs] = useState(0)

  // const toggleExpanded = () => {
  //   setExpanded(!expanded);
  //   console.log(expanded);
  // }

  useEffect(() => {
    fetch('/api/logs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json() as Promise<Log[]>; // Specify the response type as an array of Log
      })
      .then((data) => {
        const newData = data.slice(0, data.length - 1);
        setLogData(newData); // Use data directly if it's an array
        setNumberOfLogs(newData.length);
      })
      .catch((err) => console.error('An error occurred in getting logs: ', err));
  }, []);

  const paperStyle = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    height: 800,
    marginBottom: '20px',
    backgroundColor: '#424242',
    overflowX: 'auto',
    position: 'relative',
  };

  // const lineStyle = {
  //   borderBottom: '10px solid white',
  //   width: '60%', // Stretch the line to the full width
  //   position: 'absolute' as 'absolute',
  //   top: '36%', // Position it in the middle vertically
  //   left: '75%', // Position it to the right
  //   transform: 'translate(-100%, -50%) rotate(25deg)', // Rotate the line by -45 degrees
  // };
  // const lineStyle2 = {
  //   borderBottom: '10px solid white',
  //   width: '60%', // Stretch the line to the full width
  //   position: 'absolute' as 'absolute',
  //   top: '66%', // Position it in the middle vertically
  //   left: '75%', // Position it to the right
  //   transform: 'translate(-100%, -50%) rotate(-25deg)', // Rotate the line by -45 degrees
  // };
  // const lineStyle3 = {
  //   borderBottom: '10px solid white',
  //   width: '60%', // Stretch the line to the full width
  //   position: 'absolute' as 'absolute',
  //   top: '55%', // Position it in the middle vertically
  //   left: '105.5%', // Position it to the right
  //   transform: 'translate(-100%, -50%) rotate(90deg)', // Rotate the line by -45 degrees
  // };

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
            {/* <Typography style={{ textAlign: 'left' }}>Main Menu</Typography> */}
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
            <Grid container spacing={3}>
              {/* *** CENTRALIZED LOGS SHOW HERE *** */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#424242' }}>
                  <Orders logData={logData} setLogData={setLogData}/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
