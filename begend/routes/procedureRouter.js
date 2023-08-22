const express = require("express");
const router = express.Router();

const {
  requireAuth,
  requireAdmin,
} = require("../middlewares/authMiddleware");
const {
  getCategories,
  getAllProcedures,
  getProcedure,
  addProcedure,
  deleteProcedure,
  editProcedure
} = require("../controllers/procedureController.js");

const {validateProcedure} = require("../validations/procedureValidation");

router.route("/categories").get(requireAuth, getCategories);

router.route("/").get(requireAuth, getAllProcedures);
router.route("/:id").get(requireAuth, getProcedure);
router.route("/").post(requireAuth, requireAdmin, validateProcedure, addProcedure);
router.route("/:id").delete(requireAuth, requireAdmin, deleteProcedure);
router.route("/:id").patch(requireAuth, requireAdmin, validateProcedure, editProcedure);
module.exports = router;
