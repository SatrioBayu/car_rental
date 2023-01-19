const { Pemesanan, Kendaraan, Admin, Penyetuju } = require("../models");

const handleInputPemesanan = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { penyetujuId, kendaraanId, namaPeminjam, status } = req.body;

    const pesanan = await Pemesanan.create({
      adminId,
      penyetujuId,
      kendaraanId,
      namaPeminjam,
      status,
    });

    return res.status(200).send({
      message: "Pesanan Kendaraan Telah Diproses",
      data: pesanan,
    });
  } catch (error) {
    return res.status(400).send({
      errors: error.message,
    });
  }
};

const handleTerimaPesanan = async (req, res) => {
  try {
    const { id } = req.params;
    const penyetujuId = req.user.id;
    const { status } = req.body;

    const exist = await Pemesanan.findOne({
      where: {
        id,
        penyetujuId,
      },
    });

    if (!exist) {
      return res.status(404).send({
        message: "Data pemesanan not found",
      });
    }

    const updated = await exist.update({
      status,
    });

    return res.status(200).send({
      message: "Data pesanan has been updated",
      data: updated,
    });
  } catch (error) {
    return res.status(400).send({
      errors: error.message,
    });
  }
};

const getAllPesanan = async (req, res) => {
  try {
    const pesanan = await Pemesanan.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Kendaraan,
          attributes: ["nama", "jenis", "kepemilikan"],
        },
        {
          model: Admin,
          attributes: ["username"],
        },
        {
          model: Penyetuju,
          attributes: ["username"],
        },
      ],
    });

    return res.status(200).send({
      message: "Data pemesanan successfully fetched",
      data: pesanan,
    });
  } catch (error) {
    return res.status(400).send({
      errors: error.message,
    });
  }
};

const getPesananDiproses = async (req, res) => {
  try {
    const pesanan = await Pemesanan.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        status: "Diproses",
      },
      include: [
        {
          model: Kendaraan,
          attributes: ["nama", "jenis", "kepemilikan"],
        },
        {
          model: Admin,
          attributes: ["username"],
        },
        {
          model: Penyetuju,
          attributes: ["username"],
        },
      ],
    });
    return res.status(200).send({
      message: "Data pemesanan successfully fetched",
      data: pesanan,
    });
  } catch (error) {
    return res.status(400).send({
      errors: error.message,
    });
  }
};

const getPesananDisetujui = async (req, res) => {
  try {
    const pesanan = await Pemesanan.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        status: "Disetujui",
      },
      include: [
        {
          model: Kendaraan,
          attributes: ["nama", "jenis", "kepemilikan"],
        },
        {
          model: Admin,
          attributes: ["username"],
        },
        {
          model: Penyetuju,
          attributes: ["username"],
        },
      ],
    });
    return res.status(200).send({
      message: "Data pemesanan successfully fetched",
      data: pesanan,
    });
  } catch (error) {
    return res.status(400).send({
      errors: error.message,
    });
  }
};

module.exports = { handleInputPemesanan, handleTerimaPesanan, getAllPesanan, getPesananDiproses, getPesananDisetujui };
