/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function SectionGoal() {
  return (
    <>
      <div className="section section-dark"
        >
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title">Our goal</h2>
              <h3 className="description">
                We wish to provide amatures and expert on teas alike the possibility 
                of finding recepies and other related things that they might enjoy.
                With this provide a user-friendly platform and give as much of an
                enjoyable experience as possible.
              </h3>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionGoal;
