import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { MigrationService } from './database/migration.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  controllers: [],
  providers: [MigrationService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [DatabaseModule, UsersModule, AuthModule],
})
export class AppModule {}
