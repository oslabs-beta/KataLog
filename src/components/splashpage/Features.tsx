'use client'
import React from 'react';
import { useRef } from 'react';

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from 'react-icons/fc'

import { 
    MdFilterAlt,
    MdRemoveRedEye,
    MdNotes,
    MdSearch,
    MdStackedBarChart,
    MdHealthAndSafety


} from "react-icons/md";

interface CardProps {
  heading: string
  description: string
  icon: ReactElement
  href: string
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}>
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue("#316CE6", "#316CE6")}>
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
        
      </Stack>
    </Box>
  )
}

export default function Features() {

const featuresRef = useRef(null);
  return (
    <Box p={4} ref={featuresRef}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Key Features
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Here are the highlights of some features that KataLog has to offer.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Centralization'}
            icon={<Icon as={MdNotes} w={10} h={10} />}
            description={'All logs from all components in your Kubernetes Control Plane all in one place.'}
            href={'#'}
          />
          <Card
            heading={'Visualization'}
            icon={<Icon as={MdRemoveRedEye} w={10} h={10} />}
            description={'Visualization of logs appearing in a seemless user interface. \n'}
            href={'#'}
          />
          <Card
            heading={'Filtering'}
            icon={<Icon as={MdFilterAlt} w={10} h={10} />}
            description={'Ability to filter logs by source with integrated visualization. \n'}
            href={'#'}
          />
          <Card
            heading={'Searching'}
            icon={<Icon as={MdSearch} w={10} h={10} />}
            description={'All rendered logs have search capability by key word.'}
            href={'#'}
          />
          <Card
            heading={'Metrics'}
            icon={<Icon as={MdStackedBarChart} w={10} h={10} />}
            description={'Graphs of error, warning, info, and okay logs that have been generated.'}
            href={'#'}
          />
          <Card
            heading={'Health'}
            icon={<Icon as={MdHealthAndSafety} w={10} h={10} />}
            description={'Basic notice of the state of health of the Kubernetes Cluster that is running.'}
            href={'#'}
          />
        </Flex>
      </Container>
    </Box>
  )
}