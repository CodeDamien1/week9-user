require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 5001

const app = express();

app.use(express.json());

const syncTable = () => {
    //
}

app.get("/health", (req, res) => {
    res.status(200).json({message: "api is working",})
})

app.listen(port, () => {
    syncTable();
    console.log(`server is running on port ${port}`);
})