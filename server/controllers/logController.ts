import fs from 'fs';
import Log from '../models/logModel';

// non-pod log types
const sourceTypes = ['apiserver', 'etcd', 'controller-manager', 'proxy', 'scheduler', 'coredns', 'storage-provisioner'];

const logController : any = { sourceTypes: sourceTypes };

logController.parseLogs = (req, res, next) => {
  const pods = {};
  let parsedUsername;
  let parsedProjectName;

  // const LOG_DIR = "/fluentd/logs";

  fs.readFile('/Users/charlesfrancofranco/Codesmith/OSP/KataLog/logs/Example.log', 'utf-8', (err, readData) => {
    if (err) {
        return res.status(500).json({ error: 'Failed to read log file' });
    }
    // split readData into individual lines
    let logData = readData.split('\n');

    const logEntries = logData.map(line => {
      // Define a regular expression pattern to match the components
      const logEntryPattern = /^(\S+)\s+(\S+)\s+(.*$)/;
      const match = line.match(logEntryPattern);

      if (match) {
        const timestamp = match[1];
        const sourceInfo = match[2];
        const logData = match[3];

        let type;
        const podInfo : any = {};

        // see if type is not a pod log
        for (let i = 0; i < logController.sourceTypes.length; i++) {
          if (sourceInfo.includes(logController.sourceTypes[i])) {
            type = logController.sourceTypes[i];
            break;
          }
        }

        // Define a regular expression pattern to match the username and project name
        const usernameProjectPattern = /\.username\.(\w+)\.projectName\.(\w+)/;
        const userProjectMatch = sourceInfo.match(usernameProjectPattern);


        // Store the username and project name in order to store logs in the database later on
        if (userProjectMatch) {
            parsedUsername = userProjectMatch[1];
            parsedProjectName = userProjectMatch[2];
        };

        if (!type) {
          type = "pod";
          const sourceInfoPattern = /kubernetes\.var\.log\.containers\.([^_]+)_([^_]+)_([^\.]+)\.log/;
          const match = sourceInfo.match(sourceInfoPattern);

          if (match) {
            podInfo.podName = match[1];

            // Populates pods obj with the podName, which might need to be converted to a count down the road of functionality calls for it
            if (!pods.hasOwnProperty(match[1])){
              pods[match[1]] = match[1];
            }

            podInfo.namespace = match[2];
            podInfo.containerName = match[3];
          };
        };

        const logDataObject = {
          timestamp,
          sourceInfo,
          type,
          podInfo: {
              podName: podInfo.podName || null,
              namespace: podInfo.namespace || null,
              containerName: podInfo.containerName || null
          },
          username: parsedUsername,
          projectName: parsedProjectName,
          logObject: null  // This will be populated later
      };

        try {
            logDataObject.logObject = JSON.parse(logData);

            return {
              logDataObject
            };
        } catch (e) {
            console.error('Error parsing log JSON:', e);
            return null;
        }
      } else {
        // Handle lines that don't match the expected format
        return null;
      }
    });
    // assign res.locals.data to logEntries
    res.locals.data = logEntries;
    res.locals.username = parsedUsername;
    res.locals.projectName = parsedProjectName;
    // return invocation of next
    return next();
  });
};

logController.getLogs = async (req, res, next) => {

  const logs = await Log.find({project_id: req.params.selectedProject});

  res.locals.logs = logs;
  console.log('logs: ', logs);

  return next();
};


export default logController;
