import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";
import { Button } from "@mui/material";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //get function
  const getBloodRecords = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-inventory");
        if (data?.success) {
          setData(data?.inventory);
          console.log(data);
        }
      } else if (user?.role === "hospital") {
        const { data } = await API.get("/inventory/get-inventory-hospital");
        if (data?.success) {
          setData(data?.inventory);
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, [user]);
  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {user?.role === "organisation" && navigate("/request")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            {(user?.role === "donar" || user?.role === "hospital") && (
              <Button
                className="ms-4"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ cursor: "pointer", fontSize: "20px" }}
              >
                Add Inventory
              </Button>
            )}

            <table className="table table-striped">
              <thead className="thead-dark">
                <tr style={{textAlign: "center"}}>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donar Email</th>
                  <th scope="col">Accepted</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id} style={{textAlign: "center", color: record.accepted === "process" ? "red" : record.accepted === "deny" ? "blue" : record.accepted === "accept" ? "green" : "inherit"}}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType ? record.inventoryType.toUpperCase() : ""}</td>
                    <td>{record.quantity} (ML)</td>
                    <td>{record.email}</td>
                    <td>{record.accepted ? record.accepted.toUpperCase() : ""}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;




/*
useEffect(() => {
    getBloodRecords();
  }, [user]);
  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {user?.role === "organisation" && navigate("/request")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            {(user?.role === "donar" || user?.role === "hospital") && (
              <h4
                className="ms-4"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid"></i>
                Add Inventory
              </h4>
            )}

            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donar Email</th>
                  <th scope="col">Accepted</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity} (ML)</td>
                    <td>{record.email}</td>
                    <td>{record.accepted}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
};*/
