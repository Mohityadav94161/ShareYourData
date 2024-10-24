const mongoose = require("mongoose");
const User = require("../UserModel/userAuth")

// const fileSchema = new mongoose.Schema(
//     {
//         usernames: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: User
//         }],
//         data: Object,
//         uploadTime: {
//             type: Date,
//             default: Date.now
//         },
//         expireDate: {
//             type: Date,
//             default:()=> Date.now() + (48 * 60 * 60 * 1000)
//         }
//         ,
//         isLocked: { type: Boolean },

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
const fileSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    usernames: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
    data: Buffer,
    mimeType: { type: String },
    filename: { type: String },
    uploadTime: { type: Date, default: Date.now },
    expireDate: { type: Date, default: () => Date.now() + 2 * 24 * 60 * 60 * 1000 },
    isLocked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("File", fileSchema);
