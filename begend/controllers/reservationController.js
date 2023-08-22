const Procedure = require("../models/procedureModel");
const Reservation = require("../models/reservationModel");
const User = require("../models/userModel");

exports.getReservations = async (req, res) => {
  try {
    const allReservations = await Reservation.find()
      .populate({
        path: "procedure",
        model: "procedure",
      })
      .populate({ path: "user", select: "username", model: "user" });

    res.status(200).json({
      status: "success",
      data: {
        reservations: allReservations,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getMyReservations = async (req, res) => {
    try {
      const allReservations = await Reservation.find({user: req.userInfo.id})
        .populate({
          path: "procedure",
          model: "procedure",
        })
        .populate({ path: "user", select: "username", model: "user" });
  
      res.status(200).json({
        status: "success",
        data: {
          reservations: allReservations,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };

exports.addReservation = async (req, res) => {
  const { id } = req.params;

  if(!req.body.date){
    return res.status(500).json({ status: "error", mess: 'Iveskite data' });
  }

  try {
    const { date } = req.body;
    const newReservation = await Reservation.create({
      procedure: id,
      user: req.userInfo.id,
      date: date,
    });
    res.status(201).json(newReservation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", mess: err });
  }
};


  exports.cancelReservation = async (req, res) => {
    try {
      const { id } = req.params;
  
      const findReservation = await Reservation.findOne({ _id: id });
      if (!findReservation) {
        return res.status(400).json({
          status: "error",
          mess: "Rezervacija nerasta",
        });
      }
      try {
        const updated_reservation = await Reservation.findOneAndUpdate(
          {
            _id: id,
          },
          {
            status: 2
          }
        );
        res.json({
          status: "success",
          data: updated_reservation,
        });
      } catch (err) {
        res.status(500).json({ status: "error", mess: err });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "error", mess: err });
    }
  };
  

exports.acceptReservation = async (req, res) => {
    try {
      const { id } = req.params;
  
      const findReservation = await Reservation.findOne({ _id: id });
      if (!findReservation) {
        return res.status(400).json({
          status: "error",
          mess: "Rezervacija nerasta",
        });
      }
      try {
        const updated_reservation = await Reservation.findOneAndUpdate(
          {
            _id: id,
          },
          {
            status: 1
          }
        );
        res.json({
          status: "success",
          data: updated_reservation,
        });
      } catch (err) {
        res.status(500).json({ status: "error", mess: err });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "error", mess: err });
    }
  };