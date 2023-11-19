'use client'
import React from 'react';

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp, IoCheckmarkCircleSharp } from 'react-icons/io5'
import { ReactElement } from 'react'
import Demo1 from '../assets/DemoGif1.gif';
import Demo2 from '../assets/DemoGif2.gif';
import Demo3 from '../assets/DemoGif3.gif';
import Demo4 from '../assets/DemoGif4.gif';

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function Demo() {
  return (
    <Container maxW={'5xl'} py={12} marginTop={150}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} marginBottom={50}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Demo
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'lg' }}>
          See below for a detailed description on how to setup KataLog.
        </Text>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          {/* <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text> */}
          <Heading>Simply Create an Account</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Your Account will have all the projects you list meaning you can access your centralized Kubernetes logs
            from multiple clusters that you may have deployed. 
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Seemless account creation'}
            />
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Dashboard for visualization and metrics'}
            />
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'One stop shop for all generated logs'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              Demo1
            }
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} marginTop={50}>
            <Flex>
              <Image
                rounded={'md'}
                alt={'feature image'}
                src={
                  Demo2
                }
                objectFit={'cover'}
              />
            </Flex>
        <Stack spacing={4}>
          {/* <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text> */}
          <Heading>Generate the Files for Your Cluster</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Simple step process for obtaining the needed code to connect to KataLog's UI and to start centralizing your Kubernetes logs
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Navigate to Integrations'}
            />
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Submit your information'}
            />
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Copy the generated files'}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} marginTop={50}>
        <Stack spacing={4}>
          {/* <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text> */}
          <Heading>Integrate the Files into Your Code Base</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Easy file integration into your app running your Kubernetes Cluster
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Create neccessary files'}
            />
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Paste in provided code'}
            />
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Start your Kubernetes Cluster'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              Demo3
            }
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} marginTop={50}>
            <Flex>
              <Image
                rounded={'md'}
                alt={'feature image'}
                src={
                  Demo4
                }
                objectFit={'cover'}
              />
            </Flex>
        <Stack spacing={4}>
          {/* <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text> */}
          <Heading>Interact with Your Logs</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Move through the control plane visualizing where the logs came from and what they are, analyze log metrics, 
            and search and filter logs in a centralized location
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Navigate through the control plane'}
            />
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Analyze log metrics'}
            />
            <Feature
              icon={<Icon as={IoCheckmarkCircleSharp} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Search and filter'}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
    
  )
}