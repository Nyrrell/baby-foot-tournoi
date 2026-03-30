import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UpdateTournoisDto } from './dto/update-tournois.dto';
import { CreateTournoisDto } from './dto/create-tournois.dto';
import { Equipe } from '../equipes/entities/equipe.entity';
import { Match } from '../matchs/entities/match.entity';
import { Tournoi } from './entities/tournois.entity';

@Injectable()
export class TournoisService {
  constructor(
    @InjectModel(Tournoi) private readonly tournoiModel: typeof Tournoi,
    @InjectModel(Match) private readonly matchModel: typeof Match
  ) {}

  async findAll(): Promise<object[]> {
    const tournois = await this.tournoiModel.findAll({
      include: [{ model: Equipe, attributes: ['id'] }],
      order: [['date', 'DESC']],
    });

    return tournois.map((t) => ({
      id: t.id,
      nom: t.nom,
      date: t.date,
      description: t.description,
      nombreEquipe: t.equipes?.length ?? 0,
    }));
  }

  async findOne(id: number): Promise<Tournoi> {
    const tournoi = await this.tournoiModel.findByPk(id, {
      include: [Equipe],
    });
    if (!tournoi) throw new NotFoundException(`Tournoi #${id} introuvable`);
    const countMatch = await this.matchModel.count({ where: { tournoiId: id } });
    tournoi.hasMatch = countMatch > 0;

    return tournoi;
  }

  async create(dto: CreateTournoisDto): Promise<Tournoi> {
    return this.tournoiModel.create({ ...dto });
  }

  async update(id: number, dto: UpdateTournoisDto): Promise<Tournoi> {
    const tournoi = await this.findOne(id);
    return tournoi.update(dto);
  }

  async remove(id: number): Promise<void> {
    const tournoi = await this.findOne(id);
    await tournoi.destroy();
  }

  async getClassements(id: number): Promise<object[]> {
    const tournoi = await this.tournoiModel.findByPk(id, {
      include: [
        { model: Equipe },
        {
          model: Match,
          required: false,
          include: [
            { model: Equipe, as: 'equipe1Detail' },
            { model: Equipe, as: 'equipe2Detail' },
          ],
        },
      ],
    });

    if (!tournoi) throw new NotFoundException(`Tournoi #${id} introuvable`);

    const totalMatchs = tournoi.matchs?.length ?? 0;
    const matchsParEquipe = totalMatchs > 0 ? tournoi.equipes.length - 1 : 0;

    const classements = tournoi.equipes.map((equipe) => ({
      equipeId: equipe.id,
      equipeNom: equipe.nom,
      victoire: 0,
      defaite: 0,
      aJouer: matchsParEquipe,
    }));

    const classementsMap = new Map(classements.map((s) => [s.equipeId, s]));

    for (const match of tournoi.matchs ?? []) {
      if (!match.matchJouer || match.equipe1Score === null || match.equipe2Score === null) continue;

      const equipe1 = classementsMap.get(match.equipe1);
      const equipe2 = classementsMap.get(match.equipe2);
      if (!equipe1 || !equipe2) continue;

      equipe1.aJouer--;
      equipe2.aJouer--;

      if (match.equipe1Score > match.equipe2Score) {
        equipe1.victoire++;
        equipe2.defaite++;
      } else if (match.equipe1Score < match.equipe2Score) {
        equipe2.victoire++;
        equipe1.defaite++;
      }
      // si égalité on ne compte ni victoire ni défaite
    }

    return classements.sort((a, b) => b.victoire - a.victoire);
  }
}
