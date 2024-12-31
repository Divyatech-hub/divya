'use-client'


import {
   RiLinkedinFill, 
   RiGithubFill, 
   RiInstagramFill, 
   RiFacebookFill, 
   RiGoogleFill,
   RiCodeFill,
  } from 'react-icons/ri';

import Link from 'next/link';

const icons = [
  {
    path: '/',
    name: <RiLinkedinFill />,
  },
  {
    path: '/',
    name: <RiGithubFill />,
  },
  {
    path: '/',
    name: <RiInstagramFill />,
  },
  {
    path: '/',
    name: <RiGoogleFill />,
  },
  {
    path: '/',
    name: <RiFacebookFill />,
  },
  {
    path: '/',
    name: <RiCodeFill />,
  }
]

const Socials = ({containerStyles, iconStyles}) => {
  return ( 
  <div className={`${containerStyles}`}>
    {icons.map((icon, index) => {
      return (
        <Link href={icon.path} key= {index}>
          <div className= {`${iconStyles}`}>{icon.name}</div>
        </Link>
      );
    })}
  </div>
  );
};

export default Socials
