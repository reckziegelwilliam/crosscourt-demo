
import { UsersTable } from './users-table';
import { Search } from './search';
import prisma from '@/lib/prisma';


export default async function IndexPage({
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
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
      </div>
      <div className="w-full mb-4">
        <Search value={searchParams.q} />
      </div>
      <UsersTable users={users} offset={newOffset} />
    </main>
  );
}
