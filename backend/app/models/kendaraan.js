"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kendaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kendaraan.hasMany(models.Pemesanan, {
        foreignKey: "kendaraanId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Kendaraan.init(
    {
      nama: DataTypes.STRING,
      jenis: DataTypes.STRING,
      kepemilikan: DataTypes.STRING,
      bbm: DataTypes.INTEGER,
      jadwal: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Kendaraan",
    }
  );
  return Kendaraan;
};
