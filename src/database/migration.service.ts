import { InjectConnection } from '@nestjs/sequelize';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import { join } from 'path';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);
  private umzug: Umzug;

  constructor(@InjectConnection() private readonly sequelize: Sequelize) {
    this.umzug = new Umzug({
      migrations: {
        glob: join(__dirname, '../../migrations/*.js'),
      },
      context: this.sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize: this.sequelize }),
      logger: console,
    });
  }

  async up() {
    const pending = await this.umzug.pending();

    if (pending.length === 0) {
      this.logger.log('Pas de migration à faire');
      return;
    }

    await this.umzug.up();
    this.logger.log('Migration effectuée');
  }
}
