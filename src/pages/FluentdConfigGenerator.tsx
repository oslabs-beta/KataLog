import React, { useState, useRef, useEffect } from 'react';
import ace, { Ace } from 'ace-builds';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { mainListItems, secondaryListItems } from '../components/listItems';
import { CssBaseline, Drawer as MuiDrawer, Box, Toolbar, List, Typography, Divider, IconButton, Badge, Container, Grid, Paper, Link } from '@mui/material'
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Notifications as NotificationsIcon, Logout as LogoutIcon } from '@mui/icons-material'
import HeaderAndSidebar from '../components/HeaderAndSidebar';

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
    const [confFile, setConfFile] = useState<string>('');
    const [daemonset, setDaemonset] = useState<string>('');


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
      const newConfFile = `
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
      const newDaemonset = `
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
              image: fluent/fluentd:v1.16.2-debian-arm64-1.0
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

    const generateFiles = () => {
      handleGenerateConfigMap();
      handleGenerateConfFile();
      handleGenerateDaemonset();
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
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex'}}>
        <CssBaseline/>
        <HeaderAndSidebar onProjectSelect={onProjectSelect}/>
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
                        <button onClick={generateFiles}>Generate ConfigMap</button>
                        <AceEditor
                            mode="yaml"
                            theme="monokai"
                            value={confFile}
                            readOnly={true}
                            height="300px"
                            width="100%"
                            setOptions={{
                              showLineNumbers: true,
                              tabSize: 4
                            }}
                            />
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
                            <AceEditor
                            mode="yaml"
                            theme="monokai"
                            value={daemonset}
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
          </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
};

export default FluentdConfigGenerator;
