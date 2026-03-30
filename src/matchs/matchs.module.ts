import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { Tournoi } from '../tournois/entities/tournois.entity';
import { Equipe } from '../equipes/entities/equipe.entity';
import { MatchsController } from './matchs.controller';
import { MatchsService } from './matchs.service';
import { Match } from './entities/match.entity';

@Module({
  imports: [SequelizeModule.forFeature([Match, Equipe, Tournoi])],
  controllers: [MatchsController],
  providers: [MatchsService],
  exports: [MatchsService],
})
export class MatchsModule {}
