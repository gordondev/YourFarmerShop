require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require("./db");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("SERVER STARTED");
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`\nServer started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();