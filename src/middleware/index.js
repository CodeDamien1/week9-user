const User = require("../users/model")
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const saltRounds = process.env.SALT_ROUNDS

const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const comparePass = async (req, res, next) => {
    try {
        //TODO: 
        // Find user in our database using the username passed in req.body
        // req.user = await User ....
        // use .compare() method to compare if the plain text password matches the hashed version stored in the database 
        // Error handling if password don't match OR username doesn't exist in the database 
        // if they do match, continue to the controller
        req.user = await User.findOne({where: {username: req.body.username}})      
        console.log(req.user)
        if (req.user === null) {
            throw new Error ("password or username doesn't match")
        }
        // let hashedPassword = req.user.password
        const comparePassword = await bcrypt.compare(req.body.password, req.user.password)

        if(!comparePassword){
            throw new Error ("password or username doesn't match")
        } 
        
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

// ============================== Adding the token element ==============================================

const tokenCheck = async (req, res, next) => {
    try{
        if (!req.header("Authorization")) {
            throw new Error("No header or token passed in the request")
        }
        console.log(req.header("Authorization"))

        const token = req.header("Authorization").replace("Bearer ", "");

//============================== Decoding the Token recieved ============================================

        const decodedToken = await jwt.verify(token, process.env.SECRET);

        const user = await User.findOne({where: {id: decodedToken.id}})

//=========================== checking if user if authorised through token =============================

        if(!user){
            throw new Error("User is not authorised")
        }
        req.authUser = user
        next();
        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

module.exports = {
    hashPass,
    comparePass,
    tokenCheck
}