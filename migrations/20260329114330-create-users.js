'use strict';

const { DataTypes } = require('sequelize');
const argon2 = require('argon2');
const tableName = 'users';

/** @type {import('umzug').MigrationFn} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    const [adminHash, userHash] = await Promise.all([argon2.hash('nimda'), argon2.hash('resu')]);

    await queryInterface.bulkInsert(tableName, [
      {
        username: 'admin',
        password: adminHash,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user',
        password: userHash,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable(tableName);
  },
};
