const mongoose = require("mongoose");

const procedureSchema = mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            minLength: 2,
            maxLength: 40,
            trim: true,
            required: true,
        }, 
        category: {
            type: String,
            minLength: 2,
            maxLength: 40,
            required: true,
        },
        duration: {
            type: Number,
            min: 1,
            max: 300,
            required: true
        },
        imgSrc:{
            type: String,
            required: true
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("procedure", procedureSchema);