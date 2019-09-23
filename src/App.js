import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/NavBar";
import Add from "./Components/Add";
import Delete from "./Components/Delete";
import Claims from "./Components/Claims";
import InsurancePayers from "./Components/InsurancePayers";
import Edit from "./Components/Edit";

class App extends Component {
  /*constructor() {
    super();
    this.state = {};
  } */
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/delete" component={Delete} />
        </div>
      </Router>
    );
  }
}

export default App;
