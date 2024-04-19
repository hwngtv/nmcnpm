// Importing required modules and models
const giftModel = require("../models/giftModel");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

// Controller function to get the list of gifts
const GetGiftListController = async (req, res) => {
  try {
    // Fetching gift data from the database and sorting it by createAt field in descending order
    const giftData = await giftModel.find().sort({ createAt: -1 });

    // Sending a success response with the total count of gifts, a success message, and the gift data
    return res.status(200).send({
      success: true,
      TotalCount: giftData.length,
      message: "Gift List Fetched Successfully",
      giftData,
    });
  } catch (error) {
    // Handling errors and sending an error response with details
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in GiftGroup Data API",
      error,
    });
  }
};

// Controller function to create a new gift
const createGiftController = async (req, res) => {
  try {
    // Creating a new gift instance with data from the request body
    const gift = new giftModel(req.body);

    // Saving the new gift to the database
    await gift.save();

    // Sending a success response
    return res.status(201).send({
      success: true,
      message: "New Gift Added",
    });
  } catch (error) {
    // Handling errors and sending an error response with details
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Gift API",
      error,
    });
  }
};

// Controller function to delete a gift
const deleteGiftController = async (req, res) => {
  try {
    // Deleting a gift based on the provided gift ID
    await giftModel.findByIdAndDelete(req.params.id);

    // Sending a success response
    return res.status(200).send({
      success: true,
      message: "Record Deleted successfully",
    });
  } catch (error) {
    // Handling errors and sending an error response with details
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting",
      error,
    });
  }
};

// Controller function to update a gift
const updateGiftController = async (req, res) => {
  try {
    // Extracting parameters from the request
    const { id } = req.params;
    const { giftName, point, remain } = req.body;

    // Updating the gift information based on the provided ID
    await giftModel.findByIdAndUpdate(id, { giftName, point, remain });

    // Sending a success response
    return res.status(200).send({
      success: true,
      message: "Record Updated successfully",
    });
  } catch (error) {
    // Handling errors and sending an error response with details
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating",
      error,
    });
  }
};

// Controller function to update user points
const updateUserPointController = async (req, res) => {
  try {
    // Extracting parameters from the request
    const { id } = req.params;
    const { point } = req.body;

    // Updating the user's points based on the provided user ID
    await userModel.findByIdAndUpdate(
      id,
      { point },
      { new: true } // Returning the updated document
    );

    // Sending a success response
    return res.status(200).send({
      success: true,
      message: "User point updated successfully",
    });
  } catch (error) {
    // Handling errors and sending an error response with details
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating user point",
      error,
    });
  }
};

// Controller function to get user data for updating points
const GetUserToUpdatePointController = async (req, res) => {
  try {
    // Fetching user data based on the provided user ID
    const userData = await userModel.findById(req.params.id);

    // Sending a success response with the user data
    return res.status(200).send({
      success: true,
      message: "Get User from Id Successfully",
      userData,
    });
  } catch (error) {
    // Handling errors and sending an error response with details
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while fetching user",
      error,
    });
  }
}

// Exporting the controller functions
module.exports = {
  GetGiftListController,
  createGiftController,
  deleteGiftController,
  updateGiftController,
  updateUserPointController,
  GetUserToUpdatePointController,
};
//////