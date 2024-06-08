import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

// POST /api/tournament
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma.tournament.create({
    data: {
      ...req.body,
    },
  })
  return res.status(201).json(result)
}