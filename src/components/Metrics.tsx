import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import '../style.css';
import BarChart from './BarChart';




export default function Metrics (props): JSX.Element {

  // Regular expression to match logs as warn, info, and error
  const infoRegex = /info|INFO|information|INFORMATION/;
  const warnRegex = /warn|WARN|warning|WARNING/;
  const errorRegex = /err|ERR|error|ERROR/;


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

  // const [page, setPage] = useState(1);

  const initialLogData: Log[] = [];
  const [logData, setLogData] = useState<Log[]>(initialLogData);

  // Initialize counters for each log level
  const [infoCount, setInfoCount] = useState(0);
  const [warnCount, setWarnCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [okCount, setOkCount] = useState(0);


  // Categorize and prase a single log entry
  function parseEntry(logEntry) {

    // console.log('logs: ', typeof logEntry.logObject.log.log);
    const logMessage: string = logEntry.logObject.log.log;

    // Categorize log message into warn info error and ok
    if (errorRegex.test(logMessage)) {
      // console.log('error')
      setErrorCount((prevCount) => prevCount + 1);
    } else if (warnRegex.test(logMessage)) {
      // console.log('warn')
      setWarnCount((prevCount) => prevCount + 1);
    } else if (infoRegex.test(logMessage)) {
      // console.log('info')
      setInfoCount((prevCount) => prevCount + 1);
    } else setOkCount((prevCount) => prevCount + 1);

    return { errorCount, warnCount, infoCount, okCount };
  }

  // Parse Logs
  const logs = props.logData;



  useEffect(() => {

    // Ensure logData is up to date
    setLogData(props.logData);

    // Reset counts before parsing
    setInfoCount(0);
    setWarnCount(0);
    setErrorCount(0);
    setOkCount(0);

    // Parse log data and get the counts
    for (let i = 0; i < logs.length; i++) {
      parseEntry(logs[i]);
    }
    // const chartLabels = ['INFO', 'WARNING', 'ERROR', 'OK']
    // const chartData = [infoCount, warnCount, errorCount, okCount]



  }, [props.logData,logs]);

  return (
    <React.Fragment>
          <Typography variant="h6" color="white" fontWeight="bold" marginBottom={3}>
            Your Kubernetes Cluster Metrics:
            {/* <div> Information logs: {infoCount}  Error logs: {errorCount} Okaay logs: {okCount}  Warning logs: {warnCount}</div> */}
          </Typography>
          <div>
            {/* <svg ref={svgRef}></svg> */}
            <BarChart data={[infoCount, warnCount, errorCount, okCount]}></BarChart>
          </div>
    </React.Fragment>
  );
}
