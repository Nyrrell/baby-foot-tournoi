'use strict';

const { DataTypes } = require('sequelize');
const tableName = 'matchs';

/** @type {import('umzug').MigrationFn} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tournoiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tournois', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      equipe1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'equipes', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      equipe2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'equipes', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      matchJouer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      equipe1Score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      equipe2Score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable(tableName);
  },
};
