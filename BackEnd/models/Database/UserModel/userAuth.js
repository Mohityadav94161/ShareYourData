const mongoose = require("mongoose");
const File = require("../DataModel/files");
const Folder = require("../DataModel/folder");
const clipboard = require("../DataModel/clipboard");


const userSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true },
        phoneNumber: { type: String, default: "No number Associated" },
        password: { type: String },
        otp: { type: Number, expires: 10 * 60 * 1000 },
        size: { type: Number, default:0},
        allowedSize: { type: Number, default:1024*1024*50},
        data: {
            files: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: File
                
            }],
            folders: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: Folder
            }],
            clipboards: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: clipboard
            }]
        },
        isLocked: { type: Boolean, default: false },
        isAdmin: {
            type: Boolean,
            default: false,
        },
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

module.exports = mongoose.model("User", userSchema);