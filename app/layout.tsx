import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "@/components/ui/toaster";
import { User } from '../components/user/user';
import { LeftSidebar, RightSidebar } from '@/components/nav/sidebars';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between p-4 bg-gray-100/40 dark:bg-gray-800/40 lg:h-[60px] border-b">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image 
              src="/assets/images/site-logo.svg"
              alt="Crosscourt Logo"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="hidden lg:inline">CROSSCOURT</span>
          </Link>
          <User />
        </header>
        <div className="flex flex-1">
          <LeftSidebar />
          <main className="flex-1">
            {/* <Navbar /> */}
            {children}
            <Toaster />
          </main>
          <RightSidebar />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
