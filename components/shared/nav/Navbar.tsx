'use client';
import React from 'react';
import Image from 'next/image';
import { LoginButton } from '@/components/buttons/login-button';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100/40 dark:bg-gray-800/40 lg:h-[60px] border-b">
      <div className="flex items-center gap-2 font-semibold">
        <Image 
          src="/assets/images/site-logo.svg"
          alt="Crosscourt Logo"
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="hidden lg:inline">CROSSCOURT</span>
      </div>
      <div className="flex justify-end">
          <LoginButton>
            <Button variant="outline">
              Sign in
            </Button>
          </LoginButton>
        </div>
    </nav>
  );
};

export default Navbar;
