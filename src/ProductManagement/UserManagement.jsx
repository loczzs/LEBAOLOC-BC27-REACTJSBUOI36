import React, { Component } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import axios from "axios";

export default class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      selectUser: null,
    };
  }
  fetchUserapi = async () => {
    try {
      const { data } = await axios.get(
        "https://62da614a9eedb699636cab62.mockapi.io/user"
      );
      this.setState({ users: data });
    } catch {}
  };

  fetchUserDetails = async (userId) => {
    // console.log(userId)
    try {
      // Call API get product details
      const { data } = await axios.get(
        `https://62da614a9eedb699636cab62.mockapi.io/user/${userId}`
      );
      // Thành công
      this.setState({ selectUser: data });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchUserapi();
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center text-danger">
          Bài tập quản lý người dùng thực hành State, Props, Lifecycle
        </h1>
        <div className="card mb-5">
          <div className="card-header bg-dark text-white">
            <strong>User Form</strong>
          </div>
          <div className="card-body">
            <UserForm
              onSuccess={this.fetchUserapi}
              user={this.state.selectUser}
            />
          </div>
        </div>
        <UserList
          onSelectProduct={this.fetchUserDetails}
          onDeleteSuccess={this.fetchUserapi}
          users={this.state.users}
        />
      </div>
    );
  }
}
