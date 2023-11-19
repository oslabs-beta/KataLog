import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function Login2() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
      });
    
      const navigate = useNavigate();
    
      const { username, password } = formData;
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
          // Make the API request to the server
          const response = await fetch('/api/login', {
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
          <Typography component="h1" variant="h5" color='white'>
            Sign in
          </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    onChange={onChange}
                    value={username}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="UserName"
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
                <TextField
                    onChange={onChange}
                    value={password}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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
                    <FormControlLabel
                    control={<Checkbox value="remember" sx={{ color: '#ffffff' }} />}
                    label="Remember me"
                    sx={{
                        '& .MuiTypography-root': {
                        color: 'white',
                        },
                    }}
                    />
                <Button 
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#316CE6", color: 'white', fontWight: 'bold', textTransform: 'none'}}
                >
                Sign In
                </Button>
                {/* <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid> */}
            </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </div>
  );
}