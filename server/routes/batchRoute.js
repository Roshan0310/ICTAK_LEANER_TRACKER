const express = require("express");
const { createBatch, getAllBatches, getSingleBatch, updateBatches, deleteBatches } = require("../controller/batchController");
const router = express.Router();

router.route("/batch/new").post(createBatch);

router.route("/batches").get(getAllBatches);

router.route("/batch/:id").get(getSingleBatch).put(updateBatches).delete(deleteBatches);

module.exports = router;