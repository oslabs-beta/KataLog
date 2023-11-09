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



const Login = () => {

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
<<<<<<< HEAD
        setSuccessMessage(data.message);
        setErrorMessage('');
        // render Dashboard page after 1.5 seconds
        setTimeout(() => {navigate('/projects')}, 1500); // Navigate to the Dashboard page
      } else {
        // Login failed, display the error message
        if (data && data.err) {
          // Error message in the expected format
          setErrorMessage(data.err);
        } else {
        // Handle other error formats or set a default error message
        setErrorMessage('An error occurred');
=======
        // render Dashboard page
        navigate('/dashboard');
>>>>>>> 201015a6b6546cea9d4d3be5fdc4e0a567d55203
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
              <Heading fontSize={'4xl'}>Login</Heading>
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
                    Login
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

export default Login;
