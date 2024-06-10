"use server";

import { db } from "@/lib/db";
import { CompetitionType, ScoreType } from "@/app/generated/client";
import { Tournament, ActionError } from "@/types/tournament"; // Import types

// Create a new tournament
export const createTournament = async (
  name: string,
  startDate: Date,
  endDate: Date,
  competitionType: CompetitionType,
  scoreType: ScoreType,
  userId: string
): Promise<Tournament> => {
  try {
    const newTournament = await db.tournament.create({
      data: {
        name,
        startDate,
        endDate,
        competitionType,
        scoreType,
        userId,
      },
    });
    return newTournament as Tournament;
  } catch (error) {
    throw {
      message: `Error creating tournament: ${(error as Error).message}`,
      statusCode: 500,
    } as ActionError;
  }
};

// Get a tournament by ID
export const getTournamentById = async (id: string): Promise<Tournament | null> => {
  try {
    const tournament = await db.tournament.findUnique({
      where: { id },
    });
    return tournament as Tournament | null;
  } catch (error) {
    throw {
      message: `Error fetching tournament: ${(error as Error).message}`,
      statusCode: 500,
    } as ActionError;
  }
};

// Update a tournament's name
export const updateTournamentName = async (id: string, newName: string): Promise<Tournament> => {
  try {
    const updatedTournament = await db.tournament.update({
      where: { id },
      data: { name: newName },
    });
    return updatedTournament as Tournament;
  } catch (error) {
    throw {
      message: `Error updating tournament name: ${(error as Error).message}`,
      statusCode: 500,
    } as ActionError;
  }
};

// Delete a tournament by ID
export const deleteTournament = async (id: string): Promise<Tournament> => {
  try {
    const deletedTournament = await db.tournament.delete({
      where: { id },
    });
    return deletedTournament as Tournament;
  } catch (error) {
    throw {
      message: `Error deleting tournament: ${(error as Error).message}`,
      statusCode: 500,
    } as ActionError;
  }
};
