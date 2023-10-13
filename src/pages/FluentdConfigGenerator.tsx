import React, { useState, useRef, useEffect } from 'react';
import ace, { Ace } from 'ace-builds';

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
    );
};

export default FluentdConfigGenerator;
