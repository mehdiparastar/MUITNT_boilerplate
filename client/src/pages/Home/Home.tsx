import React, { ReactElement, FC } from 'react';
import { Container } from '@mui/material';
import { Auth0Features } from '../../components/Auth0Features/Auth0Features';
import { HeroBanner } from '../../components/HeroBanner/HeroBanner';

const Home: FC<any> = (): ReactElement => (
  <Container maxWidth="lg">
    <HeroBanner />
    <Auth0Features />
  </Container>
);

export default Home;
