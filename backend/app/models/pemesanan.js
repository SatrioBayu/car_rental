"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pemesanan.belongsTo(models.Admin, {
        foreignKey: "adminId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Pemesanan.belongsTo(models.Penyetuju, {
        foreignKey: "penyetujuId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Pemesanan.belongsTo(models.Kendaraan, {
        foreignKey: "kendaraanId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Pemesanan.init(
    {
      adminId: DataTypes.INTEGER,
      penyetujuId: DataTypes.INTEGER,
      kendaraanId: DataTypes.INTEGER,
      namaPeminjam: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pemesanan",
    }
  );
  return Pemesanan;
};
