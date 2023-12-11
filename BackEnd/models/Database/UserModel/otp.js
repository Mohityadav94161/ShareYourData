const mongoose = require("mongoose");



const otpSchema = new mongoose.Schema(
    {
        phoneNumber: { type: String, required: true, unique: true },
        otp :{type:Number,expires:10*60*1000}
        
    },
    { timestamps: true },
    {
        writeConcern: {
            w: "majority",
            j: true,
            wtimeout: 1000,
        },
    }
);

module.exports = mongoose.model("Otp", otpSchema);



