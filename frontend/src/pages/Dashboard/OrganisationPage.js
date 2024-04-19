import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const OrganisationPage = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const handleOpen = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedRecord(null);
    setOpen(false);
  };

  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  //find org records
  const getOrg = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-orgnaisation");
        //   console.log(data);
        if (data?.success) {
          setData(data?.organisations);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-orgnaisation-for-hospital"
        );
        //   console.log(data);
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, [user]);

  return (
    <Layout>
      <table className="table ">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th style={{ textAlign: "center" }} scope="col">
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id} style={{ textAlign: "center" }}>
              <td>{record.organisationName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td style={{ textAlign: "center" }}>
                <Button onClick={() => handleOpen(record)}>
                  <MoreHorizIcon style={{ cursor: "pointer" }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedRecord && selectedRecord.organisationName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email: {selectedRecord && selectedRecord.email}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Phone: {selectedRecord && selectedRecord.phone}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Address: {selectedRecord && selectedRecord.address}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Date Created:{" "}
            {selectedRecord &&
              moment(selectedRecord.createdAt).format("DD/MM/YYYY hh:mm A")}
          </Typography>
        </Box>
      </Modal>
    </Layout>
  );
};

export default OrganisationPage;
