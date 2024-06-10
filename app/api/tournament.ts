import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'

// POST /api/tournament
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await db.tournament.create({
    data: {
      ...req.body,
    },
  })
  return res.status(201).json(result)
}