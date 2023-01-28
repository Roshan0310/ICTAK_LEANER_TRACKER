const express = require("express");
const router = express.Router();
const multer = require("multer");

const uploadCsv = require("@fast-csv/parse");
const streamifier = require("streamifier");
const parseCsv = multer().single("file");

const csv = require("csvtojson");
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}‐${file.originalname}`);
    }
});
let uploads = multer({ storage: storage });

const Learner = require("../model/learnerModel");

const { getAllLearners , createLearner, updateLearner, deleteLearner, getSingleLearnerDetials, updatePlacementStatus} = require("../controller/learnerController");








router.route("/learners").get(getAllLearners);

router.route("/learner/new").post(createLearner);

router.route("/learner/:id").put(updateLearner).delete(deleteLearner).get(getSingleLearnerDetials).get(updatePlacementStatus);




router.post("/learner/csv", uploads.single("file"), (req, res) => {
    csv()
        .fromFile(req.file.path)
        .then((jsonObj) => {

            var learners = [];
            for (var i = 0; i < jsonObj.length; i++) {
                var obj = {};
                obj.learnerId = jsonObj[i]['learnerId'];
                obj.learnerName = jsonObj[i]['learnerName'];
                obj.courseName = jsonObj[i]['courseName'];
                obj.project = jsonObj[i]['project'];
                obj.batch = jsonObj[i]['batch'];
                obj.courseStatus = jsonObj[i]['courseStatus'];
                obj.placementStatus = jsonObj[i]['placementStatus'];
                learners.push(obj);
            }

            Learner.insertMany(learners, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
        }).catch((error) => {
            res.json(error)
        })
});
//upload csv learners by reading line by line from file first and then save to db
router.post("/learner/csv/upload", parseCsv, (req, res) => {
    const { buffer } = req.file;
    const dataFromCSV = [];

    streamifier
        .createReadStream(buffer)
        .pipe(uploadCsv.parse({ headers: true, ignoreEmpty: true })) // <== this is @fast-csv/parse!!
        .on("data", (row) => {
            var obj = {};
          
            obj.learnerId = row['learnerId'];
            obj.learnerName = row['learnerName'];
            obj.courseName = row['courseName'];
            obj.project = row['project'];
            obj.batch = row['batch'];
            obj.courseStatus = row['courseStatus'];
            obj.placementStatus = row['placementStatus'];
            dataFromCSV.push(obj);
        })
        .on("end", async(rowCount) => {
            try {
                Learner.insertMany(dataFromCSV, (err, data) => {
                    if (err) {
                        res.status(401).json({message:"Page Not Found...!"})
                    } else {
                        res.status(200).send({ data });
                    }
                });
            } catch (error) {
                res.json(error)
            }
        });
});




module.exports = router;