import type { Equipe } from '~/types/equipe';

export interface Match {
  id: number;
  tournoiId: number;
  equipe1Id: number;
  equipe2Id: number;
  equipe1Score: number | null;
  equipe2Score: number | null;
  matchJouer: boolean;
  equipe1Detail: Equipe;
  equipe2Detail: Equipe;
}

export interface ScoreForm {
  equipe1Score: number;
  equipe2Score: number;
}
