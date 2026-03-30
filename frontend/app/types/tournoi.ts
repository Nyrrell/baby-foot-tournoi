import type { Equipe } from '~/types/equipe';
import type { Match } from '~/types/match';

export interface Tournoi {
  id: number;
  nom: string;
  date: string;
  description: string;
  nombreEquipe: number;
  hasMatch: boolean;
}

export interface TournoiForm {
  nom: string;
  date: string;
  description: string;
}

export interface TournoiDetail extends Tournoi {
  equipes: Equipe[];
  matchs: Match[];
}
