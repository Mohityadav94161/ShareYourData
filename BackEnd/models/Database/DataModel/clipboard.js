const mongoose = require("mongoose");
const User = require("../UserModel/userAuth")

// const clipBoardSchema = new mongoose.Schema(
//     {
//         usernames: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: User
//         }],
//         data: { type: String },
//         name: { type: String, default:"Untitled" },
//         uploadTime: {
//             type: Date,
//             default: Date.now
//         },
//         expireDate: {
//             type: Date,
//             default:()=> Date.now() + (30*48 * 60 * 60 * 1000)
//         },
//         isLocked: { type: Boolean }

//     },
//     { timestamps: true },
//     {
//         writeConcern: {
//             w: "majority",
//             j: true,
//             wtimeout: 1000,
//         },
//     }
// );
const clipboardSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    usernames: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
    data: { type: String },
    name: { type: String, default: "Untitled" },
    uploadTime: { type: Date, default: Date.now },
    expireDate: { type: Date, default: () => Date.now() + 30 * 24 * 60 * 60 * 1000 },
    isLocked: { type: Boolean, default: false },
}, { timestamps: true });


module.exports = mongoose.model("Clipboard", clipboardSchema);