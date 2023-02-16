const express = require("express");
const path = require("path");
const cors = require("cors")


const app = new express();



const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/upload', express.static('./uploads'));




//Routes
const learner = require("./routes/learnerRoute");
const batch = require("./routes/batchRoute");
const course = require("./routes/courseRoute");
const project = require("./routes/projectRoute")
const user = require("./routes/userRoute");
app.use("/api/v1",learner);
app.use("/api/v1",batch);
app.use("/api/v1",course);
app.use("/api/v1",project);
app.use("/api/v1",user);


//Middleware for error
app.use(errorMiddleware);

module.exports = app;
