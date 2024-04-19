const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");
//GET BLOOD DATA
const bloodGroupDetailsContoller = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    // Extract the user ID from the request body and convert it into a MongoDB ObjectId.
    const organisation = new mongoose.Types.ObjectId(req.body.userId);
    // console.log(organisation);
    //get single blood group
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // Iterate through each blood group using Promise.all to perform asynchronous operations concurrently.
        //COunt TOTAL IN
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
              accepted: "accept",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        // Use the aggregate framework to calculate the total quantity of blood units received for a specific blood group.
        //COunt TOTAL OUT
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
              accepted: "accept",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        // Use the aggregate framework to calculate the total quantity of blood units issued for a specific blood group.
        //CALCULATE TOTAL
        // console.log(totalIn[0]);
        // console.log(totalOut[0]);
        const availabeBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        //PUSH DATA
        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availabeBlood,
        });
      })
    );

    return res.status(200).send({
      success: true,
      message: "Blood Group Data Fetch Successfully",
      bloodGroupData,
    });
    // If successful, send a JSON response with success status, a success message, and the blood group data.

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error,
    });
     // If an error occurs, log the error, and send a JSON response with failure status, an error message, and the error object.
  }
};

module.exports = { bloodGroupDetailsContoller };
////////////////////////////////////////////////////////////////