import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import DangerousIcon from '@mui/icons-material/Dangerous';


export default function Health() {
  return (
    <React.Fragment>
      <Typography variant="h6" color="white" fontWeight="bold" marginBottom={3}>Your Cluster Health Status is: </Typography>
      <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold', color: '#00FF00', textTransform: 'uppercase', marginTop: '20px' }}>
        good
      </Typography>
      <CheckIcon
        style={{
          color: '#00FF00', // Bright green color
          fontSize: '4em',  // Adjust the font size as needed
          fontWeight: 'bold',
          display: 'block', // Centered horizontally
          margin: '0 auto', // Centered horizontally
        }}
      >
      </CheckIcon>

      {/* <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold', color: 'yellow', textTransform: 'uppercase', marginTop: '20px' }}>
        Neutral
      </Typography>
      <WarningIcon
        style={{
          color: 'yellow', // Bright green color
          fontSize: '4em',  // Adjust the font size as needed
          fontWeight: 'bold',
          display: 'block', // Centered horizontally
          margin: '0 auto', // Centered horizontally
        }}
      >
      </WarningIcon> */}

      {/* <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold', color: 'red', textTransform: 'uppercase', marginTop: '20px' }}>
        Poor
      </Typography>
      <DangerousIcon
        style={{
          color: 'red', // Bright green color
          fontSize: '4em',  // Adjust the font size as needed
          fontWeight: 'bold',
          display: 'block', // Centered horizontally
          margin: '0 auto', // Centered horizontally
        }}
      >
      </DangerousIcon> */}
      

    </React.Fragment>
  );
}