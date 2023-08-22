const express = require("express");
const router = express.Router();

const {
  requireAuth,
  requireAdmin,
} = require("../middlewares/authMiddleware");
const {
  getReservations,
  getMyReservations,
  addReservation,
  cancelReservation,
  acceptReservation
} = require("../controllers/reservationController.js");

router.route("/").get(requireAuth, getReservations);
router.route("/my").get(requireAuth, getMyReservations);
router.route("/:id").post(requireAuth, addReservation);
router.route("/cancel/:id").patch(requireAuth, requireAdmin, cancelReservation);
router.route("/accept/:id").patch(requireAuth, requireAdmin, acceptReservation);


module.exports = router;
