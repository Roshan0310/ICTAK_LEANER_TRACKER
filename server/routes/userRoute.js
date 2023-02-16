const express = require("express");
const { getAllUsers, createUSers, loginUser } = require("../controller/userController");

const router = express.Router();

router.route("/users").get(getAllUsers)

router.route("/register").post(createUSers)

router.route("/login").post(loginUser)



module.exports = router
