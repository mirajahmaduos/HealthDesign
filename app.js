const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const cors = require('cors');

const port = process.env.port || 3005;
const app = express();
//get database connection
const database = require('./Database/ConnectionDB');
//setting parse request from body i.e application/json or application/x-www-form-url-encoded
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
//setting body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(__dirname+'/Uploads', express.static('Uplaods'))
// app.use(__dirname+'/uploads', express.static('uploads'))
app.get('/home', (req, res)=>{
    res.send('Welcome to Login System');
})


//registering routes 
const userRoutes = require('./Routes/UserRouter');
const res = require('express/lib/response');
app.use('/user', userRoutes);

//setting port
app.listen(port, (err)=>{
    if(err)
        console.log(`error in connecting ${port}.  ${err}`);
        console.log(`Listening requests on port ${port}`);
})