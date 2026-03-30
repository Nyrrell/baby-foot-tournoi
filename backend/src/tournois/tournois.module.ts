import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { TournoisController } from './tournois.controller';
import { Equipe } from '../equipes/entities/equipe.entity';
import { Match } from '../matchs/entities/match.entity';
import { TournoisService } from './tournois.service';
import { Tournoi } from './entities/tournois.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tournoi, Equipe, Match])],
  controllers: [TournoisController],
  providers: [TournoisService],
  exports: [TournoisService],
})
export class TournoisModule {}
