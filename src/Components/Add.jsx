import React from "react";
import "./Add.css";
import { axios } from "axios";
import { Redirect } from "react-router-dom";
/*This is the Add page i.e Create Account Page */

/*this is the form validation function
returning true if there is any error message stored 
in formErrors object else false
 */
const pattern = RegExp(/^[a-zA-Z0-9]/);

const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 ? (valid = false) : null;
  });

  return valid;
};

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      userid: "",
      firstname: "",
      lastname: "",
      age: "",
      gender: "",
      address: "",
      data: [],
      redirectToHome: false
    };
  }
  /*Storing the  error messages in an object copy 
of state */
  formErrors = {
    userid: "",
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    address: ""
  };
  handleChange = e => {
    const { name, value } = e.target;

    /*Performing validations here

    Validations Included:
    1. Userid can be alphanumeric but cannot start with
    a number
    2. Firstname should be minimum of 3 characters and
    also cannot contain any number.
    3.Lastname should be minimum of 3 characters and
    also cannot contain any number.
    4.Age should be above 18 years.
    5.Address should have a minimum of 10 characters
    6.Prevents submitting empty form
    7.Names should start only with captial letter 
     
   Improvements needed:
    1. freeze input when user enters invalid data 
    2. prevent entering negative numbers in userid and names
    3. address attributes should be included
     */
    if (name === "userid") {
      /*   if (pattern.test(value)){
        this.formErrors.userid = ""
      }else{
        this.formErrors.userid = "invalid" 
      } */

      if (!isNaN(value.charAt(0)) || !isNaN(value.charAt(0)) < 0) {
        this.formErrors.userid = "userid cannot start with a number";
        /*or condition not working, 
 accepting negative number at 1st index */
      } else if (value.length < 3) {
        this.formErrors.userid = "minimum 3 characters required";
      } else {
        this.formErrors.userid = "";
      }
    }
    if (name === "firstname") {
      if (!(value.charAt(0) == value.charAt(0).toUpperCase())) {
        this.formErrors.firstname = "name should start with upper case";
      } else if (value.length < 3) {
        this.formErrors.firstname = "minimum 3 characters required";
      } else {
        for (let i = 0; i < value.length; i++) {
          if (value[i] <= 9) {
            this.formErrors.firstname = "no numbers allowed";
            /*throwing error but still accepting negative number*/
          } else {
            this.formErrors.firstname = "";
          }
        }
      }
    }
    if (name === "lastname") {
      if (!(value.charAt(0) == value.charAt(0).toUpperCase())) {
        this.formErrors.lastname = "name should start with upper case";
      } else if (value.length < 3) {
        this.formErrors.lastname = "minimum 3 characters required";
      } else {
        for (let i = 0; i < value.length; i++) {
          if (value[i] <= 9) {
            this.formErrors.lastname = "no numbers allowed";
          } /*throwing error but still accepting negative number*/ else {
            this.formErrors.lastname = "";
          }
        }
      }
    }

    if (name === "age") {
      if (value < 18) {
        this.formErrors.age = "minimum age should be 18";
      } else {
        this.formErrors.age = "";
      }
    }

    if (name === "address") {
      if (value.length < 10) {
        this.formErrors.address = "enter minimum 10 characters";
      } else {
        this.formErrors.address = "";
      }
    }

    this.setState({
      [name]: value
    });
    console.log(this.state);
  };

  componentWillMount() {
    if (localStorage.getItem("userData")) {
      let userData = JSON.parse(localStorage.getItem("userData"));

      this.setState({
        data: userData
      });
    }
  }
  handleSubmit = event => {
    event.preventDefault();

    const formErrors = this.formErrors;
    /* if (formEmpty(userData)) {
      this.setState({
        redirectToHome: false
      }); 
      alert("Form is Empty, Enter Details"); 
    } else */

    if (
      this.state.userid === "" ||
      this.state.firstname === "" ||
      this.state.lastname === "" ||
      this.state.age === "" ||
      this.state.gender === "" ||
      this.state.address === ""
    ) {
      alert("Form is empty");
      return false;
    }

    if (formValid(formErrors)) {
      this.setState({
        redirectToHome: true
      });

      alert(`
        --SUBMITTING--
      User ID: ${this.state.userid}
      First Name: ${this.state.firstname}
      Last Name: ${this.state.lastname}
      Age: ${this.state.age}
       Gender: ${this.state.gender}
      Address: ${this.state.address}
      
      `);

      let pushData = {
        userid: this.state.userid,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        age: this.state.age,
        gender: this.state.gender,
        address: this.state.address
      };

      this.state.data.push(pushData);
      localStorage.setItem("userData", JSON.stringify(this.state.data));

      /*Polulating to JSON File (Method 1)
        axios.post("/UserData.json", this.state).then(res => {
         console.log(res);
         console.log(res.data);
       });

      //Polulating to JSON File (Method 2)
      fetch("./UserData.json", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        response.json().then(data => {
          console.log("Successful" + data);
        });
      }); */
    } else {
      alert("FORM INVALID!");
    }
  };

  render() {
    /*Redirecting back to home page after form submit */
    if (this.state.redirectToHome) {
      return <Redirect to={"/"} />;
    }
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <table>
              <tr>
                <td>
                  <label htmFor="userid">User ID: </label>{" "}
                </td>
                <td>
                  {" "}
                  <input
                    className={
                      this.formErrors.userid.length > 0 ? "error" : null
                    }
                    type="text"
                    name="userid"
                    placeholder="User ID"
                    onChange={this.handleChange}
                    pattern="[a-zA-z]"
                  />{" "}
                  <br />
                  {this.formErrors.userid.length > 0 ? (
                    <span className="errorMessage">
                      {this.formErrors.userid}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </td>{" "}
              </tr>
              <tr>
                {" "}
                <td>
                  <label htmlFor="firstname">First Name: </label>{" "}
                </td>
                <td>
                  {" "}
                  <input
                    className={
                      this.formErrors.firstname.length > 0 ? "error" : null
                    }
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={this.handleChange}
                    noValidate
                  />
                  <br />
                  {this.formErrors.firstname.length > 0 ? (
                    <span className="errorMessage">
                      {this.formErrors.firstname}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </td>{" "}
              </tr>
              <tr>
                {" "}
                <td>
                  <label htmlFor="lastname">Last Name: </label>{" "}
                </td>
                <td>
                  {" "}
                  <input
                    className={
                      this.formErrors.lastname.length > 0 ? "error" : null
                    }
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                    noValidate
                  />{" "}
                  <br />
                  {this.formErrors.lastname.length > 0 ? (
                    <span className="errorMessage">
                      {this.formErrors.lastname}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </td>{" "}
              </tr>
              <tr>
                {" "}
                <td>
                  <label htmlFor="age">Age: </label>{" "}
                </td>
                <td>
                  {" "}
                  <input
                    className={this.formErrors.age.length > 0 ? "error" : null}
                    type="number"
                    name="age"
                    placeholder="Age"
                    onChange={this.handleChange}
                    noValidate
                  />{" "}
                  <br />
                  {this.formErrors.age.length > 0 ? (
                    <span className="errorMessage">{this.formErrors.age}</span>
                  ) : (
                    ""
                  )}{" "}
                </td>{" "}
              </tr>
              <tr>
                <td>
                  <label htmlFor="gender"> Gender: </label>{" "}
                </td>
                <td>
                  {" "}
                  <select
                    name="gender"
                    value={this.gender}
                    onChange={this.handleChange}
                  >
                    <option>--Select Gender -- </option>
                    <option value="male">Male </option>
                    <option value="female">Female </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="address"> Address: </label>{" "}
                </td>
                <td>
                  {" "}
                  <textarea
                    className={
                      this.formErrors.address.length > 0 ? "error" : null
                    }
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={this.address}
                    onChange={this.handleChange}
                  />
                  <br />
                  {this.formErrors.address.length > 0 ? (
                    <span className="errorMessage">
                      {this.formErrors.address}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
              </tr>{" "}
            </table>
            <div className="createAccount">
              <button type="submit">Create Account </button> <br />
              <small>Already have an Accout? </small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Add;
