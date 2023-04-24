//what we need:
//Username
//Email
//Password

const { DataTypes } = require("sequelize");
const connection = require("../db/connection");


const User = connection.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},     
{indexes: [{ unique: true, fields: ["username", "email"] }]},
    {timestamps: false},
);

module.exports = User