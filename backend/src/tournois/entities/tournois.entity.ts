import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';

import { Equipe } from '../../equipes/entities/equipe.entity';
import { Match } from '../../matchs/entities/match.entity';

@Table({ tableName: 'tournois' })
export class Tournoi extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare nom: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare date: Date;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare description: string | null;

  @HasMany(() => Equipe, { foreignKey: 'tournoiId', onDelete: 'CASCADE' })
  declare equipes: Equipe[];

  @HasMany(() => Match, { foreignKey: 'tournoiId', onDelete: 'CASCADE' })
  declare matchs: Match[];

  @Column(DataType.VIRTUAL)
  declare hasMatch: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
