import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Tournoi } from '../tournois/entities/tournois.entity';
import { Equipe } from '../equipes/entities/equipe.entity';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchsService {
  constructor(
    @InjectModel(Tournoi) private readonly tournoiModel: typeof Tournoi,
    @InjectModel(Equipe) private readonly teamModel: typeof Equipe,
    @InjectModel(Match) private readonly matchModel: typeof Match
  ) {}

  async findAllByTournoi(tournoiId: number): Promise<Match[]> {
    await this.tournoiExists(tournoiId);

    return this.matchModel.findAll({
      where: { tournoiId },
      include: [
        { model: Equipe, as: 'equipe1Detail', attributes: ['id', 'nom'] },
        { model: Equipe, as: 'equipe2Detail', attributes: ['id', 'nom'] },
      ],
      order: [['id', 'ASC']],
    });
  }

  async generate(tournoiId: number): Promise<Match[]> {
    await this.tournoiExists(tournoiId);

    const equipes = await this.teamModel.findAll({ where: { tournoiId } });

    if (equipes.length < 2) {
      throw new BadRequestException('Il faut au moins 2 équipes pour générer les matchs');
    }

    const existingCount = await this.matchModel.count({ where: { tournoiId } });
    if (existingCount > 0) {
      throw new BadRequestException(
        'Des matchs ont déjà été générés pour ce tournoi. Supprimez-les avant de régénérer.'
      );
    }

    const matchs = this.roundRobin(equipes, tournoiId);
    return this.matchModel.bulkCreate(matchs);
  }

  async updateScore(matchId: number, dto: UpdateMatchDto): Promise<Match> {
    const match = await this.matchModel.findByPk(matchId, {
      include: [
        { model: Equipe, as: 'equipe1Detail', attributes: ['id', 'nom'] },
        { model: Equipe, as: 'equipe2Detail', attributes: ['id', 'nom'] },
      ],
    });
    if (!match) throw new NotFoundException(`Match #${matchId} introuvable`);

    return match.update({
      equipe1Score: dto.equipe1Score,
      equipe2Score: dto.equipe2Score,
      matchJouer: true,
    });
  }

  async removeAll(tournoiId: number): Promise<{ deleted: number }> {
    await this.tournoiExists(tournoiId);
    const deleted = await this.matchModel.destroy({ where: { tournoiId } });
    return { deleted };
  }

  private roundRobin(
    equipes: Equipe[],
    tournoiId: number
  ): Array<{ tournoiId: number; equipe1: number; equipe2: number }> {
    const matchs: Array<{
      tournoiId: number;
      equipe1: number;
      equipe2: number;
    }> = [];

    for (let i = 0; i < equipes.length; i++) {
      for (let j = i + 1; j < equipes.length; j++) {
        matchs.push({
          tournoiId,
          equipe1: equipes[i].id,
          equipe2: equipes[j].id,
        });
      }
    }

    return matchs;
  }

  private async tournoiExists(tournoiId: number): Promise<void> {
    const tournoi = await this.tournoiModel.findByPk(tournoiId);
    if (!tournoi) throw new NotFoundException(`Tournoi #${tournoiId} introuvable`);
  }
}
