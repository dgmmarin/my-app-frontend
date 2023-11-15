import React, { FC } from 'react';
import { HomeWrapper } from './Home.styled';
import { Counter } from '../counter/Counter';

interface HomeProps { }

const Home: FC<HomeProps> = () => (
   <HomeWrapper data-testid="Home">
      Home Component
      <Counter />
   </HomeWrapper>
);

export default Home;
