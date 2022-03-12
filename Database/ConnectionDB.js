const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

//databasse connection
mongoose.connect(process.env.DB_URI, function(err, db){
    if(err) console.log(`Connecting Error in mongodb Atlas ${err}`);
    console.log(`Connection to Mongodb Atlas Server Successful `);
})

