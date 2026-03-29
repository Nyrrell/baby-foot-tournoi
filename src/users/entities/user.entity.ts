import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
  Default,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Unique
  @Column(DataType.STRING(100))
  declare username: string;

  @Column(DataType.STRING(255))
  declare password: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare admin: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
