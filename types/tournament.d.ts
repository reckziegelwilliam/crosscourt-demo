import { CompetitionType, ScoreType } from "@/app/generated/client";

export interface Tournament {
  id: string; // Updated to string
  name: string;
  startDate: Date;
  endDate: Date;
  competitionType: CompetitionType;
  scoreType: ScoreType;
  userId: string; // Updated to string
}

export type ActionError = {
  message: string;
  statusCode?: number;
};