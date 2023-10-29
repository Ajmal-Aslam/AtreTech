const express = require('express');
const app = express();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");



const mongoose = require('mongoose')
    .connect('mongodb+srv://Ajmal:7339055264@cluster0.ibcsg5s.mongodb.net/test')
    .then(() => {
        console.log('your DB is ready....')
    })

// Middleware
app.use(bodyParser.json());

app.listen(5000, () => {
    console.log("your port is ready.... ");
});

//import controllers and repositories
const UserController = require("./Controller/User");
const AppoimentController = require("./Controller/Appoinment");
const TimeslotController = require("./Controller/Timeslot");


console.log("controllers and repositories are imported");


// User Routes
app.post("/user", UserController.createUser);
app.get("/user", UserController.AllUser);
app.get("/user/:id", UserController.OneUser);
app.delete("/user/:id", UserController.Deleted);
app.put("/user/:id", UserController.Updated);
app.post("/user/login", UserController.login, UserController.generateToken);
app.put("/user/:id/reset-password", UserController.resetPassword);

//Appoinmnet Routes
app.post("/appoinment", AppoimentController.CreateAPI);
app.get("/appoinment", AppoimentController.AllAppoinment);
app.get("/appoinment/:id", AppoimentController.OneUser);
app.delete("/appoinment/:id", AppoimentController.Deleted);
app.put("/appoinment/:id", AppoimentController.Updated);

///Timeslot Routes
app.post("/Timeslot", TimeslotController.CreateSlot);
app.get("/Timeslot", TimeslotController.AllSlots);
app.get("/Timeslot/:id", TimeslotController.OneSlot);
app.delete("/Timeslot/:id", TimeslotController.Deleted);
app.put("/Timeslot/:id", TimeslotController.Updated); 