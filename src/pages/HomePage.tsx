// this needs to be cleaned up
import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// this could be problematic????
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Grid, Avatar, Paper } from '@mui/material';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { LinkedIn, GitHub, } from '@mui/icons-material';
import { ReactElement } from 'react';
import logo from '../components/assets/Logo.png';
import Demo1 from '../components/assets/DemoGif1.gif';
import Demo2 from '../components/assets/DemoGif2.gif';
import Demo3 from '../components/assets/DemoGif3.gif';
import Demo4 from '../components/assets/DemoGif4.gif';
import Bryan from '../components/assets/Bryan.png';
import Chuck from '../components/assets/Chuck.png';
import Derrick from '../components/assets/Derrick.png';
import Tom from '../components/assets/Tom.png';

import { 
    MdFilterAlt,
    MdRemoveRedEye,
    MdNotes,
    MdSearch,
    MdStackedBarChart,
    MdHealthAndSafety
} from "react-icons/md";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
    { label: 'Login', link: '/login', icon: 'login_icon.png' },
    { label: 'SignUp', link: '/signup', icon: 'signup_icon.png' },
  ];
const scrollItems = [
    { label: 'Features', link: 'features', icon: 'features_icon.png' },
    { label: 'Demo', link: 'demo', icon: 'demo_icon.png' },
    { label: 'Team', link: 'team', icon: 'team_icon.png' },
  ];
const users = [
  {
    name: 'Bryan Luna',
    role: 'Software Engineer',
    linkedin: 'https://www.linkedin.com/in/bryan-luna-b34011134/',
    github: 'https://github.com/bluna301',
    avatar: Bryan,
  },
  {
      name: 'Chuck Franco',
      role: 'Software Engineer',
      linkedin: "https://www.linkedin.com/in/thomaskpappas/",
      github: "https://github.com/chuckfranco",
      avatar: Chuck,
    },
    {
      name: 'Derrick Devairakkam',
      role: 'Software Engineer',
      linkedin: "https://www.linkedin.com/in/derrickdevairakkam/",
      github: "https://github.com/derrick-devairakkam",
      avatar: Derrick,
    },
    {
      name: 'Tom Pappas',
      role: 'Software Engineer',
      linkedin: "https://www.linkedin.com/in/thomaskpappas/",
      github: "https://github.com/tkpaps",
      avatar: Tom,
    },
];



