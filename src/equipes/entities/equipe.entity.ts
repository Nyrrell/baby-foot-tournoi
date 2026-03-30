import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';

import { Tournoi } from '../../tournois/entities/tournois.entity';
import { Match } from '../../matchs/entities/match.entity';

@Table({ tableName: 'equipes' })
export class Equipe extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare nom: string;

  @ForeignKey(() => Tournoi)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare tournoiId: number;

  @BelongsTo(() => Tournoi, { foreignKey: 'tournoiId' })
  declare tournoi: Tournoi;

  @HasMany(() => Match, { foreignKey: 'equipe1' })
  declare equipe1: Match[];

  @HasMany(() => Match, { foreignKey: 'equipe2' })
  declare equipe2: Match[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
