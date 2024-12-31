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
    path: 'https://www.linkedin.com/in/divyalakshmi-vrps',
    name: <RiLinkedinFill />,
  },
  {
    path: 'https://github.com/Divyatech-hub',
    name: <RiGithubFill />,
  },
  // {
  //   path: '/',
  //   name: <RiInstagramFill />,
  // },
  {
    path: 'https://g.dev/divyalakshmivrps',
    name: <RiGoogleFill />,
  },
  // {
  //   path: '/',
  //   name: <RiFacebookFill />,
  // },
  {
    path: 'https://devpost.com/divyalakshmi5804?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav',
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
