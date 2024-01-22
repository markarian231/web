require('dotenv').config();

const validateToken = require('express-async-handler')(async (req,res,next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        require('jsonwebtoken').verify(token,"haslo123", (err, decoded) => {
            if (err) {
                return res.status(401).json({message:'Invalid token'});
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } else {
        return res.status(401).json({message:'Token is missing'});
    }
});

module.exports = {validateToken};
