const  User = require ("./model") 

const jwt = require("jsonwebtoken")

//adding a new user
// {
//     "username" : "damien",
//     "email": "damien@email.com",
//     "password": "password123"
//  }

const registerUser = async (req, res) => {
    try { 
        console.log("next called and inside controller")
        // const user = await User.create({
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password
        // });
        const user = await User.create(req.body)
        const token = await jwt.sign({id: user.id }, process.env.SECRET);
        res.status(201).json({
            message: "success",
            user: {username: req.body.username, email: req.body.email, token: token}
        })
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}


const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();

      // remove passwords from users object
    //   for (let user of users) {
    //     user.password = "";
    //   }

      res.status(200).json({ message: "success", users: users });
    } catch (error) {
      res.status(501).json({ errorMessage: error.message, error: error });
    }
};

// {
//     "username" : "ste",
//     "updateKey" : "email",
//     "updateValue" : "ste@email.com"
// }
const updateUser = async (req, res) => {
    try {
      const updateResult = await User.update(
        { [req.body.updateKey]: req.body.updateValue },
        { where: { username: req.body.username } }
      );
  
      res.status(201).json({ message: "success", updateResult: updateResult });
    } catch (error) {
      res.status(501).json({ errorMessage: error.message, error: error });
    }
};

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

const login = async (req, res) => {
    try {
        if (req.authUser) {
            res.status(200).json({
              message: "success",
              user: {
                username: req.authUser.username,
                email: req.authUser.email
              }
            })
            return
        }
        const token = await jwt.sign({id: req.user.id }, process.env.SECRET);

        res.status(200).json({
            message: "success",
            user: {
                username: req.user.username,
                email: req.user.email,
                token: token
            }
        })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
}

//TODO: Add the rest of the CRUD operations
// getAllUsers
// updateUser
// deleteUser

module.exports = {
    registerUser,
    getAllUsers,
    updateUser,
    deleteUser,
    login
}