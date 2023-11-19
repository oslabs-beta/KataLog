import React from 'react';
import '../style.css';
import HexagonIcon from '@mui/icons-material/Hexagon';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';

function Kubelet() {

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen('paper')} sx={{
    '&:hover': {
      backgroundColor: 'white', // Change this to the desired gray color
    },
  }}>
    <div style={{ position: 'relative', color: '#316CE6', fontSize: '15px' }}>
    <HexagonIcon style={{ fontSize: '200px' }} />
    <span style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textTransform: 'none', fontFamily: 'inherit', fontWeight: 'bold',}}>Kubelet</span>
    </div>
      </Button>
    </div>
  );
}

export default Kubelet;