const mongoose = require("mongoose");
const User = require("../UserModel/userAuth")

const feedbackSchema = new mongoose.Schema(
    {
        usernames: [{
            type: String,
            default: "unknown"
        }],
        data: { type: String },
        name: { type: String, default: "Unknown" },
        uploadTime: {
            type: Date,
            default: Date.now
        },
        expireDate: {
            type: Date,
            default: () => Date.now() + (30 * 48 * 60 * 60 * 1000)
        },
        isLocked: { type: Boolean }

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

module.exports = mongoose.model("Feedback", feedbackSchema);