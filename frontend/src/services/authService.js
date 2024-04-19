import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  // Prevent the default form submission behavior
  e.preventDefault();
  try {
    // Check if any of the required fields is missing, and display an alert if so
    if (!role || !email || !password) {
      return alert("Please Privde All Feilds");
    }
    // Dispatch the userLogin action with the provided email, password, and role to the Redux store
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    // Log any errors that occur during the login attempt
    console.log(error);
  }
};

// Function to handle user registration
export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  phone,
  organisationName,
  address,
  hospitalName,
  website,
  bloodGroup,
  point
) => {
  // Prevent the default form submission behavior
  e.preventDefault();
  try {
    // Dispatch the userRegister action with the provided registration information to the Redux store
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
        bloodGroup,
        point
      })
    );
  } catch (error) {
    // Log any errors that occur during the registration attempt
    console.log(error);
  }
};
////////////////////////////////