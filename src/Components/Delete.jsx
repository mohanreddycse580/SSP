import React, { Component } from "react";
import "./Delete.css";
import { Redirect, Link } from "react-router-dom";
/*This is the Delete page i.e Modify Account Page */
import { Table } from "react-bootstrap";

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
  }

  /*Please Note for the purpose of displaying large 
number of data from a JSON File, the json file is 
randomly generated using an online tool 
at https://www.mockaroo.com/ .Hence there is no
correlation in displayed data. the json file is 
located in public folder */

  /* componentDidMount = () => {
      fetch("/UserData.json")
      .then(r => r.json())
      .then(data => {
        this.setState({
          userData: data
        });
      }); 

   
      });
  }; */

  componentWillMount() {
    if (localStorage.getItem("userData")) {
      let data = JSON.parse(localStorage.getItem("userData"));

      this.setState({
        userData: data
      });
    }
  }

  Remove = i => {
    let data = JSON.parse(localStorage.getItem("userData"));
    data.splice(i, 1);
    localStorage.setItem("userData", JSON.stringify(data));
    this.setState({
      userData: data
    });
  };

  render() {
    return (
      <div className="table1">
        <h1>Delete/Edit User Data</h1>

        <Table responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th className="thconfig1">User ID </th>
              <th className="thconfig1">First Name </th>
              <th className="thconfig1">Last Name</th>
              <th className="thconfig1">Age</th>
              <th className="thconfig1">Gender</th>
              <th className="thconfig1">Address</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {console.log(this.state.userData)}
            {this.state.userData.map((row, i) => (
              <tr>
                {" "}
                <td key={i}>{row.userid}</td>
                <td key={i}> {row.firstname}</td>
                <td key={i}> {row.lastname}</td>
                <td key={i}> {row.age}</td>
                <td key={i}> {row.gender}</td>
                <td key={i}> {row.address}</td>{" "}
                <td>
                  <button
                    onClick={() => this.Remove(i)}
                    className="myListButton"
                  >
                    Delete{" "}
                  </button>{" "}
                </td>
                <td>
                  <Link to={"/edit/" + i}>
                    <button type="button">Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Delete;
