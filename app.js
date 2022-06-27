const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors= require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const userRoutes = require("./api/routes/userdataRoutes");

app.use("/users",userRoutes);

app.use("/",(req, res)=>{
    res.send("in the server index /");
})

module.exports= app;