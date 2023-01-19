const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin, Penyetuju } = require("../models");

const authorizeAdmin = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).send({
        message: "No Token Provided",
      });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "Admin") {
      return res.status(401).send({
        message: "Token Unauthorized",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send({
      errors: error.message,
    });
  }
};

const authorizePenyetuju = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).send({
        message: "No Token Provided",
      });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "Penyetuju") {
      return res.status(401).send({
        message: "Token Unauthorized",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send({
      errors: error.message,
    });
  }
};

const handleGetAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.user.id);
    if (!admin) {
      return res.status(404).send({
        message: "Data not found",
      });
    }
    res.status(200).send({
      message: "Successfully get user",
      user: admin,
      role: req.user.role,
    });
  } catch (error) {
    return res.status(400).send({
      errors: error.message,
    });
  }
};

const handleGetPenyetuju = async (req, res) => {
  try {
    const penyetuju = await Penyetuju.findByPk(req.user.id);
    res.status(200).send({
      message: "Successfully get user",
      user: penyetuju,
      role: req.user.role,
    });
  } catch (error) {
    return res.status(400).send({
      errors: error.message,
    });
  }
};

const handleLoginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({
      where: {
        username,
      },
    });
    if (!admin) {
      return res.status(404).send({
        errors: "Username/Password salah",
      });
    }

    const isPasswordCorrect = await verifyPassword(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({
        errors: "Username/Password salah",
      });
    }

    const token = createTokenAdmin(admin);
    return res.status(200).send({
      token,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const handleLoginPenyetuju = async (req, res) => {
  try {
    const { username, password } = req.body;

    const penyetuju = await Penyetuju.findOne({
      where: {
        username,
      },
    });
    if (!penyetuju) {
      return res.status(404).send({
        errors: "Username/Password salah",
      });
    }

    const isPasswordCorrect = await verifyPassword(password, penyetuju.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({
        errors: "Username/Password salah",
      });
    }

    const token = createTokenPenyetuju(penyetuju);
    return res.status(200).send({
      token,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const verifyPassword = async (password, encryptedPassword) => {
  return await bcrypt.compare(password, encryptedPassword);
};

const createTokenAdmin = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: "Admin",
    },
    process.env.JWT_SECRET
  );
};

const createTokenPenyetuju = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: "Penyetuju",
    },
    process.env.JWT_SECRET
  );
};

module.exports = { handleLoginAdmin, authorizeAdmin, handleGetAdmin, handleLoginPenyetuju, authorizePenyetuju, handleGetPenyetuju };
