const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            minLength: 2,
            maxLength: 15,
            trim: true,
            required: true,
            unique: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            minLength: 7,
            maxLEngth: 50,
            required: true
        },
        role: {
            type: String,
            default: "user"
        },
    },
    {timestamps: true}
);

// pre-save middleware to remove all whitespace characters from the name field
userSchema.pre('save', function(next) {
    if (this.isModified('username')) {
      this.username = this.username.replace(/\s/g, '');
    }
    next();
});

module.exports = mongoose.model("user", userSchema);