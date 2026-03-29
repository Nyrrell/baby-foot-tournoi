import { Module } from '@nestjs/common';

import { MigrationService } from './database/migration.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [MigrationService],
  imports: [DatabaseModule, UsersModule],
})
export class AppModule {}