export default function HomePage(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    
    const scrollTo = (id) => {
        const element = document.querySelector(`#${id}`);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    // this drawer is unnecessary - check code for it to get deleted
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <img src={logo} alt="Description of the image" style={{ maxWidth: '60px', height: '60px' }} />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const Card = ({ heading, description, icon }) => {
    return (
      <Box
        sx={{
            minHeight: {xs: '100%', md: '225px' },
            maxWidth: { xs: '100%', md: '275px' },
            width: '100%',
            border: '1px solid',
            borderRadius: '8px',
            borderColor: 'gray',
            overflow: 'hidden',
            padding: 3,
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Stack alignItems="flex-start" spacing={2}>
          <Box
            sx={{
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              borderRadius: '50%',
              backgroundColor: '#316CE6',
            }}
          >
            {icon}
          </Box>
          <Box mt={2}>
            <Typography fontWeight={800} variant="h6" color="white" sx={{ textAlign: 'left' }}>{heading}</Typography>
            <Typography mt={1} fontSize="small" color="white" sx={{ textAlign: 'left' }}>
              {description}
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  };

  interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
  }
  
  const Feature = ({ text, icon, iconBg }: FeatureProps) => {
    return (
        <Box>
        <Stack direction={'row'} alignItems={'center'}>
          <Box
            width={32}
            height={32}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'50%'}
            bgcolor={iconBg}
          >
            <div style={{ fontSize: '27px' }}>{icon}</div>
          </Box>
          <Typography color='white' fontWeight={600} marginLeft={2}>
            {text}
          </Typography>
        </Stack>
        <Divider sx={{ marginTop: 1, marginBottom: 1, backgroundColor: 'gray' }} />
      </Box>
    );
  };

  
  // what is this doing? is this needed? 
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
{/* ****************************** NAV BAR ********************************* */}
        <Box sx={{ display: 'flex', backgroundColor: '#1A202C' }} >
            <CssBaseline />
            <AppBar component="nav" sx={{ backgroundColor: '#181923' }}>
            <Toolbar>
                <img src={logo} alt="Description of the image" style={{ maxWidth: '60px', height: '60px' }} />
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            <Box
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                
            >
                {scrollItems.map((item) => (
                <Button key={item.label} onClick={() => scrollTo(item.link)} sx={{ color: '#fff', fontWeight: 'bold', textTransform: 'none' }}>
                    {item.label}
                </Button>
                ))}
                <Button sx={{ color: '#fff', fontWeight: 'bold', textTransform: 'none'  }} href="https://github.com/oslabs-beta/KataLog" target="_blank">
                    Github
                </Button>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                        <Link key={item.label} to={item.link} style={{ textDecoration: 'none' }}>
                        <Button 
                        sx={{
                            paddingRight: '5px',
                            marginRight: '10px',
                            color: '#fff',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            borderRadius: '8px',
                            backgroundColor: "#316CE6", // Replace with your desired background color
                            '&:hover': {
                              backgroundColor: "gray", // Change the hover color if needed
                            },
                          }}
                        >
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </Box>
            </Toolbar>
            </AppBar>
        {/* is this needed as well?  */}
        <nav>
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
        </nav>
        <Box
            component="main"
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
                <Toolbar />
            </Box>
        </Box>
{/* ****************************** INTRODUCTION ********************************* */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', backgroundColor: '#1A202C', paddingTop: '200px', paddingBottom: '100px',}}>
            <Stack 
                maxWidth='800px'
                textAlign={'center'}
                spacing={{ base: 8, md: 2 }}
            >
                <Typography 
                    variant='h2'
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                    color='white'
                >
                    KataLog
                </Typography>
                <Typography
                    variant='h3'
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                    color="#316CE6"
                >
                    Kubernetes Centralized Logs, Visualization & Metrics
                </Typography>
                <Typography variant='h6' color='grayText'>
                    Centralized and visualized logs built on top of Fluentd straight from your Kubernetes Clusters. Automatic log updating and real-time metrics.
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px',  }}>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <Button variant='contained' 
                        style={{
                        width: '150px',
                        color: '#FFFFFF',
                        borderRadius: '16px',
                        transition: 'background-color 0.3s ease',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        backgroundColor: "#316CE6",
                        }}
                    >
                        Get Started
                    </Button>
                    </Link>
                </div>
            </Stack>
        </div>
{/* ****************************** FEATURES ********************************* */}
        <div  style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '200px', paddingBottom: '100px', backgroundColor: '#1A202C', }}>
                <Box id='features' p={4} paddingTop='100px'>
                    <Container >
                        <Typography  paddingBottom="10px" variant="h3" fontWeight="bold" color="white">
                        Key Features
                        </Typography>
                        <Typography color="grayText" paddingBottom="25px" fontSize={{ xs: 'small', sm: 'large' }}>
                        Here are the highlights of some features that KataLog has to offer.
                        </Typography>
                    </Container>

                    <Container >
                        <Grid container spacing={3} justifyContent="center">
                        <Grid item>
                            <Card
                            heading="Centralization"
                            icon={<MdNotes size={50} />}
                            description="All logs from all components in your Kubernetes Control Plane all in one place."
                            />
                        </Grid>
                        <Grid item>
                            <Card
                            heading='Visualization'
                            icon={<MdRemoveRedEye size={50} />}
                            description='Visualization of logs appearing in a seemless user interface.'
                            />
                        </Grid>
                        <Grid item>
                            <Card
                            heading='Filtering'
                            icon={<MdFilterAlt size={50} />}
                            description='Ability to filter logs by source with integrated visualization.'
                            />
                        </Grid>
                        <Grid item>
                            <Card
                            heading='Searching'
                            icon={<MdSearch size={50} />}
                            description='Graphs of error, warning, info, and okay logs that have been generated.'
                            />
                        </Grid>
                        <Grid item>
                            <Card
                            heading='Metrics'
                            icon={<MdStackedBarChart size={50} />}
                            description='Graphs of error, warning, info, and okay logs that have been generated.'
                            />
                        </Grid>
                        <Grid item>
                            <Card
                            heading='Health'
                            icon={<MdHealthAndSafety size={50} />}
                            description='Basic notice of the state of health of the Kubernetes Cluster that is running.'
                            />
                        </Grid>
                        </Grid>
                    </Container>
                    </Box>
                    </div>
{/* ****************************** DEMO SECTION ********************************* */}
                        <div id='demo' style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '100px', paddingBottom: '0px', backgroundColor: '#1A202C', }}>
                            <Stack spacing={3} maxWidth={'md'} textAlign={'center'} marginBottom={10}>
                                <Typography variant={'h3'} fontWeight={'bold'} color={'white'}>
                                Demo
                                </Typography>
                                <Typography color={'grayText'} fontSize={'large'} >
                                See below for a detailed description on how to set up KataLog.
                                </Typography>
                            </Stack>
                        </div>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px', paddingBottom: '100px', backgroundColor: '#1A202C', }}>
                        <Box textAlign={'center'} maxWidth={'1200px'}>
                        {/* FIRST PANEL */}
                        <Grid container spacing={10} paddingBottom='50px'>
                            {/* First Grid section */}
                            <Grid item xs={12} md={6} textAlign='left'>
                            <Typography color="white" variant="h4" fontWeight={700}>Simply Create an Account</Typography>
                            <Typography color="grayText" fontSize="large">
                                Your Account will have all the projects you list, meaning you can access your centralized Kubernetes logs from multiple clusters that you may have deployed.
                            </Typography>
                            <Box marginTop={4}>
                                <Divider />
                            </Box>
                            <Stack spacing={2} marginTop={1}>
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text="Seamless account creation"
                                />
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='Dashboard for visualization and metrics'
                                />
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='One stop shop for all generated logs'
                                />
                            </Stack>
                            </Grid>
                            {/* Second Grid section */}
                            <Grid item xs={12} md={6}>
                            <Box maxWidth="100%" maxHeight="400px">
                                <img src={Demo1} alt="Demo1" style={{ width: '100%', height: '100%' }} />
                            </Box>
                            </Grid>
                        </Grid>
                        {/* SECOND PANEL */}
                        <Grid container spacing={10} paddingBottom='50px'>
                            {/* First Grid section */}
                            <Grid item xs={12} md={6}>
                            <Box maxWidth="100%" maxHeight="400px">
                                <img src={Demo2} alt="Demo1" style={{ width: '100%', height: '100%' }} />
                            </Box>
                            </Grid>
                            {/* Second Grid section */}
                            <Grid item xs={12} md={6} textAlign='left'>
                            <Typography color="white" variant="h4" fontWeight={700}>Generate the Files for Your Cluster</Typography>
                            <Typography color="grayText" fontSize="large">
                            Simple step process for obtaining the needed code to connect to KataLog's UI and to start centralizing your Kubernetes logs.
                            </Typography>
                            <Box marginTop={4}>
                                <Divider />
                            </Box>
                            <Stack spacing={2} marginTop={1}>
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='Navigate to Integrations'
                                />
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='Submit your information'
                                />
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='Copy the generated files'
                                />
                            </Stack>
                            </Grid>
                        </Grid>
                        {/* THIRD PANEL */}
                        <Grid container spacing={10} paddingBottom='50px'>
                            {/* First Grid section */}
                            <Grid item xs={12} md={6} textAlign='left'>
                            <Typography color="white" variant="h4" fontWeight={700}>Integrate the Files into Your Code Base</Typography>
                            <Typography color="grayText" fontSize="large">
                            Easy file integration into your app running your Kubernetes Cluster.
                            </Typography>
                            <Box marginTop={4}>
                                <Divider />
                            </Box>
                            <Stack spacing={2} marginTop={1}>
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='Create neccessary files'
                                />
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='Paste in provided code'
                                />
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='Start your Kubernetes Cluster'
                                />
                            </Stack>
                            </Grid>
                            {/* Second Grid section */}
                            <Grid item xs={12} md={6}>
                            <Box maxWidth="100%" maxHeight="400px">
                                <img src={Demo3} alt="Demo1" style={{ width: '100%', height: '100%' }} />
                            </Box>
                            </Grid>
                        </Grid>
                        {/* FOURTH PANEL */}
                        <Grid container spacing={10} paddingBottom='50px'>
                            {/* First Grid section */}
                            <Grid item xs={12} md={6}>
                            <Box maxWidth="100%" maxHeight="400px">
                                <img src={Demo4} alt="Demo1" style={{ width: '100%', height: '100%' }} />
                            </Box>
                            </Grid>
                                {/* Second Grid section */}
                            <Grid item xs={12} md={6} textAlign='left'>
                            <Typography color="white" variant="h4" fontWeight={700}>Interact with Your Logs</Typography>
                            <Typography color="grayText" fontSize="large">
                                Move through the control plane visualizing where the logs came from and what they are, analyze log metrics, 
                                and search and filter logs in a centralized location.
                            </Typography>
                            <Box marginTop={4}>
                                <Divider />
                            </Box>
                            <Stack spacing={2} marginTop={1}>
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='Navigate through the control plane'
                                />
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='Analyze log metrics'
                                />
                                <Feature
                                icon={<IoCheckmarkCircleSharp color="#4caf50" />}
                                iconBg="#9affa4"
                                text='Search and filter'
                                />
                            </Stack>
                            </Grid>
                        </Grid>
                        </Box>
                    </div>
{/* ****************************** TEAM SECTION ********************************* */}
                    <div id="team" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '100px', paddingBottom: '10px', backgroundColor: '#1A202C' }}>
                        <Stack marginTop={0} spacing={4} component={Container} maxWidth={'md'} textAlign={'center'}>
                        <Typography variant='h3' fontWeight={'bold'} color='white'>
                            Meet the Team
                        </Typography>
                        <Typography variant='h6' color={'grayText'}>
                            The KataLog Team consisting of Bryan Luna, Chuck Franco, Derrick Devairakkam, and Tom Pappas.
                        </Typography>
                        </Stack>
                    </div>
                        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px', paddingBottom: '100px', backgroundColor: '#1A202C' }}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingTop: '10px',
                                paddingBottom: '100px',
                                backgroundColor: '#1A202C',
                            }}
                            >
                        <Grid container spacing={3} justifyContent='center'>
                            {users.map((user, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper
                                    elevation={8}
                                    sx={{
                                    maxWidth: 270,
                                    width: 350,
                                    backgroundColor: 'white',
                                    borderRadius: 'md',
                                    overflow: 'hidden',
                                    }}
                                >
                                    <Box
                                    sx={{
                                        height: 120,
                                        width: '100%',
                                        backgroundColor: '#316CE6',
                                    }}
                                    />
                                    <Box display="flex" justifyContent="center" marginTop={-9}>
                                    <Avatar 
                                    sx={{
                                        width: 120,
                                        height: 120, 
                                      }}src={user.avatar} />
                                    </Box>
                                    <Box padding={2}>
                                    <Box textAlign="center" marginBottom={2}>
                                        <Typography variant="h5" fontWeight={500} paddingTop='10px'>
                                        {user.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                        {user.role}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="center">
                                        <IconButton
                                        component="a"
                                        href={user.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >
                                        <LinkedIn sx={{ width: 48, height: 48 }} />
                                        </IconButton>
                                        <IconButton
                                        component="a"
                                        href={user.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >
                                        <GitHub sx={{ width: 48, height: 48 }} />
                                        </IconButton>
                                    </Box>
                                    </Box>
                                </Paper>
                                </Grid>
                            ))}
                            </Grid>
                            </Box>
                        </div>
    </React.Fragment>
  );
}