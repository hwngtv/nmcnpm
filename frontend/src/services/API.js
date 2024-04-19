// Import the Axios library
import axios from "axios";

// Create an instance of Axios with a base URL from the environment variable REACT_APP_BASEURL
const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

// Intercept requests and attach the Authorization header if a token is present in the local storage
API.interceptors.request.use((req) => {
  // Check if a token exists in the local storage
  if (localStorage.getItem("token")) {
    // Attach the Authorization header with the Bearer token
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
  }
  // Return the modified request object
  return req;
});

export default API;
////////////////////////////////