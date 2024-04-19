const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const { GetRequestController, UpdateRequestController} = require("../controllers/requestController");

const router = express.Router();

router.get("/get-request-in", authMiddelware, GetRequestController);
router.put("/update-request/:id", authMiddelware, UpdateRequestController);

module.exports = router;