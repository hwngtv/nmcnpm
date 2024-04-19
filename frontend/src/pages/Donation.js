import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";
import { Box, Button, Modal, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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

const Donation = () => {
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

  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr style={{ textAlign: "center" }}>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Email</th>
              <th scope="col">Accepted</th>
              <th scope="col">
              Detail
            </th>
            </tr>
          </thead>
          <tbody >
            {data?.map((record) => (
              <tr key={record._id} style={{ textAlign: "center", color: record.accepted === "process" ? "red" : record.accepted === "deny" ? "blue" : record.accepted === "accept" ? "green" : "inherit" }}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType.toUpperCase()}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{record.accepted.toUpperCase()}</td>
                <td>
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
            {selectedRecord && selectedRecord.organisation.organisationName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Blood Group: {selectedRecord && selectedRecord.bloodGroup}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Inventory Type: {selectedRecord && selectedRecord.inventoryType.toUpperCase()}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Quantity: {selectedRecord && selectedRecord.quantity}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Accepted: {selectedRecord && selectedRecord.accepted.toUpperCase()}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Date Created:{" "}
            {selectedRecord &&
              moment(selectedRecord.createdAt).format("DD/MM/YYYY hh:mm A")}
          </Typography>
        </Box>
      </Modal>
      </div>
    </Layout>
  );
};

export default Donation;