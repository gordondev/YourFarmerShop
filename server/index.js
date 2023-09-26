require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require("./config/database");
const router = require("./routes/index");
const analyzeUserAgent = require('./middlewares/userAgent-middleware');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(analyzeUserAgent);
app.use("/api", router);
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