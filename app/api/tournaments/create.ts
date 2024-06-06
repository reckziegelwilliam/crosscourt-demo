import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, startDate, endDate, competitionType, scoreType, userId } = req.body;

    const tournament = await prisma.tournament.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        competitionType,
        scoreType,
        createdBy: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(tournament);
  } else {
    res.status(405).json({ message:});
    }
}

