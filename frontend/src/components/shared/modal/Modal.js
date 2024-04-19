import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "./../../../services/API";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Modal = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);


  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || "");
  const [quantity, setQuantity] = useState(0);
  // const [email, setEmail] = useState("");
  const [organisationName, setOrganisationName] = useState("");

  // get org lists
  const getOrgs = async () => {
    try {
      const { data } = await API.get("/inventory/org-list");
      console.log(data);
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please Provide All Fields");
      }
      // console.log(user?._id);
      const { data } = await API.post("/inventory/create-inventory", {
        email: user?.email,
        organisationName,
        inventoryType,
        bloodGroup: user.bloodGroup,
        quantity,
        accepted: "process",
      });
      console.log(data);
      // if (user?.role === "donar") {
      //   const { data: data1 } = await API.put(
      //     `gift/update-user-point/${user._id}`,
      //     {
      //       point: user.point + 50,
      //     }
      //   );
      //   console.log(data1);
      // }
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };

  useEffect(() => {
    getOrgs();
  }, [user]);

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <Box sx={style}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <Typography
                  id="transition-modal-title staticBackdropLabel"
                  variant="h6"
                  component="h2"
                >
                  Manage Blood Record
                </Typography>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="d-flex mb-3">
                  {user?.role === "donar" && (
                    <div className="form-check">
                      <div>
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            Request
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="in"
                              control={<Radio />}
                              label="IN"
                              onChange={(e) => setInventoryType(e.target.value)}
                            />
                            <FormControlLabel
                              value="out"
                              control={<Radio disabled />}
                              label="OUT"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  )}
                  {user?.role === "hospital" && (
                    <div className="form-check">
                      <div>
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            Request
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="in"
                              control={<Radio disabled />}
                              label="IN"
                            />
                            <FormControlLabel
                              value="out"
                              control={<Radio />}
                              label="OUT"
                              onChange={(e) => setInventoryType(e.target.value)}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  )}
                </div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bloodGroup}
                    label="Blood Group"
                    // onChange={(e) => setBloodGroup(e.target.value)}
                    onChange={(e) => {
                      const selectedBloodGroup = user.bloodGroup;
                      if (!["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"].includes(selectedBloodGroup)) {
                        alert("Invalid Blood Group");
                      } else {
                        setBloodGroup(selectedBloodGroup);
                      }
                    }}
                  >
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                  </Select>
                </FormControl>
                {/* <label style={{ marginBottom: "5px" }}>Organisation Name</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={organisationName}
                  onChange={(e) => setOrganisationName(e.target.value)}
                >
                  <option defaultValue={"Open this select menu"}>
                    Open this select menu
                  </option>
                  {data?.map((record) => (
                    <option key={record._id} value={record.organisationName}>
                      {record.organisationName}
                    </option>
                  ))}
                </select> */}
                <br></br>
                <hr></hr>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Organisation Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={organisationName}
                    label="Organisation Name"
                    onChange={(e) => setOrganisationName(e.target.value)}
                  >
                    {data?.map((record) => (
                      <MenuItem key={record._id} value={record.organisationName}>{record.organisationName}</MenuItem>
                    ))}
                    
                  </Select>
                </FormControl>
                <br></br>
                <hr></hr>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Quantity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quantity}
                    label="Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    <MenuItem value={"250"}>250</MenuItem>
                    <MenuItem value={"300"}>300</MenuItem>
                    <MenuItem value={"350"}>350</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleModalSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default Modal;
