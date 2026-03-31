import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';

import { MigrationService } from './database/migration.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));

  // Migration base de donnée
  const migrationsService = app.get(MigrationService);
  await migrationsService.up();

  app.setGlobalPrefix('api');
  await app.listen({
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST ?? 'localhost',
  });
}
bootstrap();
