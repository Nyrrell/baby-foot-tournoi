'use strict';

const { DataTypes } = require('sequelize');
const tableName = 'equipes';

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
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tournoiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tournois', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
