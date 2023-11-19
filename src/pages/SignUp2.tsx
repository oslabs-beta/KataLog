import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright © '}
      <Link color='#316CE6' href="https://github.com/oslabs-beta/KataLog" target="_blank">
        KataLog OSP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp2() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
      });
    
      const navigate = useNavigate();
    
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
    
            localStorage.setItem('token', data.token);
    
            // Login successful, clear the form and display success message
            setFormData({
              username: '',
              email: '',
              password: ''
            });
            // render Dashboard page
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
   <div style={{ minHeight: '100vh', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A202C', }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#316CE6' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" color='white' variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField value={username} onChange={onChange}
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  InputProps={{
                    style: { color: 'white' },
                    classes: {
                    notchedOutline: 'customOutline',
                    },
                }}
                InputLabelProps={{
                    style: { color: 'white' },
                }}
                sx={{
                    '& .customOutline': {
                    borderColor: '#316CE6',
                    },
                    '& .Mui-focused .customOutline': {
                    borderColor: '#316CE6',
                    },
                }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField value={email} onChange={onChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    style: { color: 'white' },
                    classes: {
                    notchedOutline: 'customOutline',
                    },
                }}
                InputLabelProps={{
                    style: { color: 'white' },
                }}
                sx={{
                    '& .customOutline': {
                    borderColor: '#316CE6',
                    },
                    '& .Mui-focused .customOutline': {
                    borderColor: '#316CE6',
                    },
                }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField value={password} onChange={onChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    style: { color: 'white' },
                    classes: {
                    notchedOutline: 'customOutline',
                    },
                }}
                InputLabelProps={{
                    style: { color: 'white' },
                }}
                sx={{
                    '& .customOutline': {
                    borderColor: '#316CE6',
                    },
                    '& .Mui-focused .customOutline': {
                    borderColor: '#316CE6',
                    },
                }}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#316CE6", color: 'white', fontWight: 'bold', textTransform: 'none' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                    component={RouterLink}
                    to="/login"
                    onClick={() => {
                        // Use useNavigate to navigate to the specified route
                        navigate('/login');
                    }}
                    color='#316CE6' // Set link color to '#316CE6'
                    variant="body2"
                >
                    Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      </div>
  );
}