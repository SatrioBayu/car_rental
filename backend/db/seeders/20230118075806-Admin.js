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
    const admin = [
      {
        username: "Aditasha",
        password: await bcrypt.hash("12345678", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Hafid",
        password: await bcrypt.hash("12345678", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return await queryInterface.bulkInsert("Admins", admin);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Admins", null, {});
  },
};
