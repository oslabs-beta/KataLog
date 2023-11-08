import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '../style.css';
import * as d3 from 'd3';


export default function Metrics (props): JSX.Element {
  const theme = useTheme(); // Look into what this does.

  // Regular expression to match logs as warn, info, and error
  const infoRegex = /\[info\]|\[INFO\]|\[information\]|\[INFORMATION\]/;
  const warnRegex = /\[warning\]|\[WARNING\]|\[warn\]|\[WARN\]/;
  const errorRegex = /\[error\]|\[ERROR\]|\[err\]|\[ERR\]/;

  // Initialize counters for each log level
  let infoCount = 0;
  let warnCount = 0;
  let errorCount = 0;
  let okCount = 0;

  // Categorize and prase a single log entry
  function parseEntry(logEntry) {
    const [timestamp, source, jsonData] = logEntry.split('/t');
    const logData = JSON.parse(jsonData);

    // Extract the log message
    const logMessage = logData.log;

    // Categorize log message into warn info error and ok
    if (infoRegex.test(logMessage)) {
      infoCount++;
    } else if (warnRegex.test(logMessage)) {
      warnCount++;
    } else if (errorRegex.test(logMessage)) {
      errorCount++;
    } else okCount++;
  }

  // Parse Logs
  const logs = props.logData;
  for (const logEntry of logs) {
    parseEntry(logEntry)
  }

  // The graph
  const svgRef = useRef<SVGSVGElement | null>(null); // no clue what this does but basiclly needed for the custom svg tag
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Set up chart dimensions
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Calculate the data for the bar chart
    const data = [
      { level: 'INFO', count: infoCount },
      { level: 'WARNING', count: warnCount },
      { level: 'ERROR', count: errorCount },
    ];

    // Create a scale for the x-axis
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.level))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    // Create a scale for the y-axis
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create the bars
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.level))
      .attr('y', (d) => yScale(d.count))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => yScale(0) - yScale(d.count))
      .attr('fill', (d) => (d.level === 'INFO' ? 'blue' : d.level === 'WARNING' ? 'orange' : 'red'));

    // Create the x-axis
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Create the y-axis
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Add labels
    svg
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d.count)
      .attr('x', (d) => xScale(d.level) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.count) - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px');

  }, [infoCount, warnCount, errorCount, okCount]);

  return (
    <React.Fragment>
          <Typography variant="h6" color="white" fontWeight="bold" marginBottom={3}>
            Your Kubernetes Cluster Metrics:
          </Typography>
          <svg ref={svgRef}></svg>
    </React.Fragment>
  );
}
