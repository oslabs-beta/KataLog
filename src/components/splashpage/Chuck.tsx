'use client'
import React from 'react';

import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    Icon,
  } from '@chakra-ui/react'
  
  import { 
      SiLinkedin,
      SiGithub
  } from "react-icons/si";

  import chuck from '../assets/Chuck.png';

export default function Chuck() {
  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'270px'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          bg={"#316CE6"}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              chuck
            }
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              Chuck Franco
            </Heading>
            <Text color={'gray.500'}>Software Engineer</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack  spacing={0} align={'center'}>
              <a href="https://www.linkedin.com/in/thomaskpappas/" target="_blank" rel="noopener noreferrer">
                <Icon as={SiLinkedin} w={10} h={10} />
              </a>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <a href="https://github.com/chuckfranco" target="_blank" rel="noopener noreferrer">
                <Icon as={SiGithub} w={10} h={10} />
              </a>
            </Stack>
          </Stack>

        </Box>
      </Box>
    </Center>
  )
}