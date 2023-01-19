"use strict";

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
    const kendaraan = [
      {
        nama: "Avanza",
        jenis: "Angkutan Orang",
        kepemilikan: "Milik Perusahaan",
        bbm: 200,
        jadwal: "Senin, 08.00-17.00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Truck",
        jenis: "Angkutan Barang",
        kepemilikan: "Milik Perusahaan",
        bbm: 500,
        jadwal: "Selasa, 08.00-17.00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Alphard",
        jenis: "Angkutan Orang",
        kepemilikan: "Sewa",
        bbm: 400,
        jadwal: "Rabu, 08.00-17.00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Truck Volvo",
        jenis: "Angkutan Barang",
        kepemilikan: "Sewa",
        bbm: 700,
        jadwal: "Kamis, 08.00-17.00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return await queryInterface.bulkInsert("Kendaraans", kendaraan);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Kendaraans", null, {});
  },
};
