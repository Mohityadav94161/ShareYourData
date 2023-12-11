const mongoose = require("mongoose");
const File = require("./files");
const Clipboard = require("./clipboard");
const User = require("../UserModel/userAuth")

const folderSchema = new mongoose.Schema(
    {

        usernames: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }],
        data: {
            files: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: File
            }],
            clipboard: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: Clipboard
            }],
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

module.exports = mongoose.model("Folder", folderSchema);