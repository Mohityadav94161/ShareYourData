const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require('./routes/auth/user')
const parent = require('./routes/DataRoutes/parent');
const app = express();
var cloudinary = require('cloudinary').v2;
// const fileupload = require('express-fileupload');

//cors
app.use(cors());

// json data allow
app.use(express.json({ limit: '50mb' }));

// app.use(fileupload({ useTempFiles: true }))
//Routes User
app.use('/user',user)

//Data Routes
app.use ('/data',parent)


dotenv.config();

//connect to mongoose server
mongoose
    .connect(process.env.Mongoose_url)
    .then(() => console.log('DB connection successful'))
    .catch((err) => {
        console.log("error int database connection can't establise ", err);
    });



//connect to cloudinary server

cloudinary.config({
    cloud_name: 'dnnxxpqf2',
    api_key: '679343737329963',
    api_secret: process.env.CLOUDINARY_API_KEY
});
    
const port = 3300;
app.listen(port, () => {
    console.log("server is listening on port " + port)
})


