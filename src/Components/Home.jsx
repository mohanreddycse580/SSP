import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Jumbotron, Grid, Row, Col, Image, Button } from "react-bootstrap";
/*This is the home page */
const Home = () => {
  return (
    <Grid>
      <Jumbotron class="adjust">
        <h2>Welcome to Suncorp Insurance</h2>
        <p>
          Suncorp Insurance can help protect your valuable assets with a suite
          of home, contents and car insurance options. You can also access
          Suncorp branded income protection, life, travel, and health insurance
          to help support you and the things you value and rely on.
        </p>
        <Link to="https://www.suncorp.com.au/insurance/">
          <Button bsStyle="primary">Learn More</Button>
        </Link>
      </Jumbotron>
      <Row className="show-grid text-center">
        <Col lg={12} xs={12} sm={12}>
          <Image src="https://cdn.newsapi.com.au/image/v1/b7732a8601cdba1f03213ab58a3e1f1f?width=1024" />
        </Col>
      </Row>
    </Grid>
  );
};

export default Home;
