import React, { useState, useRef, useEffect } from 'react';
import ace, { Ace } from 'ace-builds';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { mainListItems, secondaryListItems } from '../components/listItems';
import { CssBaseline, Drawer as MuiDrawer, Box, Toolbar, List, Typography, Divider, IconButton, Badge, Container, Grid, Paper, Link } from '@mui/material'
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Notifications as NotificationsIcon, Logout as LogoutIcon } from '@mui/icons-material'

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

interface AceEditorProps {
    mode: string;
    theme: string;
    value: string;
    readOnly: boolean;
    height: string;
    width: string;
    setOptions: {
        showLineNumbers: boolean;
        tabSize: number;
    };
}

const AceEditor: React.FC<AceEditorProps> = (props) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const aceEditorRef = useRef<Ace.Editor | null>(null); // Add this reference for the ace editor instance

    useEffect(() => {
        if (editorRef.current) {
            const editor = ace.edit(editorRef.current);
            aceEditorRef.current = editor;  // Store the ace editor instance
            editor.setTheme(`ace/theme/${props.theme}`);
            editor.session.setMode(`ace/mode/${props.mode}`);
            editor.setReadOnly(props.readOnly);
            editor.setValue(props.value, -1);
            editor.setOptions(props.setOptions);

            return () => {
                editor.destroy();
            };
        }
    }, [props]);

    return <div ref={editorRef} style={{ width: props.width, height: props.height }}></div>;
};

const FluentdConfigGenerator: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [projectName, setProjectName] = useState<string>('');
    const [path, setPath] = useState<string>('');
    const [configMap, setConfigMap] = useState<string>('');

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleGenerateConfigMap = () => {
        const newConfigMap = `
          apiVersion: v1
          kind: ConfigMap
          metadata:
            name: fluentd-config
          data:
            fluent.conf: |

              <source>
                @type tail
                path /var/log/containers/*.log
                pos_file /var/log/fluentd-containers.log.pos
                time_format %Y-%m-%dT%H:%M:%S.%NZ
                tag kubernetes.*.username.${username}.projectName.${projectName}
                format json
                read_from_head true
              </source>

              <filter kubernetes.**>
                @type record_transformer
                enable_ruby
                <record>
                  log \${record.to_json}
                </record>
              </filter>

              <match **>
                @type file
                path ${path}
                time_slice_format %Y%m%d
                time_slice_wait 10m
                time_format %Y%m%dT%H%M%S%z
                utc
              </match>`;
        setConfigMap(newConfigMap);
    };

    return (
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex'}}>
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

          </Box>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", color: 'white', }}>
              {/* ***** METRICS ***** */}
              <Grid item xs={12} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 600,
                    marginBottom: "20px",
                    backgroundColor: '#424242',
                  }}
                  >
                  {/* add component here */}
                    <div>
                        <label>
                            Username:   
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Project Name: 
                            <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Path: 
                            <input type="text" value={path} onChange={e => setPath(e.target.value)} />
                        </label>
                        <br />
                        <button onClick={handleGenerateConfigMap}>Generate ConfigMap</button>
                        <AceEditor
                            mode="yaml"
                            theme="monokai"
                            value={configMap}
                            readOnly={true}
                            height="300px"
                            width="100%"
                            setOptions={{
                              showLineNumbers: true,
                              tabSize: 4
                            }}
                            />
                    </div>
                </Paper>
              </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>

      </ThemeProvider>
    );
};

export default FluentdConfigGenerator;
