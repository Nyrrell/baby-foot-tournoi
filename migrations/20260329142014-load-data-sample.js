'use strict';

/** @type {import('umzug').MigrationFn} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.bulkInsert('tournois', [
      {
        nom: 'Tournoi amical 2026',
        date: new Date(),
        description: 'Premier tournoi de la saison',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const [tournois] = await queryInterface.sequelize.query(
      `SELECT id FROM tournois WHERE nom = 'Tournoi amical 2026' LIMIT 1`
    );
    const tournoiId = tournois[0].id;

    await queryInterface.bulkInsert('equipes', [
      { nom: 'Equipe A', tournoiId, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Equipe B', tournoiId, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Equipe C', tournoiId, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Equipe D', tournoiId, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Equipe E', tournoiId, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Equipe F', tournoiId, createdAt: new Date(), updatedAt: new Date() },
    ]);

    const [equipes] = await queryInterface.sequelize.query(
      `SELECT id, nom FROM equipes WHERE tournoiId = ${tournoiId} ORDER BY id ASC`
    );

    const getId = (name) => equipes.find((t) => t.nom === name).id;

    const equipeA = getId('Equipe A');
    const equipeB = getId('Equipe B');
    const equipeC = getId('Equipe C');
    const equipeD = getId('Equipe D');
    const equipeE = getId('Equipe E');
    const equipeF = getId('Equipe F');

    await queryInterface.bulkInsert('matchs', [
      {
        tournoiId,
        equipe1: equipeA,
        equipe2: equipeB,
        matchJouer: true,
        equipe1Score: 5,
        equipe2Score: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeC,
        equipe2: equipeE,
        matchJouer: true,
        equipe1Score: 3,
        equipe2Score: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeB,
        equipe2: equipeD,
        matchJouer: true,
        equipe1Score: 3,
        equipe2Score: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeA,
        equipe2: equipeF,
        matchJouer: true,
        equipe1Score: 3,
        equipe2Score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeC,
        equipe2: equipeD,
        matchJouer: true,
        equipe1Score: 4,
        equipe2Score: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        tournoiId,
        equipe1: equipeA,
        equipe2: equipeC,
        matchJouer: false,
        equipe1Score: null,
        equipe2Score: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeA,
        equipe2: equipeD,
        matchJouer: false,
        equipe1Score: null,
        equipe2Score: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeA,
        equipe2: equipeE,
        matchJouer: false,
        equipe1Score: null,
        equipe2Score: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeB,
        equipe2: equipeC,
        matchJouer: false,
        equipe1Score: null,
        equipe2Score: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeB,
        equipe2: equipeE,
        matchJouer: false,
        equipe1Score: null,
        equipe2Score: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeB,
        equipe2: equipeF,
        matchJouer: false,
        equipe1Score: null,
        equipe2Score: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeC,
        equipe2: equipeF,
        matchJouer: false,
        equipe1Score: null,
        equipe2Score: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeD,
        equipe2: equipeE,
        matchJouer: false,
        equipe1Score: null,
        equipe2Score: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeD,
        equipe2: equipeF,
        matchJouer: false,
        equipe1Score: null,
        equipe2Score: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tournoiId,
        equipe1: equipeE,
        equipe2: equipeF,
        matchJouer: false,
        equipe1Score: null,
        equipe2Score: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down({ context: queryInterface }) {
    await queryInterface.sequelize.query(`DELETE FROM tournois WHERE nom = 'Championnat Printemps 2024'`);
  },
};
