"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Kendaraans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kepemilikan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bbm: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jadwal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Kendaraans");
  },
};
