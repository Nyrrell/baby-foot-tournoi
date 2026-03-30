import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Tournoi } from '../tournois/entities/tournois.entity';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { Equipe } from './entities/equipe.entity';

@Injectable()
export class EquipesService {
  constructor(
    @InjectModel(Tournoi) private readonly tournoiModel: typeof Tournoi,
    @InjectModel(Equipe) private readonly equipeModel: typeof Equipe
  ) {}

  async findAllByTournoi(tournoiId: number): Promise<Equipe[]> {
    await this.ensureTournoiExists(tournoiId);
    return this.equipeModel.findAll({ where: { tournoiId }, order: [['nom', 'ASC']] });
  }

  async create(tournoiId: number, dto: CreateEquipeDto): Promise<Equipe> {
    await this.ensureTournoiExists(tournoiId);

    const existing = await this.equipeModel.findOne({
      where: { tournoiId, nom: dto.nom },
    });
    if (existing) throw new BadRequestException(`Une équipe "${dto.nom}" existe déjà dans ce tournoi`);

    return this.equipeModel.create({ ...dto, tournoiId });
  }

  async remove(tournoiId: number, equipeId: number): Promise<void> {
    const equipe = await this.equipeModel.findOne({ where: { id: equipeId, tournoiId } });
    if (!equipe) throw new NotFoundException(`Équipe ${equipeId} introuvable`);
    await equipe.destroy();
  }

  private async ensureTournoiExists(tournoiId: number): Promise<void> {
    const tournoi = await this.tournoiModel.findByPk(tournoiId);
    if (!tournoi) throw new NotFoundException(`Tournoi ${tournoiId} introuvable`);
  }
}
