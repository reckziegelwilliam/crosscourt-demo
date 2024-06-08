import './globals.css';

import {Providers} from '../context/Providers'

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/shared/nav/Navbar';
import { LeftSidebar, RightSidebar } from '@/components/shared/nav/sidebars';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en" className="h-full bg-gray-50">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <div className="flex flex-1">
            <LeftSidebar />
            <main className="flex-1">
              {children}
              <Toaster />
            </main>
            <RightSidebar />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
