import React, { Component } from "react";
import axios from "axios";

export default class UserList extends Component {
  handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://62da614a9eedb699636cab62.mockapi.io/user/${userId}`
      );
      // Thành công, gọi tới prop onDeleteSuccess để chạy lại hàm fetchProducts ở component ProductManagement
      this.props.onDeleteSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { users } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tài khoản</th>
            <th>họ tên</th>
            <th>Mật khẩu</th>
            <th>Emai</th>
            <th>số điện thoại </th>
            <th>Loại người dùng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.taikhoan}</td>
                <td>{user.hoten}</td>
                <td>{user.matkhau}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.type}</td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => this.props.onSelectProduct(user.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
