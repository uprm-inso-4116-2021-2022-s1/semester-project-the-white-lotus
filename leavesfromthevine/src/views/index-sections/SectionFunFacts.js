import React from "react";

// reactstrap components
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import Carousel from "../../components/Others/Carousel.js"

// core components

function SectionFunFacts() {
  return (
    <>
      <div
        className="section text-dark"
        style={{
           backgroundImage: "url(" + require("assets/img/login.jpg") + ")",
        }}
      >
        <Container>
            <Row className="text-center" md="6">
            <Card className="card-register ml-auto mr-auto"
                style = {{
                    backgroundImage: "url(" + require("assets/img/teas.jpg") + ")",
                    color: 'white'
                }}>
                    <h2>Fun Facts</h2>
                    <h3>There are around 3,000 different types of tea.</h3>
            
                </Card>

                <Card className="card-register ml-auto mr-auto"
                style = {{
                    backgroundImage: "url(" + require("assets/img/teas.jpg") + ")",
                    color: 'white'
                }}>
                    <h2>Fun Facts</h2>
                    <h3>There are around 3,000 different types of tea.</h3>
            
                </Card>

                <Card className="card-register ml-auto mr-auto"
                style = {{
                    backgroundImage: "url(" + require("assets/img/teas.jpg") + ")",
                    color: 'white'
                }}>
                    <h2>Fun Facts</h2>
                    <h3>There are around 3,000 different types of tea.</h3>
            
                </Card>
            </Row>

            <Carousel/>

              
          {/* <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
                <h3 className="title mx-auto">Welcome</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mt-0"
                    color="facebook"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mt-0 ml-1"
                    color="google"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mt-0 ml-1"
                    color="twitter"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-twitter" />
                  </Button>
                </div>
                <Form className="register-form">
                  <label>Email</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" />
                  </InputGroup>
                  <label>Password</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" />
                  </InputGroup>
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                  >
                    Register
                  </Button>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div>
              </Card>
              <div className="col text-center">
                <Button
                  className="btn-round"
                  outline
                  color="neutral"
                  href="/register-page"
                  size="lg"
                  target="_blank"
                >
                  View Register Page
                </Button>
              </div>
            </Col>
          </Row> */}
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionFunFacts;