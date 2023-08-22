const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.getAllUsers = async (req, res) => {
  const { limit = 0 } = req.query;
  try {
    const allUsers = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: allUsers.length,
      data: {
        users: allUsers,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      mess: err.message,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const GetUser = await User.findById(req.params.id).select("-password");
    if (!GetUser) {
      return res.status(404).json({ status: "error", mess: `Vartotojas id: ${id} neegzistuoja` });
    } else {
      res.status(200).json(GetUser);
    }
  } catch (error) {
    res.status(500).json({ status: "error", mess: err });
  }
};
exports.authRegister = async (req, res) => {
  const userExists = await User.exists({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (userExists) {
    res.status(401).json({
      status: "error",
      mess: "Slapyvardis arba el.paštas užimtas!",
    });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });
      const token = signToken({
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      });
      const { password, ...data } = newUser._doc;
      data.token = token;
      res.status(201).json({
        status: "success",
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "error", mess: err });
    }
  }
};

exports.authLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user &&
      res.status(400).json({
        status: "error",
        mess: "Neteisingas slapyvardis arba slaptažodis",
      });
    if (user) {
      const validatePass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      !validatePass &&
        res.status(400).json({
          status: "error",
          mess: "Neteisingas slapyvardis arba slaptažodis",
        });
      if (validatePass) {
        token = signToken({
          id: user._id,
          role: user.role,
        });
        const { password, ...data } = user._doc;
        res.status(200).json({
          status: "success",
          data: { ...data, token },
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", mess: err });
  }
};

exports.authMe = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userInfo.id });
    !user &&
      res.status(400).json({
        status: "error",
        mess: "Vartotojas nerastas",
      });
    if (user) {
      const { password, ...data } = user._doc;
      res.status(200).json({
        status: "success",
        data: { ...data },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", mess: err });
  }
};
