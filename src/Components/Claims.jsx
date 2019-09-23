import React, { Component } from "react";
import { axios } from "axios";
import "./Claims.css";
import { Table, Label } from "react-bootstrap";

class Claims extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claimData: [],
      displayData: [],
      claims: false
    };
  }

  /*Please Note for the purpose of displaying large 
number of data from a JSON File, the json file is 
randomly generated using an online tool 
at https://www.mockaroo.com/ .Hence there is no
correlation in displayed data. Generated data is
stored in JSON File in public folder */

  componentDidMount = () => {
    fetch("/ClaimData.json")
      .then(r => r.json())
      .then(data => {
        this.setState({
          claimData: data
        });
      });
  };

  handleChange = e => {
    console.log(e.target.value);
    if (e.target.value === "") {
      this.setState({
        displayData: "",
        claims: false
      });
    } else if (e.target.value === "all") {
      const claim = this.state.claimData;
      this.setState({
        displayData: claim,
        claims: true
      });
    } else {
      const claim = this.state.claimData.filter(row => {
        return row.claimid.match(e.target.value);
      });
      this.setState({
        displayData: claim,
        claims: true
      });
    }
  };

  render() {
    const claims = this.state.claims;
    return (
      <div className="containerclaims">
        <h1> Claims Data</h1>
        <select className="select" onChange={this.handleChange}>
          <option value="" selected>
            --Select ID--
          </option>
          {this.state.claimData.map((row, index) => (
            <option key={index} value={row.claimid}>
              {row.claimid}
            </option>
          ))}
          <option value="all">All</option>
        </select>
        {claims ? (
          <div className="table1">
            <Table responsive striped bordered condensed hover>
              <thead>
                <tr>
                  <th className="thconfig1">Claim ID</th>
                  <th className="thconfig1">User ID </th>
                  <th className="thconfig1">Claim Name </th>
                  <th className="thconfig1">Claim Amount</th>
                  <th className="thconfig1">Claim Submit Date </th>
                  <th className="thconfig1">Hospital Name </th>
                  <th className="thconfig1">Claim Status </th>
                </tr>
              </thead>
              <tbody className="tbodyconfig1">
                {this.state.displayData.map(row => (
                  <tr>
                    {" "}
                    <td className="tdconfig1">{row.claimid}</td>
                    <td className="tdconfig1">{row.userid}</td>
                    <td className="tdconfig1">{row.claimname}</td>
                    <td className="tdconfig1">{row.claimamount}</td>
                    <td className="tdconfig1">{row.claimsubmitdate}</td>
                    <td className="tdconfig1">{row.hospitalname}</td>
                    <td className="tdconfig1">{row.claimstatus}</td>{" "}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Claims;
