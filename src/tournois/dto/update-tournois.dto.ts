import { PartialType } from '@nestjs/mapped-types';
import { CreateTournoisDto } from './create-tournois.dto';

export class UpdateTournoisDto extends PartialType(CreateTournoisDto) {
  nom?: string;
  date?: string;
  description?: string;
}
