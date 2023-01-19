const { Kendaraan, Pemesanan } = require("../models");

const getAllKendaraan = async (req, res) => {
  try {
    const kendaraan = await Kendaraan.findAll({
      order: [["id", "ASC"]],
      include: [
        {
          model: Pemesanan,
          where: {
            status: "Disetujui",
          },
        },
      ],
    });

    return res.status(200).send({
      message: "Kendaraan successfully fetched",
      data: kendaraan,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};

const getKendaraanById = async (req, res) => {
  try {
    const { id } = req.params;
    const kendaraan = await Kendaraan.findByPk(id, {
      include: [
        {
          model: Pemesanan,
          where: {
            status: "Disetujui",
          },
        },
      ],
    });
    if (!kendaraan) {
      return res.status(404).send({
        message: "Data kendaraan not found",
      });
    }
    return res.status(200).send({
      message: "Kendaraan successfully fetched",
      data: kendaraan,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};

module.exports = { getAllKendaraan, getKendaraanById };
