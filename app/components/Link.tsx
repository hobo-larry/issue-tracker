'use client';

import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode; // allow icons/spans too
//   className?: string;
//   target?: string;
//   rel?: string;
//   prefetch?: boolean;
}

const Link = ({ href, children }: Props) => {
  return (
    <RadixLink asChild>
      <NextLink
        href={href}
       
      >
        {children}
      </NextLink>
    </RadixLink>
  );
};

export default Link;
