import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

/* Navbar is added directly from React-Bootstrap 
Library at https://react-bootstrap.github.io/components/navbar/*/

const NavBar = () => {
  return (
    <Navbar default collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavDropdown eventKey={1} title="Users" id="basic-nav-dropdown">
            <MenuItem eventKey={1.1} href="/add" to="/add">
              Create Account
            </MenuItem>
            <MenuItem eventKey={1.2} href="/delete" to="/delete">
              Modify Account
            </MenuItem>
          </NavDropdown>
          <NavItem
            eventKey={2}
            componentClass={Link}
            href="/claims"
            to="/claims"
          >
            Claims
          </NavItem>
          <NavItem
            eventKey={3}
            componentClass={Link}
            href="/insurancepayers"
            to="/insurancepayers"
          >
            Insurance Payer
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
