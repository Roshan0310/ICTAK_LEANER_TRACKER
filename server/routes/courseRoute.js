const express = require("express");
const { createCourse, getAllCourses, getSingleCourse, updateCourses, deleteCourses } = require("../controller/courseController");
const router = express.Router();

router.route("/course/new").post(createCourse);

router.route("/courses").get(getAllCourses);

router.route("/course/:id").get(getSingleCourse).put(updateCourses).delete(deleteCourses);


module.exports = router;