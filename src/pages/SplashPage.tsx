import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// import ProductCategories from './modules/views/ProductCategories';
// import ProductSmokingHero from './modules/views/ProductSmokingHero';
// import AppFooter from './modules/views/AppFooter';
// import ProductHero from './modules/views/ProductHero';
// import ProductValues from './modules/views/ProductValues';
// import ProductHowItWorks from './modules/views/ProductHowItWorks';
// import ProductCTA from './modules/views/ProductCTA';
import AppBarBar from '../components/splashpage/AppBarBar';
import Intro from '../components/splashpage/Intro';
import Features from '../components/splashpage/Features';
import Team from '../components/splashpage/Team';
import Bryan from '../components/splashpage/Team';
import Chuck from '../components/splashpage/Team';
import Derrick from '../components/splashpage/Team';
import Tom from '../components/splashpage/Team';
import { Stack } from '@chakra-ui/react';
// import withRoot from './modules/withRoot';

function SplashPage() {
  return (
    <ChakraProvider>
      <React.Fragment>
        <AppBarBar />
        <Intro />
        <Features />
        <Stack direction="row" spacing={4} align='center' justify='center'>
          <Chuck />
          <Bryan />
          <Derrick />
          <Tom />
      </Stack>
      </React.Fragment>
    </ChakraProvider>
  );
}

export default SplashPage;