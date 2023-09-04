const fs = require('fs');

// non-pod log types
const sourceTypes = ['apiserver', 'etcd', 'controller-manager', 'proxy', 'scheduler', 'coredns', 'storage-provisioner'];

const logController : any = { sourceTypes: sourceTypes };

logController.parseLogs = (req, res, next) => {
  const pods = {};

  fs.readFile('/Users/charlesfrancofranco/Documents/logs/my-app-copy.19700101.log.txt_26.log', 'utf-8', (err, readData) => {
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

        try {
            const logObject = JSON.parse(logData);
            return {
                timestamp,
                sourceInfo,
                type,
                podInfo,
                logObject
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
    // return invocation of next
    return next();
  });
};

module.exports = logController;