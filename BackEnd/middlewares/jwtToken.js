const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        // console.log(token);
        jwt.verify(token, process.env.JWT_secKey, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json("Token is not valid");
            }
            // console.log("verify token user ", user);
            req.user = user;
            next();
        })
    }
    else {
        return res.status(401).json("you are not authenticated");
    }


}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        // if (req.user) {
        next();
        // }
        // else {
        //     res.status(403).json("you are not allowed to access this page");
        // }
        //res.status(403).json("fake verify")
    });
};


const verifyTokenAndAdmin = (req, res, next) => {
    verifyTokenAndAdmin(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("you are not allowed to access this page");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };


