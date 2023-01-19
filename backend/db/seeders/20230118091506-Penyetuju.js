"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const penyetuju = [
      {
        username: "Bayu",
        password: await bcrypt.hash("12345678", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return await queryInterface.bulkInsert("Penyetujus", penyetuju);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Penyetujus", null, {});
  },
};
