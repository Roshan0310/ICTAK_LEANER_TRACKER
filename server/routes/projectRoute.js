const express = require("express");
const { createProject, getAllProjects, getSingleProject, updateProjects, deleteProject } = require("../controller/projectController");
const router = express.Router();

router.route("/project/new").post(createProject);

router.route("/projects").get(getAllProjects)

router.route("/project/:id").get(getSingleProject).put(updateProjects).delete(deleteProject);

module.exports = router;