'use client';
import Image from 'next/image';

import { prisma } from '@/lib/prisma';


import { Button } from '@/components/ui/button';

import { UsersTable } from '@/components/tables/users-table';
import { Search } from '@/components/shared/search/search';
import { LoginButton } from '@/components/buttons/login-button';

export default async function Home({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const newOffset = parseInt(offset, 10);

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: search } } as any,
      ]
    },
    take: 10,
    skip: newOffset
  });

  return (
    <main>
      <div className="flex flex-col">
      <div className="flex items-center gap-4">
          <Image
            src={user.image || '/default-profile.png'}
            alt="User profile image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-sm font-semibold">{user.name}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
      </div>
      <section className="flex flex-1 flex-col p-4 md:p-6">
        <div className="flex items-center mb-8">
          <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
        </div>
        <div className="w-full mb-4">
          <Search value={search} />
        </div>
        <UsersTable users={users} offset={offset} />
      </section>
      <LoginButton>
        <Button>
          Sign in
        </Button>
      </LoginButton>
      </div>
    </main>
)};