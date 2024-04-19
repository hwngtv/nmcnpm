const express = require("express");
const authMiddleware = require("../middlewares/authMiddelware");
const {GetGiftListController, createGiftController, deleteGiftController, updateGiftController, updateUserPointController, GetUserToUpdatePointController} = require("../controllers/giftsController");
const authMiddelware = require("../middlewares/authMiddelware");

const router = express.Router();

//routes

// GET GIFT DATA
router.get("/gift-list", authMiddleware, GetGiftListController);
// router.get("/gift-list", GetGiftListController);
router.post("/create-gift", authMiddleware, createGiftController);

router.get("/get-user/:id", authMiddelware, GetUserToUpdatePointController);

// DElete
router.delete("/delete-gift/:id", authMiddleware, deleteGiftController);
// Update
router.put("/update-gift/:id", authMiddleware, updateGiftController);
// Update user point
router.put("/update-user-point/:id", authMiddleware, updateUserPointController);

module.exports = router;

// test gift routers