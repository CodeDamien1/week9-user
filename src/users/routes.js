const { Router } = require("express")

const userRouter = Router()

const {registerUser,getAllUsers, updateUser, deleteUser, login } = require("./controllers") 
const { hashPass, comparePass } = require("../middleware")

userRouter.post("/users/register", hashPass, registerUser)

userRouter.post("/users/login", comparePass, login)

userRouter.get("/users/getallusers", getAllUsers)

userRouter.put("/users/updateuser", updateUser)

userRouter.delete("/users/deleteuser", deleteUser)


//TODO: add rest of routes for each controller

module.exports = userRouter