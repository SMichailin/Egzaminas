const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(
        token, process.env.JWT_SECRET
      );
      req.userInfo = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json({
        mess: "Prisijunkite, kad galėtumėte naudotis visomis tinklapio funkcijomis",
      });
    }
  } else {
    res.status(403).json({
      mess: "Prisijunkite, kad galėtumėte naudotis visomis tinklapio funkcijomis",
    });
  }
};
exports.getInfoIfUserExists = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(
        token, process.env.JWT_SECRET
      );
      req.userInfo = decoded;
      next();
    } catch (err) {
      console.log(err);
      next();
    }
  }else{
    next();
  }
};
exports.requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userInfo.id);
    if(user){
      if (user.role == "admin") {
        next();
      } else {
        res.status(403).json({
          mess: "Permission denied",
        });
      }
    }
  } catch (err) {
    res.status(403).json({
      mess: "Permission denied",
    });
  }
};



