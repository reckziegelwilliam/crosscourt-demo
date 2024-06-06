import { PrismaClient } from '@prisma/client';

import { CompetitionType, ScoreType } from '@prisma/client';

export type ActionError = {
  message: string;
  statusCode?: number;
};


const prisma = new PrismaClient();

export const createTournament = async (name: string, startDate: Date, endDate: Date, competitionType: CompetitionType, scoreType: ScoreType, userId: number) => {
  try {
    const newTournament = await prisma.tournament.create({
      data: {
        name,
        startDate,
        endDate,
        competitionType,
        scoreType,
        userId,
      },
    });
    return newTournament;
  } catch (error) {
    throw {
      message: `Error creating tournament: ${(error as Error).message}`,
      statusCode: 500,
    } as ActionError;
  }
};

// Get a tournament by ID
export const getTournamentById = async (id: number) => {
  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id },
    });
    return tournament;
  } catch (error) {
    throw {
      message: `Error fetching tournament: ${(error as Error).message}`,
      statusCode: 500,
    } as ActionError;
  }
};

// Update a tournament's name
export const updateTournamentName = async (id: number, newName: string) => {
  try {
    const updatedTournament = await prisma.tournament.update({
      where: { id },
      data: { name: newName },
    });
    return updatedTournament;
  } catch (error) {
    throw {
      message: `Error updating tournament name: ${(error as Error).message}`,
      statusCode: 500,
    } as ActionError;
  }
};

// Delete a tournament by ID
export const deleteTournament = async (id: number) => {
  try {
    const deletedTournament = await prisma.tournament.delete({
      where: { id },
    });
    return deletedTournament;
  } catch (error) {
    throw {
      message: `Error deleting tournament: ${(error as Error).message}`,
      statusCode: 500,
    } as ActionError;
  }
};
