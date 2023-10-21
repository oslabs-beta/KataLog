import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ margin: '0px' }}
    >
      <h1>Welcome to KataLog!</h1>
      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={handleLoginClick}>
          Login
        </Button>
        <Button variant="contained" onClick={handleSignupClick}>
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Homepage;