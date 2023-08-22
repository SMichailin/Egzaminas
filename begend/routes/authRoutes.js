const express = require("express");
const router = express.Router();
const {
  authRegister,
  authLogin,
  authMe,
  getAllUsers,
  getUser,
} = require("../controllers/authController");
const {
  requireAuth,
  requireAdmin,
} = require("../middlewares/authMiddleware");
const {validateRegister} = require("../validations/authValidation");
router.route("/register").post(validateRegister, authRegister);
router.route("/login").post(authLogin);
router.route("/me").get(requireAuth, authMe);
router.route("/").get(requireAuth, requireAdmin, getAllUsers);
router.route("/:id").get(requireAuth, requireAdmin, getUser);
module.exports = router;
