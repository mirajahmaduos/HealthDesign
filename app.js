const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const cors = require('cors');
const multer = require('multer');

const port = process.env.port || 3005;
const app = express();
//get database connection
const database = require('./Database/ConnectionDB');
//setting parse request from body i.e application/json or application/x-www-form-url-encoded
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
// app.use(multer());
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
const certificateRoutes = require('./Routes/CertificateRouter');
const recipeRoutes = require('./Routes/RecipeRouter');
const serviceRoutes = require('./Routes/ServiceRouter');
const newpostRoutes = require('./Routes/NewPostRouter');
const nutritionRoutes = require('./Routes/NutritionRoutes');
const postRoutes = require('./Routes/PostRouter');
const commentRoutes = require('./Routes/CommentRouter');
const reactionRoutes = require('./Routes/ReactionRouter');

app.use('/user', userRoutes);
app.use('/certificate', certificateRoutes);
app.use('/recipe', recipeRoutes);
app.use('/service', serviceRoutes);
app.use('/newpost', newpostRoutes);
app.use('/nutrition', nutritionRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/reaction', reactionRoutes);


//setting port
app.listen(port, (err)=>{
    if(err)
        console.log(`error in connecting ${port}.  ${err}`);
        console.log(`Listening requests on port ${port}`);
})