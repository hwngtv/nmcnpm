const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryHospitalController,
  getOrgListController,
  getRecentInventoryDonarController,
  getRecentInventoryOrganisationController,
  getDonarInventoryController,
  getHospitalInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddelware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddelware, getInventoryController);
router.get("/get-donar-inventories/:id", authMiddelware, getDonarInventoryController);
router.get("/get-hospital-inventories/:id", authMiddelware, getHospitalInventoryController);
//GET RECENT BLOOD RECORDS
router.get(
  "/get-recent-inventory-hospital",
  authMiddelware,
  getRecentInventoryHospitalController
);
router.get("/get-recent-inventory-user", authMiddelware, getRecentInventoryDonarController);
router.get("/get-recent-inventory-organisation", authMiddelware, getRecentInventoryOrganisationController);

//GET HOSPITAL BLOOD RECORDS
router.get(
  "/get-inventory-hospital",
  authMiddelware,
  getInventoryHospitalController
);

//GET DONAR RECORDS
router.get("/get-donars", authMiddelware, getDonarsController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddelware, getHospitalController);

//GET orgnaisation RECORDS
router.get("/get-orgnaisation", authMiddelware, getOrgnaisationController);

//GET orgnaisation RECORDS
router.get(
  "/get-orgnaisation-for-hospital",
  authMiddelware,
  getOrgnaisationForHospitalController
);

router.get("/org-list", authMiddelware, getOrgListController);

module.exports = router;
