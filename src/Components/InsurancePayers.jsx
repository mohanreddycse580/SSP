import React, { Component } from "react";
import { axios } from "axios";
import "./InsurancePayers.css";
import { Table } from "react-bootstrap";

class InsurancePayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insuranceData: [],
      displayData: [],
      claims: false
    };
  }
  /*Please Note for the purpose of displaying large 
number of data from a JSON File, the json file is 
randomly generated using an online tool 
at https://www.mockaroo.com/ .Hence there is no
correlation in displayed data. */

  componentDidMount = () => {
    fetch("/InsuranceData.json")
      .then(r => r.json())
      .then(data => {
        this.setState({
          insuranceData: data
        });
      });
  };

  handleChange = e => {
    if (e.target.value === "") {
      this.setState({
        displayData: "",
        claims: false
      });
    } else if (e.target.value === "all") {
      const claim = this.state.insuranceData;
      this.setState({
        displayData: claim,
        claims: true
      });
    } else {
      const claim = this.state.insuranceData.filter(row => {
        return row.payername.match(e.target.value);
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
        <h1>Insurance Data </h1>
        <select className="select" onChange={this.handleChange}>
          <option value="" selected>
            --Select Payer--
          </option>
          {this.state.insuranceData.map((row, index) => (
            <option key={index} value={row.payername}>
              {row.payername}
            </option>
          ))}
          <option value="all">All</option>
        </select>
        {claims ? (
          <div className="table1">
            <Table responsive striped bordered condensed hover>
              <thead>
                <tr>
                  <th className="thconfig1">Payer Name</th>
                  <th className="thconfig1">Claim ID </th>
                  <th className="thconfig1">Claim Amount Submitted</th>
                  <th className="thconfig1"> Claim Amount Approval </th>
                  <th className="thconfig1"> Claim Approval Status </th>
                </tr>
              </thead>
              <tbody className="tbodyconfig1">
                {this.state.displayData.map(row => (
                  <tr>
                    {" "}
                    <td className="tdconfig1">{row.payername}</td>
                    <td className="tdconfig1">{row.claimid}</td>
                    <td className="tdconfig1">{row.claimamountsubmit}</td>
                    <td className="tdconfig1">{row.claimamountapproval}</td>
                    <td className="tdconfig1">{row.claimapproval}</td>
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

export default InsurancePayers;
