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
import { Button, Container, Row, Col } from "reactstrap";

// core components

function SectionForumPreview() {
  return (
    <>
      <div className="section section-center"
      style={{
        backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
      }}>
        <Container>
          <Row className="example-page">
            <Col className="text-center" md="15">
              <a href="examples/landing.html" target="_blank">
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/examples/forum-page.jpg")}
                  style={{ width: "100%" }}
                />
              </a>
              <Button
                className="btn-round mr-1"
                color="primary"
                href="/forum-page"
              >
                Forum Page
              </Button>
              
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionForumPreview;
