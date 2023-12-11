const User = require('../../models/Database/UserModel/userAuth');
const Folder = require('../../models/Database/DataModel/folder');
const File = require('../../models/Database/DataModel/files');
const Clipboard = require('../../models/Database/DataModel/clipboard');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../../middlewares/jwtToken');

const multer = require('multer');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const jwt = require("jsonwebtoken");
const Router = require("express").Router();
const CryptoJS = require("crypto-js");

// const storage = multer.memoryStorage(); // Use memory storage for simplicity
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Set the destination folder for temporarily saving the file
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep the original filename
    },
});
const upload = multer({ storage: storage });


Router.get('/home', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const userData = await User.findOne({ _id: userId });
    return res.status(200).json(userData);
})

// Router.get('/download', async (req, res) => {
//     try {
//         cloudinary.api.resource('fns1cm6v54tcbskgrwjg.pdf', { resource_type: 'raw', flags: 'attachment' }, function (error, result) {
//             if (error) {
//                 console.log("error in downloading", error);
//             } else {
//                 console.log("download results", result);
//             }
//         });
//         return res.status(200).json("success");
//     } catch (error) {
//         console.log("error in downloading", error);
//         return res.status(400).json("unsuccess");
//     }
// })

//upload clipboard data
Router.post('/uploadClipboard', verifyToken, async (req, res) => {
    // const id = req.params.id;
    const userId = req.user.id;
    const clipboardData = req.body.clipboardData;
    const clipboardName = req.body.clipboardName;



    try {
        // Update the document to add the new username
        const clipboard = await new Clipboard({
            usernames: [userId],
            data: clipboardData,
            name: clipboardName
        });
        clipboard.save();

        // update values in user 
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { 'data.clipboards': clipboard._id } },
            { new: true }
        );
        res.status(200).json({ user, clipboard });

    } catch (error) {
        console.error('Error adding username:', error);
    }
})

//upload file

Router.post('/uploadfile', verifyToken, upload.single('file'), async (req, res) => {
    try {
        const userId = req.user.id;
        const filePath = req.file.path;
        // console.log(filePath);
        // Upload the file to Cloudinary
        const cloudinaryUploadResult = await cloudinary.uploader.upload(filePath, { resource_type: 'raw' });
        const url = cloudinaryUploadResult.secure_url;

        //delete the file from local storage

        //update in file schema
        const file = await new File(
            {
                usernames: [userId],
                data: cloudinaryUploadResult
            }
        )
        file.save();

        //update in user schema
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { 'data.files': file._id } },
            { new: true }
        );


        // Do something with the Cloudinary upload result, if needed
        console.log('Cloudinary upload result:', file);
        //upload to mongoDB

        return res.status(200).json(file);
    }
    catch (error) {
        console.log("error in uploading", error);
        return res.status(400).json({ "error in uploading": error })
    }

})

//folder is on hold

Router.get('/folder/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    const folder = await Folder.findOne({ _id: id });
    const user = await User.findOne({ _id: userId });
    const isUserValid = folder.usernames.contains(userId) && user.data.folders.contains(id);

    if (isUserValid || isAdmin) {
        return res.status(200).json(folder);
    }
    return res.status(500).json("You are not authorised to this folder ");
})

Router.get('/download/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    const file = await File.findOne({ _id: id });
    const user = await User.findOne({ _id: userId });
    const isUserValid = file.usernames.contains(userId) && user.data.files.contains(id);


    if (!isUserValid && !isAdmin) {
        return res.status(500).json("You are not authorised to this file ");
    }
    if (isAdmin) {
        res.status(200).json("file downloading as you are admin");
    }

    const validTime = file.expireDate;
    if (validTime < Date.now()) {
        return res.status(500).json("We are sorry but this file is Locked , to unlock for 48hrs pay--  ");
    }

    return res.status(200).json(file);
})

