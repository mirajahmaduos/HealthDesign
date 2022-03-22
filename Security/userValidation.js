const jwt = require('jsonwebtoken');

const validateToken = async function(req, res, next){
    var token = req.body.token || req.headers['token'] || req.query.token;
    if(!token){
       return res.status(400).send({msg:"Token not Found", token:null})
    }
    jwt.verify(token, process.env.SECRET_KEY, function(err, user){
        if(err) {
            res.status(400).send({msg:"Token Not Verified", error:err}); 
        }
    })
}
module.exports = validateToken;