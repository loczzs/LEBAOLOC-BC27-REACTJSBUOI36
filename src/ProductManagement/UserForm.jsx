import React, { Component } from "react";
import axios from "axios";

export default class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        taikhoan: "",
        hoten: "",
        matkhau: "",
        email: "",
        phone: "",
        type: "",
      },
    };
  }
  handleChange = (evt) => {
    console.log(evt.target);
    const { value, name } = evt.target; // dùng evt.target nhận đc hai key là name và value dùng detructuring bóc tách ra
    // name: name || descrition || price || image

    this.setState((state) => ({
      values: {
        ...state.values,
        [name]: value, //dynamic key es6
      },
    }));
  };
  handleSubmit = async (evt) => {
    evt.preventDefault();
    const { id, ...payload } = this.state.values;
    try {
        if (id) {
            // cập nhật
            await axios.put(
              `https://62da614a9eedb699636cab62.mockapi.io/user/${id}`,
              payload
            );
          } else {
            // hàm thêm cũ
            // await axios.post(
            //   "https://62da614a9eedb699636cab62.mockapi.io/user",
            //   this.state.values
            // );
            // hàm thêm mới
            await axios.post(
              "https://62da614a9eedb699636cab62.mockapi.io/user",
              payload
            );
          }

      this.setState({
        values: {
          taikhoan: "",
          hoten: "",
          matkhau: "",
          email: "",
          phone: "",
          type: "",
        },
      });


      this.props.onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  componentDidUpdate(prevProps, preState) {
    // Bởi vì componentDidUpdate sẽ tự động được thực thi khi state hoặc props thay đổi
    // Kiểm tra nếu prop product thay đổi, setState lại cho values bằng giá trị mới của prop product
    if (this.props.user && this.props.user !== prevProps.user) {
      this.setState({ values: { ...this.props.user } });
    }
  }

  render() {
    const { values } = this.state;
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <div className="mb-3 col-sm-6">
          <label htmlFor="taikhoan" className="form-label">
            tài khoản
          </label>
          <input
            id="taikhoan"
            className="form-control"
            name="taikhoan"
            value={values.taikhoan}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="hoten" className="form-label">
            họ tên
          </label>
          <input
            id="hoten"
            className="form-control"
            name="hoten"
            value={values.hoten}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="matkhau" className="form-label">
            Mật khẩu
          </label>
          <input
            id="matkhau"
            className="form-control"
            name="matkhau"
            value={values.matkhau}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="phone" className="form-label">
            số điện thoại
          </label>
          <input
            id="phone"
            className="form-control"
            name="phone"
            value={values.phone}
            onChange={this.handleChange}
          />
        </div>
       
        <div className="mb-3 col-sm-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-control"
            name="email"
            value={values.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="type" className="form-label">
            Mã loai người dùng
          </label>
          <select
            className="form-control"
            name="type"
            id="type"
            value={values.type}
            onChange={this.handleChange}
          >
            <option value="">chọn loại người dùng</option>
            <option value="khách hàng">khách hàng</option>
            <option value="nhân viên"> nhân viên</option>
          </select>
        </div>
        <button className="btn btn-dark col-sm-2 ">đăng ký </button>
        <div className="col-sm-1"></div>
        <button className="btn btn-primary col-sm-2"> cập nhật</button>
      </form>
    );
  }
}
