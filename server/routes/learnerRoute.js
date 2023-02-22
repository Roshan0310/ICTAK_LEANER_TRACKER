const express = require("express");
const router = express.Router();



const Learner = require("../model/learnerModel");



const { getAllLearners , createLearner, updateLearner, deleteLearner, getSingleLearnerDetials, updatePlacementStatus, csvUpload} = require("../controller/learnerController");




//Get all Learners (GET)
router.route("/learners").get(getAllLearners);

//Create a Learner (POST)
router.route("/learner/new").post(createLearner);

//Update,Delete,Get single learner detials,Update Placement detials (PUT,DELETE and GET)
router.route("/learner/:id").put(updateLearner).delete(deleteLearner).get(getSingleLearnerDetials).put(updatePlacementStatus);


router.route("/learner/upload").post(csvUpload);





module.exports = router;