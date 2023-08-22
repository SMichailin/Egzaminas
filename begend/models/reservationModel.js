const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        }, 
        procedure: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("reservation", reservationSchema);