// Importing required modules and the inventory model
const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");

// Controller function to get requests in process
const GetRequestController = async (req, res) => {
    try {
        // Fetching data from the inventory model where the request status is "process"
        const requestData = await inventoryModel.find({ accepted: "process" });

        // Sending a success response with the fetched request data
        return res.status(200).send({
            success: true,
            message: "Request process Fetched Successfully",
            requestData,
        });
    } catch (error) {
        // Handling errors and sending an error response with details
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get Request In Data",
            error,
        });
    }
};

// Controller function to update the status of a request
const UpdateRequestController = async (req, res) => {
    try {
        // Extracting parameters from the request
        const { id } = req.params;
        const { accepted } = req.body;

        // Updating the request status based on the provided ID
        await inventoryModel.findByIdAndUpdate(
            id,
            { accepted },
            { new: true } // Returning the updated document
        );

        // Sending a success response
        return res.status(200).send({
            success: true,
            message: "Update Request Successfully",
        });
    } catch (error) {
        // Handling errors and sending an error response with details
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Update Request",
            error,
        });
    }
}

// Exporting the controller functions
module.exports = {
    GetRequestController,
    UpdateRequestController
}
