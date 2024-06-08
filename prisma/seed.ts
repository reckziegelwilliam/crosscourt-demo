import { PrismaClient, CompetitionType, ScoreType } from '@prisma/client';
import { hash } from 'bcrypt-ts';

const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}

const prisma = new PrismaClient();



async function main() {
  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      password: await hashPassword('password1'),
      isAdmin: true,
    },
  });


  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: await hashPassword('password2'),
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: await hashPassword('password3'),
    },
  });

  const user4 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: await hashPassword('password4'),
    },
  });

  const user5 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: await hashPassword('password5'),
    },
  });

  const user6 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: await hashPassword('password6'),
    },
  });

  const user7 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: await hashPassword('password7'),
    },
  });

  const user8 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: await hashPassword('password8'),
    },
  });

  // Create a tournament
  const tournament = await prisma.tournament.create({
    data: {
      name: 'Mini Thursday Tourney Test',
      startDate: new Date('2024-06-9T30:00:00.000Z'),
      endDate: new Date('2024-07-12T00:00:00.000Z'),
      competitionType: CompetitionType.SINGLE_ELIMINATION,
      scoreType: ScoreType.TIEBREAKER,
      createdBy: {
        connect: { id: user8.id },
      },
    },
  });

  // Create participants
  await prisma.participant.createMany({
    data: [
      {
        tournamentId: tournament.id,
        userId: user1.id,
        seed: 1,
      },
      {
        tournamentId: tournament.id,
        userId: user2.id,
        seed: 2,
      },
      {
        tournamentId: tournament.id,
        userId: user3.id,
        seed: 3,
      },
      {
        tournamentId: tournament.id,
        userId: user4.id,
        seed: 4,
      },
      {
        tournamentId: tournament.id,
        userId: user5.id,
        seed: 5,
      },
      {
        tournamentId: tournament.id,
        userId: user6.id,
        seed: 6,
      },
      {
        tournamentId: tournament.id,
        userId: user7.id,
        seed: 7,
      },
    ]
  });


  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
