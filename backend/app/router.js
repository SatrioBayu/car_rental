const express = require("express");
const router = express.Router();
const { authenticationController, kendaraanController, pemesananController, penyetujuController } = require("./controller");

router.get("/", (req, res) => {
  res.send({
    message: "Server is running",
  });
});

router.post("/loginAdmin", authenticationController.handleLoginAdmin);
router.get("/profileAdmin", authenticationController.authorizeAdmin, authenticationController.handleGetAdmin);
router.post("/loginPenyetuju", authenticationController.handleLoginPenyetuju);
router.get("/profilePenyetuju", authenticationController.authorizePenyetuju, authenticationController.handleGetPenyetuju);

// Kendaraan
router.get("/vehicles", kendaraanController.getAllKendaraan);
router.get("/vehicles/:id", kendaraanController.getKendaraanById);

// Penyetuju
router.get("/penyetuju", penyetujuController.getAllPenyetuju);

// Pesanan
router.get("/pemesanan", pemesananController.getAllPesanan);
router.get("/pemesananProses", pemesananController.getPesananDiproses);
router.get("/pemesananAcc", pemesananController.getPesananDisetujui);
router.post("/pesanKendaraan", authenticationController.authorizeAdmin, pemesananController.handleInputPemesanan);
router.put("/pesanKendaraan/:id", authenticationController.authorizePenyetuju, pemesananController.handleTerimaPesanan);

module.exports = router;
