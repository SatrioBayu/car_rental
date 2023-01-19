"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penyetuju extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penyetuju.hasMany(models.Pemesanan, {
        foreignKey: "penyetujuId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Penyetuju.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Penyetuju",
    }
  );
  return Penyetuju;
};
