import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { MigrationService } from './database/migration.service';
import { DatabaseModule } from './database/database.module';
import { TournoisModule } from './tournois/tournois.module';
import { EquipesModule } from './equipes/equipes.module';
import { MatchsModule } from './matchs/matchs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  controllers: [],
  providers: [MigrationService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [DatabaseModule, UsersModule, AuthModule, TournoisModule, EquipesModule, MatchsModule],
})
export class AppModule {}
