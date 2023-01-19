const { Penyetuju } = require("../models");

const getAllPenyetuju = async (req, res) => {
  try {
    const penyetuju = await Penyetuju.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).send({
      message: "Data penyetuju successfully fetched",
      data: penyetuju,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { getAllPenyetuju };
