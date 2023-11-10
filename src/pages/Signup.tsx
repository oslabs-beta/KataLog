// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });

//   const navigate = useNavigate();

//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const { username, email, password } = formData;

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make the API request to the server
//       const response = await fetch('/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {

//         localStorage.setItem('token', data.token);

//         // Signup successful, clear the form and display success message
//         setFormData({
//           username: '',
//           email: '',
//           password: ''
//         });
//         setSuccessMessage(data.message);
//         setErrorMessage('');
//         // render Dashboard page after 1.5 seconds
//         setTimeout(() => {navigate('/dashboard')}, 1500);
//       } else if (data && data.err) {
//         // Error message in the expected format
//         setErrorMessage(data.err);
//       } else {
//         // Handle other error formats or set a default error message
//         setErrorMessage('An error occurred');
//       }
//       setSuccessMessage('');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

// return (
//   <Box
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       margin: '0px',
//       height: '100vh',
//       width: '100%'
//     }}
//   >
//     <h1>KataLog</h1>
//     <Typography variant="h5">Signup</Typography>
//     {successMessage && (
//       <Typography variant="body1">
//         {successMessage}
//       </Typography>
//     )}
//     {errorMessage && (
//       <Typography variant="body1" color="error">
//         {errorMessage}
//       </Typography>
//     )}
//     <Box
//       component="form"
//       onSubmit={onSubmit}
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginTop: '20px',
//       }}
//     >
//       <TextField
//         label="Username"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         type="text"
//         name="username"
//         value={username}
//         onChange={onChange}
//       />
//       <TextField
//         label="Email"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         type="text"
//         name="email"
//         value={email}
//         onChange={onChange}
//       />
//       <TextField
//         label="Password"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         type="password"
//         name="password"
//         value={password}
//         onChange={onChange}
//       />
//       <Button type="submit" variant="contained" sx={{ marginTop: '10px' }}>
//         Signup
//       </Button>
//     </Box>
//   </Box>
// );
// };


// export default Signup;

'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AltAppBar from '../components/splashpage/AltAppBar';
import { ChakraProvider } from '@chakra-ui/react';

const Signup = () => {

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
    <ChakraProvider>
      <React.Fragment >
        <AltAppBar />
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.900', 'gray.100') }>
          <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign Up</Heading>
            </Stack>
            <form onSubmit={onSubmit}>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('gray.700', 'white')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input type="username" name="username" value={username} onChange={onChange} />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" value={email} onChange={onChange} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" value={password} onChange={onChange} />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                  </Stack>
                  <Button
                    type='submit'
                    bg={'#316CE6'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign Up
                  </Button>
                </Stack>
              </Stack>
            </Box>
            </form>
          </Stack>
        </Flex>
      </React.Fragment>
    </ChakraProvider>
  );
}

export default Signup;