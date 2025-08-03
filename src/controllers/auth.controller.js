const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerController(req,res) {
    const{ username, password } = req.body;
   
   const existingUser = await userModel.findOne({
    username
   })
   

   if(existingUser) {
       return res.status(400).json({
           success: false,
           message: 'User already exists'
       });
   }

   

   const user= await userModel.create({ 
    username,
     password:await bcrypt.hashSync(password, 10)
});

const token=jwt.sign({
    id:user._id,

},process.env.JWT_SECRET )

res.cookie('token', token)

    res.status(201).json({
         success: true,
         message: 'User registered successfully',
         user
    });


    
}

async function loginController(req, res) {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Invalid username or password'
        });
    }
    const isPasswordValid = bcrypt.compare (password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            success: false,
            message: 'Invalid username or password'
        });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user
    });
}  


module.exports = {
     registerController,
     loginController,


};