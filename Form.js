import React, { Component } from "react";
import "./form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      number: "",
      errorName: "",
      errorNumber: "",
      errorEmail: "",
    };
    this.changeName = this.changeName.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate() {
    let number = this.state.number;
    let regNumber = number.match(
      /(?<=(^|\n)(\+)?(38)?)(050|063|093|094|095|099|098|097|096|067|068|066)\d{7}(?=\r?\n|$)/
    );
    let email = this.state.email;
    let regEmail = email.match(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    );
    let errorName = "";
    let errorNumber = "";
    let errorEmail = "";
    if (this.state.name.length < 1) {
      errorName = "Поле не может быть пустым";
      this.setState({ errorName, errorNumber, errorEmail });
      return false;
    } else if (!regNumber) {
      errorNumber = "Не корректный номер. Попробуйте ещё раз.";
      this.setState({ errorName, errorNumber, errorEmail });
      return false;
    } else if (!regEmail) {
      errorEmail = "Не корректный адрес. Попробуйте ещё раз.";
      this.setState({ errorName, errorNumber, errorEmail });
      return false;
    } else {
      this.setState({ errorName, errorNumber, errorEmail });
      return true;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({ name: "", number: "", email: "" });
    }
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeNumber(event) {
    this.setState({ number: event.target.value });
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div className="form">
        <h1>Форма регистрации</h1>
        <form>
          <h4>Имя</h4>
          <input
            type="text"
            className="form-control"
            value={this.state.name}
            onChange={this.changeName}
          />
          <div style={{ color: "red" }}>{this.state.errorName}</div>
          <h4>Номер телефона</h4>
          <input
            type="text"
            className="form-control"
            value={this.state.number}
            onChange={this.changeNumber}
          />
          <div style={{ color: "red" }}>{this.state.errorNumber}</div>
          <h4>Email</h4>
          <input
            type="email"
            className="form-control"
            value={this.state.email}
            onChange={this.changeEmail}
          />
          <div style={{ color: "red" }}>{this.state.errorEmail}</div>
          <button
            type="submit"
            className="btn btn-warning"
            onClick={this.handleSubmit}
          >
            Отправить
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
