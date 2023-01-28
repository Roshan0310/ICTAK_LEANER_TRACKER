const express = require("express");
const path = require("path");


const app = new express();



const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static('./uploads'));




//Routes
const learner = require("./routes/learnerRoute");
app.use("/api/v1",learner);



//Middleware for error
app.use(errorMiddleware);

module.exports = app;
