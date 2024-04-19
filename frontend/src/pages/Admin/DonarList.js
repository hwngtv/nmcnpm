import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const DonarList = () => {
  const [data, setData] = useState([]);
  //find donar records
  // Hàm lấy danh sách người quyên máu từ API
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      //   console.log(data);
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Sử dụng useEffect để gọi hàm getDonars khi component được render
  useEffect(() => {
    getDonars();
  }, []);

  //DELETE FUNCTION
  // Hàm xử lý xóa bản ghi người quyên máu
  const handleDelete = async (id) => {
    try {
      // Hiển thị prompt để xác nhận xóa
      let answer = window.prompt(
        "Are You SUre Want To Delete This Donar",
        "Sure"
      );
      if (!answer) return;
      // Gọi API để xóa người quyên máu với id tương ứng
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
              <td>{record.name || record.organisationName + " (ORG)"}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
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

export default DonarList;
