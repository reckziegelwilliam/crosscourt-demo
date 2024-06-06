import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tournaments = await prisma.tournament.findMany();
    res.status(200).json(tournaments);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
