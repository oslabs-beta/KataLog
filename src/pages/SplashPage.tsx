import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AppBarBar from '../components/splashpage/AppBarBar';
import Nav from '../components/splashpage/newAppBar';
import Intro from '../components/splashpage/Intro';
import Features from '../components/splashpage/Features';
import Demo from '../components/splashpage/Demo';
import Bryan from '../components/splashpage/Bryan';
import Chuck from '../components/splashpage/Chuck';
import Derrick from '../components/splashpage/Derrick';
import Tom from '../components/splashpage/Tom';
import { Stack, Heading, Text, Container } from '@chakra-ui/react';

function SplashPage() {

  return (
    <ChakraProvider>
      <React.Fragment >
        {/* <AppBarBar /> */}
        <Nav />
        <Intro />
        <Features />
        <Demo />
        <Stack marginTop={150} spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} >
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
            Meet the Team
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'lg' }}>
            The KataLog Team consisting of Bryan Luna, Chuck Franco, Derrick Devairakkam, and Tom Pappas.
          </Text>
        </Stack>
        <Stack marginBottom={150} direction="row" spacing={4} align='center' justify='center'>
          <Bryan />
          <Chuck />
          <Derrick />
          <Tom />
        </Stack>
      </React.Fragment>
    </ChakraProvider>
  );
}

export default SplashPage;