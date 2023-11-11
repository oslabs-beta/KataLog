import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { mainListItems, secondaryListItems } from './listItems';
import { CssBaseline, Drawer as MuiDrawer, Box, Toolbar, List, FormControl, Typography, Divider, IconButton, Badge, Container, Grid, Paper, Link, MenuItem } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Notifications as NotificationsIcon, Logout as LogoutIcon, DisabledByDefault } from '@mui/icons-material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import test from './assets/Logo.png';

interface Project {
  projectName: string;
  _id: string;
}

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

interface HeaderAndSidebarProps {
  onProjectSelect: (projectName: string) => void;
}

const token = localStorage.getItem('token');

const drawerWidth: number = 240;

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open',
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
  
const defaultTheme = createTheme();
  
  
const HeaderAndSidebar: React.FC<HeaderAndSidebarProps> = ({ onProjectSelect }) => { 

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [logs, setLogs] = useState<Log[]>([]);

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
      // navigate to splash page
      navigate('/');
    // else (i.e. JWT token does not exist)
    } else {
      // no token in local storage
      console.log('No token found in local storage');
    }
  }

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
    .catch(err => console.error('An error occurred in getting logs: ', err));
  }, []);

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


  
  // const handleProjectChange = (event: SelectChangeEvent<typeof selectedProject>) => {
  //   const projectName = event.target.value;
  //   setSelectedProject(event.target.value);
  //   onProjectSelect(projectName);
  // }

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
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
          <AppBar position="absolute" open={open}>
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
    </ThemeProvider>
  )
}

export default HeaderAndSidebar;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Flex,
//   IconButton,
//   Avatar,
//   Text,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuDivider,
//   useDisclosure,
//   useColorModeValue,
//   HStack,
//   VStack,
//   Drawer,
//   DrawerContent,
//   DrawerOverlay,
//   DrawerCloseButton,
//   Icon,
//   Badge,
//   Button,
//   Divider,
//   Container,
// } from '@chakra-ui/react';
// import {
//   FiMenu,
//   FiChevronDown,
//   FiBell,
//   FiHome,
//   FiTrendingUp,
//   FiCompass,
//   FiStar,
//   FiSettings,
//   FiChevronLeft,
// } from 'react-icons/fi';
// import { IconType } from 'react-icons'

// interface Project {
//   projectName: string;
//   _id: string;
// }

// interface Log {
//   timestamp: string;
//   sourceInfo: string;
//   logObject: LogObject;
//   podInfo: PodObject;
//   type: string;
// }

// interface LogObject {
//   log: string;
//   stream: string;
// }

// interface PodObject {
//   containerName: string;
//   namespace: string;
//   podName: string;
// }

// interface HeaderAndSidebarProps {
//   onProjectSelect: (projectName: string) => void;
// }

// const token = localStorage.getItem('token');

// interface LinkItemProps {
//   name: string;
//   icon: IconType;
// }

// interface NavItemProps {
//   icon: IconType;
//   children: React.ReactNode;
// }

// const LinkItems: Array<LinkItemProps> = [
//   { name: 'Home', icon: FiHome },
//   { name: 'Trending', icon: FiTrendingUp },
//   { name: 'Explore', icon: FiCompass },
//   { name: 'Favourites', icon: FiStar },
//   { name: 'Settings', icon: FiSettings },
// ];

// const HeaderAndSidebar: React.FC<HeaderAndSidebarProps> = ({ onProjectSelect }) => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [selectedProject, setSelectedProject] = useState("");
//   const navigate = useNavigate();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     fetch('/api/projects', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => response.json())
//     .then(data => setProjects(data))
//     .catch(err => console.error('An error occurred in getting logs: ', err));
//   }, []);

//   useEffect(() => {
//     if (selectedProject) {
//       fetch(`/api/logs/${selectedProject}`, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       })
//       .then(response => response.json())
//       .catch(err => console.error('An error occurred in getting logs: ', err));
//     }
//   }, [selectedProject]);

//   const handleLogout = () => {
//     if (token) {
//       localStorage.removeItem('token');
//       navigate('/');
//     } else {
//       console.log('No token found in local storage');
//     }
//   }

//   const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const projectName = event.target.value;
//     setSelectedProject(projectName);
//     onProjectSelect(projectName);
//   }

//   const toggleDrawer = () => {
//     setOpen(!isOpen);
//   };

//   const SidebarContent = ({ onClose, ...rest }) => {
//     return (
//       <Box
//         transition="3s ease"
//         bg={useColorModeValue('white', 'gray.900')}
//         borderRight="1px"
//         borderRightColor={useColorModeValue('gray.200', 'gray.700')}
//         w={{ base: 'full', md: 60 }}
//         pos="fixed"
//         h="full"
//         {...rest}>
//         <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
//           <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
//             Logo
//           </Text>
//           <DrawerCloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
//         </Flex>
//         {LinkItems.map((link) => (
//           <NavItem key={link.name} icon={link.icon}>
//             {link.name}
//           </NavItem>
//         ))}
//       </Box>
//     )
//   }

//   const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
//     return (
//       <Box
//         as="a"
//         href="#"
//         style={{ textDecoration: 'none' }}
//         _focus={{ boxShadow: 'none' }}>
//         <Flex
//           align="center"
//           p="4"
//           mx="4"
//           borderRadius="lg"
//           role="group"
//           cursor="pointer"
//           _hover={{
//             bg: 'cyan.400',
//             color: 'white',
//           }}
//           {...rest}>
//           {icon && (
//             <Icon
//               mr="4"
//               fontSize="16"
//               _groupHover={{
//                 color: 'white',
//               }}
//               as={icon}
//             />
//           )}
//           {children}
//         </Flex>
//       </Box>
//     )
//   }

//   return (
//     <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
//       <Flex
//         as="header"
//         align="center"
//         justify="space-between"
//         wrap="wrap"
//         padding="1rem"
//         bg={useColorModeValue('white', 'gray.900')}
//         borderBottomWidth="1px"
//         borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
//       >
//         <IconButton
//           icon={<FiMenu />}
//           aria-label="Open Menu"
//           display={{ base: 'flex', md: 'none' }}
//           onClick={onOpen}
//         />
//         <Text
//           display={{ base: 'flex', md: 'none' }}
//           fontSize="2xl"
//           fontFamily="monospace"
//           fontWeight="bold">
//           Logo
//         </Text>
//         <Box display={{ base: 'none', md: 'flex' }} alignItems="center">
//           <IconButton
//             size="lg"
//             variant="ghost"
//             aria-label="open menu"
//             icon={<FiBell />}
//           />
//           <Menu>
//             <MenuButton as={Button} rightIcon={<FiChevronDown />}>
//             </MenuButton>
//             <MenuList>
//               <MenuItem>Profile</MenuItem>
//               <MenuItem>Settings</MenuItem>
//               <MenuItem>Billing</MenuItem>
//               <MenuDivider />
//               <MenuItem onClick={handleLogout}>Sign out</MenuItem>
//             </MenuList>
//           </Menu>
//         </Box>
//       </Flex>
//       <Drawer
//         isOpen={isOpen}
//         placement="left"
//         onClose={onClose}
//         returnFocusOnClose={false}
//         onOverlayClick={onClose}
//         size="full">
//         <DrawerContent>
//           <SidebarContent onClose={onClose} />
//         </DrawerContent>
//       </Drawer>
//       <Box ml={{ base: 0, md: 60 }} p="4">
//         {/* Main content goes here */}
//       </Box>
//     </Box>
//   );
// };

// export default HeaderAndSidebar;
