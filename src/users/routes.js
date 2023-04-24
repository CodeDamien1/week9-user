const { Router } = require("express");
const userRouter = Router();

const { registerUser, getAllUsers, updateUser, deleteUser} = require("./controllers");

userRouter.post("/users/register", registerUser);
userRouter.get("/users/getallusers", getAllUsers);
userRouter.put("/users/updateuser", updateUser);
userRouter.delete("/users/deleteuser", deleteUser);

module.exports = userRouter