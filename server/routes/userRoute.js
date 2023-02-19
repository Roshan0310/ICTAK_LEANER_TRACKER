const express = require("express");
const { getAllUsers, createUSers, loginUser, updateUser, deleteUser } = require("../controller/userController");

const router = express.Router();

router.route("/users").get(getAllUsers)

router.route("/register").post(createUSers)

router.route("/login").post(loginUser)

router.route("/user/:id").put(updateUser).delete(deleteUser);


module.exports = router
