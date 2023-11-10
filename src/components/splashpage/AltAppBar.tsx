'use client'
import React from 'react';
import { useNavigate } from 'react-router-dom';

import test from '../assets/SmallLogo.png';

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Image
} from '@chakra-ui/react'

import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function AltAppBar() {

  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  }
  
  const handleSignup = () => {
      navigate('/signup');
    }
    
  const handleLogin = () => {
        navigate('/login');
  } 

  const { colorMode, toggleColorMode } = useColorMode()
    
  return (
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={5}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Image
                  w={75}
                  h={75}
                  rounded={'md'}
                  alt={'feature image'}
                  src={
                    test
                  }
                  objectFit={'cover'}
                  onClick={handleHome}
                />

          <Flex alignItems={'center'}>
          <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'} onClick={handleLogin}>
            Log In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={"#316CE6"}
            href={'#'}
            onClick={handleSignup}
            _hover={{
                bg: 'gray.500',
            }}>
            Sign Up
          </Button>
        </Stack>

            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
        </Box>
  )
}