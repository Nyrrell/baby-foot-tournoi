import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Default,
} from 'sequelize-typescript';

import { Tournoi } from '../../tournois/entities/tournois.entity';
import { Equipe } from '../../equipes/entities/equipe.entity';

@Table({ tableName: 'matchs' })
export class Match extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Tournoi)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare tournoiId: number;

  @ForeignKey(() => Equipe)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare equipe1: number;

  @ForeignKey(() => Equipe)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare equipe2: number;

  @AllowNull(true)
  @Default(false)
  @Column(DataType.BOOLEAN)
  declare matchJouer: boolean | null;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.INTEGER)
  declare equipe1Score: number | null;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.INTEGER)
  declare equipe2Score: number | null;

  @BelongsTo(() => Tournoi, { foreignKey: 'tournoiId' })
  declare tournoi: Tournoi;

  @BelongsTo(() => Equipe, { foreignKey: 'equipe1', as: 'equipe1Detail' })
  declare equipe1Detail: Equipe;

  @BelongsTo(() => Equipe, { foreignKey: 'equipe2', as: 'equipe2Detail' })
  declare equipe2Detail: Equipe;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
