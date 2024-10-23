import React from 'react';

import Anchor from 'common/Anchor';
import Logo from 'vectors/logo.svg';
import GithubLogo from 'images/github-logo.png';

import { GithubLink, PrimeContent, PrimeHeader } from './styled';
import { Link } from 'react-router-dom';

const Prime: React.FC = () => (
  <>
    <PrimeHeader>
      <Link to={'/'}>Home</Link>
      <Link to={'/pokeman'}>Pokeman</Link>
      <Link to={'/canvas'}>Draw canvas</Link>
    </PrimeHeader>
    <PrimeContent>
      <p>
        Created by{" "}
        <Anchor href="https://github.com/blissuche90">@Bliss Uche</Anchor> and
        maintained by{" "}
        <Anchor href="https://github.com/savannahtech">SavanahTech</Anchor>
      </p>
      <GithubLink
        href="https://github.com/savannah-tech-recruitment/dataspan-react-frontend"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={GithubLogo} alt="github" />
      </GithubLink>
    </PrimeContent>
  </>
);

export default Prime;
