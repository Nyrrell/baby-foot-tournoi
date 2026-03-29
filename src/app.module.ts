import { Module } from '@nestjs/common';

import { MigrationService } from './database/migration.service';
import { DatabaseModule } from './database/database.module';

@Module({
  controllers: [],
  providers: [MigrationService],
  imports: [DatabaseModule],
})
export class AppModule {}
