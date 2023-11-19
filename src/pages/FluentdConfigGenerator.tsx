import React, { useState, useRef, useEffect } from 'react';
import ace, { Ace } from 'ace-builds';
import 'ace-builds/src-noconflict/theme-dreamweaver';
import 'ace-builds/src-noconflict/theme-chaos'
import 'ace-builds/src-noconflict/theme-dracula'
// import { createTheme, CssBaseline, Toolbar, ThemeProvider, Container, Box, Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { CssBaseline, Toolbar, ThemeProvider, Container, Box, Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import HeaderAndSidebar from '../components/HeaderAndSidebar';


const token = localStorage.getItem('token');

// const defaultTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#316CE6', // Set the primary color to the focus color
//     },
//   },
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: 'white', // default
//             },
//             '&:hover fieldset': {
//               borderColor: 'white', // hover
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: '#316CE6', // focused
//             },
//             '& input': {
//               color: 'white', // text color
//             },
//             '& label': {
//               color: 'white', // label color
//             },
//           },
//         },
//       },
//     },
//   },
// });

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
    const [confFile, setConfFile] = useState<string>('');
    const [daemonset, setDaemonset] = useState<string>('');
    const [fluentdImage, setFluentdImage] = useState<string>('fluent/fluentd:v1.16.2-debian-1.0');


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
    const [numberOfLogs, setNumberOfLogs] = useState(0)
  
    const [selectedProject, setSelectedProject] = useState<String>('');

    const fluentdImages = [
      { label: 'Alpine (x86_64)', value: 'fluent/fluentd:v1.16.2-1.0' },
      { label: 'Debian (multiarch: arm64, amd64)', value: 'fluent/fluentd:v1.16.2-debian-1.0' },
      { label: 'Debian (arm64)', value: 'fluent/fluentd:v1.16.2-debian-arm64-1.0' },
      { label: 'Debian (armhf)', value: 'fluent/fluentd:v1.16.2-debian-armhf-1.0' },
      { label: 'Windows 2019 (ltsc2019)', value: 'fluent/fluentd:v1.16.2-windows-ltsc2019-1.0' },
      { label: 'Windows 2022 (ltsc2022)', value: 'fluent/fluentd:v1.16.2-windows-ltsc2022-1.0' },
  ];


    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleGenerateConfigMap = () => {
      const newConfigMap = 
        `
        apiVersion: v1
        kind: ConfigMap
        metadata:
          name: fluentd-config
        data:
          fluent.conf: |
  
            <source>
              @type tail
              path "/var/log/containers/*.log"
              exclude_path "/var/log/containers/*fluentd*.log"
              pos_file "/var/log/fluentd-containers.log.pos"
              tag "kubernetes.*.username.${username}.projectName.${projectName}"
              format json
              read_from_head true
            </source>
  
            <filter **>
              @type record_transformer
              enable_ruby
              <record>
                tag \${tag}
                combined_log \${Time.now.strftime('%Y-%m-%dT%H:%M:%S%z')} \${tag} \${record.to_json}
              </record>
            </filter>
  
            <match **>
                @type http
                endpoint http://44.194.156.154/logs
                open_timeout 2
                <buffer>
                  flush_interval 10s
                  chunk_limit_size 1m
                  total_limit_size 10m
                </buffer>
            </match>`;
      setConfigMap(newConfigMap);
  };
  
    const handleGenerateConfFile = () => {
      const newConfFile = 
      `
      <source>
        @type tail
        path "/var/log/containers/*.log"
        exclude_path "/var/log/containers/*fluentd*.log"
        pos_file "/var/log/fluentd-containers.log.pos"
        tag "kubernetes.*.username.${username}.projectName.${projectName}"
        format json
        read_from_head true
      </source>

      <filter **>
        @type record_transformer
        enable_ruby
        <record>
          tag \${tag}
          combined_log \${Time.now.strftime('%Y-%m-%dT%H:%M:%S%z')} \${tag} \${record.to_json}
        </record>
      </filter>

      <match **>
          @type http
          endpoint http://44.194.156.154/logs
          open_timeout 2
          <buffer>
            flush_interval 10s
            chunk_limit_size 1m
            total_limit_size 10m
          </buffer>
      </match>`;
      setConfFile(newConfFile);
    };

    const handleGenerateDaemonset = () => {
      const newDaemonset = 
      `
      apiVersion: apps/v1
      kind: DaemonSet
      metadata:
        name: fluentd
        labels:
          k8s-app: fluentd-logging
      spec:
        selector:
          matchLabels:
            k8s-app: fluentd-logging
        template:
          metadata:
            labels:
              k8s-app: fluentd-logging
          spec:
            containers:
            - name: fluentd
              image: ${fluentdImage}
              imagePullPolicy: Always
              securityContext:
                runAsUser: 0
              volumeMounts:
              - name: varlog
                mountPath: /var/log
              - name: config-volume
                mountPath: /fluentd/etc
              - name: plugin-volume
                mountPath: /fluentd/plugins
            terminationGracePeriodSeconds: 30
            volumes:
            - name: varlog
              hostPath:
                path: /var/log
            - name: config-volume
              configMap:
                name: fluentd-config
            - name: plugin-volume
              emptyDir: {}
            `
      setDaemonset(newDaemonset);
    }

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const postProject = async () => {

      console.log(projectName);
      try {
        // Make the API request to the server
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({projectName})
        });
        
        const data = await response.json();
        
        if (response.ok) {
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


    const generateFiles = () => {
      handleGenerateConfigMap();
      handleGenerateConfFile();
      handleGenerateDaemonset();
      postProject();
    }

    const onProjectSelect = (projectName: string) => {
      fetch(`/api/logs/${projectName}`)
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
    };
  

    return (
        <Box sx={{ display: 'flex'}}>
        <CssBaseline/>
        <HeaderAndSidebar onProjectSelect={onProjectSelect}/>
        <Box
          component="main"
          sx={{
            backgroundColor: '#1A202C',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ backgroundColor:'#1A202C', mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#181923', }}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Username"
                      variant="outlined"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Project Name"
                      variant="outlined"
                      value={projectName}
                      onChange={e => setProjectName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="fluentd-image-label">Fluentd Image</InputLabel>
                    <Select
                      labelId="fluentd-image-label"
                      value={fluentdImage}
                      label="Fluentd Image"
                      onChange={e => setFluentdImage(e.target.value as string)}
                    >
                      {fluentdImages.map((image) => (
                        <MenuItem key={image.value} value={image.value}>
                          {image.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={generateFiles}
                    sx={{ mt: 2, backgroundColor: '#316CE6' }}
                  >
                    Generate Fluentd Configuration Files
                  </Button>
                  <br></br>
                  <Typography variant="subtitle1" gutterBottom>
                    File name: default.conf
                  </Typography>
                  <AceEditor
                    mode="yaml"
                    theme="dracula"
                    value={confFile}
                    readOnly={true}
                    height="400px"
                    width="100%"
                    setOptions={{
                      showLineNumbers: true,
                      tabSize: 2
                    }}
                  />
                  <br></br>
                  <Typography variant="subtitle1" gutterBottom>
                    File name: fluentd-configmap.yaml
                  </Typography>
                    <AceEditor
                    mode="yaml"
                    theme="dracula"
                    value={configMap}
                    readOnly={true}
                    height="400px"
                    width="100%"
                    setOptions={{
                      showLineNumbers: true,
                      tabSize: 2
                    }}
                    />
                    <br></br>
                    <Typography variant="subtitle1" gutterBottom>
                    File name: fluentd-daemonset.yaml
                  </Typography>
                    <AceEditor
                    mode="yaml"
                    theme="dracula"
                    value={daemonset}
                    readOnly={true}
                    height="400px"
                    width="100%"
                    setOptions={{
                      showLineNumbers: true,
                      tabSize: 2
                    }}
                    />
                </Paper>
              </Grid>
            </Grid>
          </Container>
          </Box>
        </Box>
    );
};

export default FluentdConfigGenerator;



