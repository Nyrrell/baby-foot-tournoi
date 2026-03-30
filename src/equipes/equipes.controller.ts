import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';

import { CreateEquipeDto } from './dto/create-equipe.dto';
import { EquipesService } from './equipes.service';

@Controller('tournois/:tournoiId/equipes')
export class EquipesController {
  constructor(private readonly equipesService: EquipesService) {}

  @Get()
  findAll(@Param('tournoiId', ParseIntPipe) tournoiId: number) {
    return this.equipesService.findAllByTournoi(tournoiId);
  }

  @Post()
  create(@Param('tournoiId', ParseIntPipe) tournoiId: number, @Body() dto: CreateEquipeDto) {
    return this.equipesService.create(tournoiId, dto);
  }

  @Delete(':equipeId')
  remove(@Param('tournoiId', ParseIntPipe) tournoiId: number, @Param('equipeId', ParseIntPipe) equipeId: number) {
    return this.equipesService.remove(tournoiId, equipeId);
  }
}
