import fs from 'fs';
import Log from '../models/logModel';
import Project from '../models/projectModel'

// non-pod log types
const sourceTypes = ['apiserver', 'etcd', 'controller-manager', 'proxy', 'scheduler', 'coredns', 'storage-provisioner'];

const logController : any = { sourceTypes: sourceTypes };

logController.parseLogs = (req, res, next) => {
  const pods = {};
  let parsedUsername;
  let parsedProjectName;

  fs.readFile('/Users/charlesfrancofranco/Codesmith/OSP/KataLog/logs/my-app-copy.19700101.log.txt_26.log', 'utf-8', (err, readData) => {
    if (err) {
        return res.status(500).json({ error: 'Failed to read log file' });
    }
    // split readData into indivdual lines
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

logController.addLog = async (req, res, next) => {
  try {
    const project = await Project.findOne({ projectName: res.locals.projectName });

    if (!project) {
      return res.status(400).json({ error: `Project with name ${res.locals.projectName} not found` });
    }

    const project_id = project._id;  // Assuming _id is the name of the field holding the project's ID

    for (const outerLogEntry of res.locals.data) {
      // Skip null entries
      if (!outerLogEntry) continue;
      
      // Extract the inner logDataObject
      const logEntry = outerLogEntry.logDataObject;
  
      // Now, extract data from the logEntry
      const { timestamp, sourceInfo, type, podInfo, logObject } = logEntry;
      const log = await Log.create({ timestamp, sourceInfo, type, podInfo, logObject, project_id });
      res.locals.log = log;
    }

    return next();

  } catch (error) {
    return next(error);
  }
};

logController.processRemainingEntriesInCurrentFile = (filePath, pointer) => {
  fs.readFile(filePath, 'utf-8', (err, fullData) => {
    if (err) {
        console.error('Failed to read log file:', err);
        return;
    }

    const remainingData = fullData.substring(pointer);
    const parsedLogs = logController.parseLogData(remainingData);

    // Here, you would persist parsedLogs to your database, or any other action you'd like
    // For example, you might call `logController.addLog` or an adapted version of it
    logController.addLog(parsedLogs);

  });
};

logController.processNewLogEntries = (filePath, pointer) => {
  fs.readFile(filePath, 'utf-8', (err, fullData) => {
      if (err) {
          console.error('Failed to read log file:', err);
          return pointer; // Return the same pointer since there's an error.
      }

      const newData = fullData.substring(pointer);
      const parsedLogs = logController.parseLogData(newData);

      // Here, you would persist parsedLogs to your database, or any other action you'd like
      // For example, you might call `logController.addLog` or an adapted version of it
      logController.addLog(parsedLogs);
      // Update the pointer to the new position
      pointer += Buffer.from(newData, 'utf-8').length;
  });

  return pointer;  // Return the updated pointer.
};

logController.parseLogData = (logDataStr) => {

  const pods = {};
  let parsedUsername;
  let parsedProjectName;

  const parsedLogs : any = [];
  const logData = logDataStr.split('\n');

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
          parsedLogs.push(logDataObject);
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
  // return invocation of next
  console.log('parsedLogs in parseLogData', parsedLogs);
  return parsedLogs;
}



export default logController;
