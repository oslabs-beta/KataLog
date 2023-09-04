const fs = require('fs');

const logController : any = {};

logController.parseLogs = (req, res, next) => {
  fs.readFile('/Users/charlesfrancofranco/Documents/logs/my-app-copy.19700101.log.txt_26.log', 'utf-8', (err, readData) => {
    if (err) {
        return res.status(500).json({ error: 'Failed to read log file' });
    }
    // split readData into indivdual lines
    let logData = readData.split('\n');
  
    const logEntries = logData.map(line => {
      // Define a regular expression pattern to match the components
      const regexPattern = /^(\S+)\s+(\S+)\s+(.*$)/;
      const match = line.match(regexPattern);
  
      if (match) {
          const timestamp = match[1];
          const sourceInfo = match[2];
          const logData = match[3];
  
          try {
              const logObject = JSON.parse(logData);
              return {
                  timestamp,
                  sourceInfo,
                  logObject,
              };
          } catch (e) {
              console.error('Error parsing log JSON:', e);
              return null;
          }
      } else {
          // Handle lines that don't match the expected format
          return null;
      }
    })
    res.locals.data = logEntries;
    return next();
  });
};

module.exports = logController;