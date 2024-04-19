const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  // Define an asynchronous function named registerController, taking request (req) and response (res) as parameters.
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    // Check if a user with the provided email already exists.
    //validation
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User ALready exists",
      });
       // If the user already exists, send a JSON response with a failure status and a corresponding message.
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    // Hash the user's password using bcrypt before saving it to the database.
    //rest data
    const user = new userModel(req.body);
    console.log(user);
    await user.save();
// Create a new user instance and save it to the database.

    return res.status(201).send({
      success: true,
      message: "User Registerd Successfully",
      user,
    });

    // If successful, send a JSON response with success status, a success message, and the user data.
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
    // If an error occurs, log the error, and send a JSON response with failure status, an error message, and the error object.
  }
};

//login call back
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
      // If no user is found, send a JSON response with a failure status and an "Invalid Credentials" message.

    }
    //check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "role dosent match",
      });
      // If the user's role doesn't match the provided role, send a JSON response with a failure status and a corresponding message.
    }
    //compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
      // If the provided password doesn't match the stored hashed password, send a JSON response with a failure status and an "Invalid Credentials" message.
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // Generate a JSON Web Token (JWT) with the user's ID as the payload, using the specified JWT secret and setting an expiration time.
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
    // If successful, send a JSON response with success status, a success message, the JWT token, and the user data.
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
    // If an error occurs, log the error, and send a JSON response with failure status, an error message, and the error object.
  }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    // Find the user with the provided user ID.
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
    // If successful, send a JSON response with success status, a success message, and the user data.
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
    // If an error occurs, log the error, and send a JSON response with failure status, an error message, and the error object.
  }
};

module.exports = { registerController, loginController, currentUserController };
////////////////////////////////