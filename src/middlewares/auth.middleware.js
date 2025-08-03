const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');


async function authMiddleware(req,res,next){
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = userModel.findOne({_id: decoded.id});
        req.user = user;
        next();
         
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

}

module.exports = authMiddleware;