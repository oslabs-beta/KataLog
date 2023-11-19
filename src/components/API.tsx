import React from 'react';
import '../style.css';
import HexagonIcon from '@mui/icons-material/Hexagon';
import Button from '@mui/material/Button';

function API(props) {
  return (
    <div >
      <Button onClick={props.hexagonClick} sx={{
        '&:hover': {
          backgroundColor: 'white', 
        },
      }}>
        <div style={{ position: 'relative', color: '#316CE6', fontSize: '15px' }}>
          <HexagonIcon style={{ fontSize: '200px' }} />
          <span style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textTransform: 'none', fontFamily: 'inherit', fontWeight: 'bold',}}>API</span>
        </div>
      </Button>
    </div>
  );
}

export default API;