import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';

import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchsService } from './matchs.service';

@Controller()
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @Get('tournois/:tournoiId/matchs')
  findAll(@Param('tournoiId', ParseIntPipe) tournoiId: number) {
    return this.matchsService.findAllByTournoi(tournoiId);
  }

  @Post('tournois/:tournoiId/matchs/generate')
  generate(@Param('tournoiId', ParseIntPipe) tournoiId: number) {
    return this.matchsService.generate(tournoiId);
  }

  @Delete('tournois/:tournoiId/matchs')
  removeAll(@Param('tournoiId', ParseIntPipe) tournoiId: number) {
    return this.matchsService.removeAll(tournoiId);
  }

  @Patch('matchs/:id/score')
  updateScore(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMatchDto) {
    return this.matchsService.updateScore(id, dto);
  }
}
