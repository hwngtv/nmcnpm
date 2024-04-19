import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
// Hàm lấy danh sách bệnh viện từ API
const HospitalList = () => {
  const [data, setData] = useState([]);
  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/hospital-list");
      console.log(data);
      if (data?.success) {
        setData(data?.hospitalData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Sử dụng useEffect để gọi hàm getHospitals khi component được render
  useEffect(() => {
    getDonars();
  }, []);

  //DELETE FUNCTION
  // Hàm xử lý xóa bản ghi bệnh viện
  const handelDelete = async (id) => {
    try {
      // Hiển thị prompt để xác nhận xóa
      let answer = window.prompt(
        "Are You SUre Want To Delete This Hospital",
        "Sure"
      );
      if (!answer) return;

      // Gọi API để xóa bệnh viện với id tương ứng
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      // Reload trang sau khi xóa
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <table className="table table-striped mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.hospitalName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handelDelete(record._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};







/*return (
    <Layout>
      <table className="table table-striped mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.hospitalName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handelDelete(record._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};*/

export default HospitalList;


//the function is to display a list of hospitals from the API and provide the ability to delete a specific hospital.