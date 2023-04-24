const User = require("./model")


// =================== ADDING A USER ====================================
const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
            // username: req.body.username,
            // email: req.body.email,
            // password: req.body.password,

    res.status(201).json({
        message: "success", 
        user: {username: req.body.username, email: req.body.email} 
    });
    }catch (error){
        res.status(501).json({errorMessage: error.message, error: error});
    }
};
//=========================================================================
//TODO: Add the rest of the CRUD operations

// ================================== GETTING ALL USERS REGISTERED =================================
const getAllUsers = async (req, res) => {
    try {
        console.log(req.params);

        const user = await User.findAll();
        res.status(200).json({
            message: "success", 
            user: user
        });
    } catch (error) {
        res.status(501).json({message: error.message, error: error});
    }
};
// ==================================================================================================

// =================================== UPDATING A USER ==============================================
const updateUser = async (req, res) => {
    try {
        const updateUser = await User.update({
            email: req.body.newEmail,
        },
        {
          where: {
              username: req.body.username,
          },
        });
        res.status(201).json({
            message: "success", 
            user: {username: req.body.username, newEmail: req.body.newEmail} 
        });
        }catch (error){
            res.status(501).json({errorMessage: error.message, error: error});
        }
    };
//========================================================================================================

//======================================= DELETE A USER ==================================================
const deleteUser = async (req, res) => {
    try {
        const result = await User.destroy({
            where: {
            username: req.body.username,
            },
        });
        res.status(202).json({ message: "success", result });
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
      }
    };
//=============================================================================
module.exports = {
    registerUser,
    getAllUsers,
    updateUser,
    deleteUser
}