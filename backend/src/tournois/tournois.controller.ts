import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

import { CreateTournoisDto } from './dto/create-tournois.dto';
import { UpdateTournoisDto } from './dto/update-tournois.dto';
import { TournoisService } from './tournois.service';
import { Public } from '../auth/auth.guard';

@Controller('tournois')
export class TournoisController {
  constructor(private readonly tournoisService: TournoisService) {}

  @Post()
  create(@Body() createTournoisDto: CreateTournoisDto) {
    return this.tournoisService.create(createTournoisDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.tournoisService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tournoisService.findOne(id);
  }

  @Public()
  @Get(':id/classements')
  getClassements(@Param('id', ParseIntPipe) id: number) {
    return this.tournoisService.getClassements(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTournoisDto: UpdateTournoisDto) {
    return this.tournoisService.update(id, updateTournoisDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tournoisService.remove(id);
  }
}
