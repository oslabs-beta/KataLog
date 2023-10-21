import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to the server
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful, clear the form and display success message
        setFormData({
          username: '',
          email: '',
          password: ''
        });
        setSuccessMessage(data.message);
        setErrorMessage('');
        // render Login page after 1.5 seconds
        setTimeout(() => {navigate('/projects')}, 1500); // Navigate to the Login page
      } else if (data && data.err) {
        // Error message in the expected format
        setErrorMessage(data.err);
      } else {
        // Handle other error formats or set a default error message
        setErrorMessage('An error occurred');
      }
      setSuccessMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

return (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0px',
      height: '100vh',
      width: '100%'
    }}
  >
    <h1>KataLog</h1>
    <Typography variant="h5">Signup</Typography>
    {successMessage && (
      <Typography variant="body1">
        {successMessage}
      </Typography>
    )}
    {errorMessage && (
      <Typography variant="body1" color="error">
        {errorMessage}
      </Typography>
    )}
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <TextField
        label="Username"
        variant="outlined"
        margin="normal"
        fullWidth
        type="text"
        name="username"
        value={username}
        onChange={onChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        type="text"
        name="email"
        value={email}
        onChange={onChange}
      />
      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <Button type="submit" variant="contained" sx={{ marginTop: '10px' }}>
        Signup
      </Button>
    </Box>
  </Box>
);
};

export default Signup;