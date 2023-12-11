const User = require("../../models/Database/UserModel/userAuth");
const Otp = require("../../models/Database/UserModel/otp");
// const UserPhoneNumberSchema = require("");

const jwt = require("jsonwebtoken");
const Router = require("express").Router();
const CryptoJS = require("crypto-js");


//register with userName/ SignUp User
Router.post('/register', async (req, res) => {
    const inputUsername = req.body.username;
    const inputPassword = req.body.password;
    console.log(inputUsername, inputPassword);
    try {
        const user = await User.findOne({ username: inputUsername });
        if (!user) {
            const createUser = new User({
                username: inputUsername,
                password: CryptoJS.AES.encrypt(inputPassword, process.env.PASS_SEC_KEY).toString(),
            });

            await createUser.save();
            res.status(200).json(createUser);
        }
        else {
            res.status(201).json({ "mesg": "User name already exists" })
        }

    }
    catch (err) {
        res.status(500).json(err);
        console.log("error in creating user", err);
    }

})

//register with phoneNumber

Router.post('/sendOtp', async (req, res) => {
    const inputPhoneNumber = req.body.phoneNumber;
    try {
        //find OtpSchema with phone number .... phone number is stored in encrypted format
        const user = await User.findOne({
            phoneNumber: inputPhoneNumber,
        });

        generatedOtp = generateOtp();
        if (!user) {
            // create an new otpSchema for phonenumber entered .... phone number is stored in encrypted format
            const uniqueUser = Date.now.toString + Math.random().toString().substring(6)
            console.log(uniqueUser);
            const newUser = new User({
                phoneNumber: inputPhoneNumber,
                otp: generatedOtp,
                username: uniqueUser
            });
            await newUser.save();

            console.log("Number register for Otp: ", newUser);
        }
        else {
            await user.updateOne(
                { $set: { otp: generatedOtp } }
            )
        }

        // **************** Update the Otp against Number ******************

        // await sendMessage(generatedOtp, inputPhoneNumber);
        console.log("Otp sent successfully , OTP: ", generatedOtp);
        return res.status(200).json("Otp sent successully");

    } catch (err) {
        console.log("error in sending Otp message ", err);
        return res.status(400).json("Error in sending Otp message");
    }


})
Router.post('/verifyOtp', async (req, res) => {
    const inputOtp = req.body.otp;
    const inputPhoneNumber = req.body.phoneNumber;


    try {
        //find otp schema with phone number .... phone number is stored in encrypted format
        console.log(req);
        const user = await User.findOne({
            phoneNumber: inputPhoneNumber,
        });
        console.log(user);
        let generatedOtp = await user.otp;

        if (generatedOtp == null) {
            return res.status(403).json("Otp expired try again");
        }
        // match the OTPs 
        if (generatedOtp != inputOtp) {
            return res.status(201).json("Incorrect OTP");
        }
        else {
            //otp verify successfully
            //store the userid in jwt token
            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_secKey,
                { expiresIn: "1d" }
            );



            res.status(200).json({ "token": accessToken });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ "error in verfiy otp ": error });
    }
})



//User Login 

Router.post('/login', async (req, res) => {
    const inputUserName = req.body.username;
    const inputPassword = req.body.password;

    try {
        const user = await User.findOne({ username: inputUserName });
        console.log(user);

        if (!user) {
            return res.status(401).json("Provided Username is not exist");
        }

        else {
            const match_password = inputPassword == CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC_KEY).toString(CryptoJS.enc.Utf8);

            if (!match_password) {
                return res.status(401).json("pasword is incorrect");
            }

            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_secKey,
                { expiresIn: "1d" }
            );
            const { password, ...other } = user._doc;
            return res.status(200).json({ ...other,  "token": accessToken  });
        }
    }
    catch (err) {
        console.log("error in login : " + err);
        return res.status(500).json("Error in Login : " + err.message);
    }

})



generateOtp = () => {
    let randomNumber = Math.floor(Math.random() * 10000);
    while (randomNumber.toString().length < 4) {
        randomNumber = Math.floor(Math.random() * 10000);
    }
    return randomNumber;
}


module.exports = Router;