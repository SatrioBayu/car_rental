"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pemesanans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      adminId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Admins",
          key: "id",
        },
      },
      penyetujuId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Penyetujus",
          key: "id",
        },
      },
      kendaraanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Kendaraans",
          key: "id",
        },
      },
      namaPeminjam: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Pemesanans");
  },
};
