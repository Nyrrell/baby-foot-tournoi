import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { Tournoi } from '../tournois/entities/tournois.entity';
import { EquipesController } from './equipes.controller';
import { EquipesService } from './equipes.service';
import { Equipe } from './entities/equipe.entity';

@Module({
  imports: [SequelizeModule.forFeature([Equipe, Tournoi])],
  controllers: [EquipesController],
  providers: [EquipesService],
  exports: [EquipesService],
})
export class EquipesModule {}
