import { PrismaClient, CompetitionType, ScoreType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      password: 'password1',
      isAdmin: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: 'password2',
    },
  });

  // Create a tournament
  const tournament = await prisma.tournament.create({
    data: {
      name: 'Summer Tournament',
      startDate: new Date('2024-06-10T00:00:00.000Z'),
      endDate: new Date('2024-06-20T00:00:00.000Z'),
      competitionType: CompetitionType.SINGLE_ELIMINATION,
      scoreType: ScoreType.TIEBREAKER,
      createdBy: {
        connect: { id: user1.id },
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
    ],
  });

  // Create a match
  const match = await prisma.match.create({
    data: {
      tournamentId: tournament.id,
      round: 1,
    },
  });

  // Create match histories
  await prisma.matchHistory.createMany({
    data: [
      {
        matchId: match.id,
        participantId: 1,
        userId: user1.id,
        isWinner: true,
        score: 10,
      },
      {
        matchId: match.id,
        participantId: 2,
        userId: user2.id,
        isWinner: false,
        score: 5,
      },
    ],
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
