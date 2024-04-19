import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  const { user } = useSelector((state) => state.auth);
  // const colors = [
  //   "#884A39",
  //   "#C38154",
  //   "#FFC26F",
  //   "#4F709C",
  //   "#4942E4",
  //   "#0079FF",
  //   "#FF0060",
  //   "#22A699",
  // ];
  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lifrecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  //get function
  const getBloodRecords = async () => {
    try {
      let endpoint = "";
      if (user?.role === "hospital") {
        endpoint = "/inventory/get-recent-inventory-hospital";
      } else if (user?.role === "donar") {
        endpoint = "/inventory/get-recent-inventory-user";
      } else if (user?.role === "organisation") {
        endpoint = "/inventory/get-recent-inventory-organisation";
      }

      if (endpoint) {
        const { data } = await API.get(endpoint);
        if (data?.success) {
          setInventoryData(data?.inventory);
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
    <>
      {/* <Header /> */}
      <Layout>
        {user?.role === "organisation" && data.length > 0 && (
          <>
            <div>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={6}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 600,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                      >
                        Total In
                      </Typography>
                      <BarChart
                        series={[
                          { data: data.map((record) => record.totalIn) },
                        ]}
                        xAxis={[
                          {
                            scaleType: "band",
                            data: data.map((record) => record.bloodGroup),
                          },
                        ]}
                        height={550}
                        width={550}
                        leftAxis={null}
                      />
                    </Paper>
                  </Grid>
                  {/* Recent Deposits */}
                  <Grid item xs={12} md={4} lg={6}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 600,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                      >
                        Total Out
                      </Typography>
                      <BarChart
                        series={[
                          { data: data.map((record) => record.totalOut) },
                        ]}
                        xAxis={[
                          {
                            scaleType: "band",
                            data: data.map((record) => record.bloodGroup),
                          },
                        ]}
                        height={550}
                        width={550}
                        leftAxis={null}
                      />
                    </Paper>
                  </Grid>
                  {/* Recent Orders */}
                  <Grid item xs={12}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                      >
                        Availabe Blood
                      </Typography>
                      <BarChart
                        series={[
                          { data: data.map((record) => record.availabeBlood) },
                        ]}
                        xAxis={[
                          {
                            scaleType: "band",
                            data: data.map((record) => record.bloodGroup),
                          },
                        ]}
                        height={550}
                        width={550}
                        leftAxis={null}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </>
        )}

        <div className="container my-3">
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Recent Blood Transactions
          </Typography>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Donar Email</th>
                <th scope="col">TIme & Date</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData?.map((record) => (
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity} (ML)</td>
                  <td>{record.email}</td>
                  <td>
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default Analytics;