Router.post('/uploadDataUser', upload.single('file'), async (req, res) => {
    const userName = req.body.username;
    const receive_file = req.file;
    const notepadData = { clipboardName: (req.body.clipboardName), clipboardData: (req.body.clipboardData) }

    // console.log(file);

    const user = await User.findOne({ username: userName });
    if (!user) {
        console.log("usernotfound");
        return res.status(201).json("userss Not found");
    }
    if (receive_file && (notepadData.clipboardData || notepadData.clipboardName)) {
        try {
            //upload file
            const cloudinaryUploadResult = await cloudinary.uploader.upload(receive_file.path, { resource_type: 'raw' });
            const url = cloudinaryUploadResult.secure_url;
            const file = await new File(
                {
                    usernames: [user._id],
                    data: cloudinaryUploadResult
                }
            )
            file.save();

            //update in user schema
            const user1 = await User.findOneAndUpdate(
                { _id: user._id },
                { $push: { 'data.files': file._id } },
                { new: true }
            );

            //upload Note pad data


            // Update the document to add the new username
            const clipboard = await new Clipboard({
                usernames: [user._id],
                data: notepadData.clipboardData,
                name: notepadData.clipboardName
            });
            clipboard.save();
            // update values in user 
            const user2 = await User.findOneAndUpdate(
                { _id: user._id },
                { $push: { 'data.clipboards': clipboard._id } },
                { new: true }
            );

            return res.status(200).json("File and notepad data Sent successfully")


        } catch (error) {
            return res.status(401).json(error);
        }
    }
    else if (receive_file) {
        try {
            const cloudinaryUploadResult = await cloudinary.uploader.upload(receive_file.path, { resource_type: 'raw' });
            const url = cloudinaryUploadResult.secure_url;
            const file = await new File(
                {
                    usernames: [user._id],
                    data: cloudinaryUploadResult
                }
            )
            file.save();

            //update in user schema
            const user1 = await User.findOneAndUpdate(
                { _id: user._id },
                { $push: { 'data.files': file._id } },
                { new: true }
            );
            return res.status(200).json("file sent successfully")

        } catch (error) {
            return res.status(401).json(error);
        }
    }
    else {
        try {
            // Update the document to add the new username
            const clipboard = await new Clipboard({
                usernames: [user._id],
                data: notepadData.clipboardData,
                name: notepadData.clipboardName
            });
            clipboard.save();

            // update values in user 
            const user2 = await User.findOneAndUpdate(
                { _id: user._id },
                { $push: { 'data.clipboards': clipboard._id } },
                { new: true }
            );


            return res.status(200).json("Notepad data sent successfully")
        } catch (error) {
            return res.status(401).json(error);
        }

    }

})

Router.post('/uploadDataPhone', upload.single('file'), async (req, res) => {
    console.log(req.body);

    const phonenumber = req.body.phonenumber;
    const receive_file = req.file;
    const notepadData = { clipboardName: (req.body.clipboardName), clipboardData: (req.body.clipboardData) }


    let user = await User.findOne({ phoneNumber: phonenumber });
    console.log("user is ", user);
    if (!user) {
        const uniqueUser = Date.now().toString + Math.random().toString().substring(6)
        // console.log(uniqueUser);
        const newUser = new User({
            phoneNumber: phonenumber,
            otp: -111,
            username: uniqueUser
        });
        await newUser.save();
        user = newUser;
    }
    if (receive_file && (notepadData.clipboardData || notepadData.clipboardName)) {
        try {
            //upload file
            const cloudinaryUploadResult = await cloudinary.uploader.upload(receive_file.path, { resource_type: 'raw' });
            const url = cloudinaryUploadResult.secure_url;
            const file = await new File(
                {
                    usernames: [user._id],
                    data: cloudinaryUploadResult
                }
            )
            file.save();

            //update in user schema
            const user1 = await User.findOneAndUpdate(
                { _id: user._id },
                { $push: { 'data.files': file._id } },
                { new: true }
            );

            //upload Note pad data


            // Update the document to add the new username
            const clipboard = await new Clipboard({
                usernames: [user._id],
                data: notepadData.clipboardData,
                name: notepadData.clipboardName
            });
            clipboard.save();

            // update values in user 
            const user2 = await User.findOneAndUpdate(
                { _id: user._id },
                { $push: { 'data.clipboards': clipboard._id } },
                { new: true }
            );

            return res.status(200).json("File and notepad data Sent successfully")


        } catch (error) {
            console.log("upload data to phone(file and notepad) ",1, error);
            return res.status(401).json(error);
        }
    }
    else if (receive_file) {
        try {
            const cloudinaryUploadResult = await cloudinary.uploader.upload(receive_file.path, { resource_type: 'raw' });
            const url = cloudinaryUploadResult.secure_url;
            const file = await new File(
                {
                    usernames: [user._id],
                    data: cloudinaryUploadResult
                }
            )
            file.save();

            //update in user schema
            const user1 = await User.findOneAndUpdate(
                { _id: user._id },
                { $push: { 'data.files': file._id } },
                { new: true }
            );
            return res.status(200).json("file sent successfully")

        } catch (error) {
            console.log(2, error);
            return res.status(401).json(error);
        }
    }
    else {
        try {
            // Update the document to add the new username
            const clipboard = await new Clipboard({
                usernames: [user._id],
                data: notepadData.clipboardData,
                name: notepadData.clipboardName
            });
            clipboard.save()

            // update values in user 
            const user2 = await User.findOneAndUpdate(
                { _id: user._id },
                { $push: { 'data.clipboards': clipboard._id } },
                { new: true }
            );

            return res.status(200).json("Notepad data sent successfully")
        } catch (error) {
            console.log(3, error);
            return res.status(401).json(error);
        }

    }
})

Router.get('/clipboardData', verifyToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await Clipboard.find({ usernames: [userId] }).exec();
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(401).json(error);
    }
})

Router.get('/fileData', verifyToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await File.find({ usernames: [userId] }).exec();
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(401).json(error);
    }
})




module.exports = Router;