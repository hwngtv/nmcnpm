import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

import { Box, Button, Modal, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Hospitals = () => {
  const [hospitalInventory, setHospitalInventory] = useState([]);
  const [data, setData] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [open, setOpen] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState(null);

  const handleOpen = async (record) => {
    setSelectedRecord(record);
    setOpen(true);
    await getHospitalInventory(record._id);
  };
  const handleClose = () => {
    setSelectedRecord(null);
    setOpen(false);
    setDisplayCount(10);
  };

  const handleShowMore = () => {
    setDisplayCount(displayCount + 10);
  };
  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      //   console.log(data);
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHospitalInventory = async (recordId) => {
    try {
      // console.log(recordId);
      const {data} = await API.get(`/inventory/get-hospital-inventories/${recordId}`);
      console.log(data);
      if (data?.success) {
        setHospitalInventory(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <table className="table table-striped"  style={{marginTop: "20px"}}>
        <thead className="thead-dark">
          <tr style={{textAlign: "center"}}>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id} style={{textAlign: "center"}}>
              <td>{record.hospitalName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>
              <Button onClick={() => handleOpen(record)}>
                  <MoreHorizIcon style={{ cursor: "pointer" }} />
                </Button></td>
              {/* <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td> */}
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
            {selectedRecord && selectedRecord.name}
          </Typography>
          {hospitalInventory && (
            <table className="table table-striped">
            <thead className="thead-dark">
              <tr style={{ textAlign: "center" }}>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Date</th>
                <th scope="col">Accepted</th>
              </tr>
            </thead>
            <tbody >
              {hospitalInventory?.slice(displayCount-10, displayCount).map((item) => (
                <tr key={item._id} style={{ textAlign: "center", color: item.accepted === "process" ? "red" : item.accepted === "deny" ? "blue" : item.accepted === "accept" ? "green" : "inherit" }}>
                  <td>{item.bloodGroup}</td>
                  <td>{item.inventoryType.toUpperCase()}</td>
                  <td>{item.quantity}</td>
                  <td>{moment(item.createAt).format("DD/MM/YYYY hh:mm A")}</td>
                  <td>{item.accepted}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
          <Button variant="outlined" onClick={handleShowMore}>
            Show More
          </Button>
        </Box>
      </Modal>
    </Layout>
  );
};

export default Hospitals;
