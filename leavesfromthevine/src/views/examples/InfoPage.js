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
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";

function InfoPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <LandingPageHeader />
      <div className="main">
        <div className="section text-center ">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Types</h2>
                <h5 className="description">
                  Some types of tea are White, Yellow, Green, Oolong, Black and Dark (post-fermented).
                  Even though the come from the same plant, they are produced differently and their identity corresponds
                  to the wiltedness and oxygenation of their leaves. Tea that is not made from Camellia sinensis leaves is called
                  herbal tea, which uses infusions of fruit and other parts of a plant. Some people believe herbal tea is not really
                  tea, while others take it to be another type of this fascinating beverage.
                </h5>
                <br />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a>
                      <img
                          alt="..."
                          src={require("assets/img/faces/clem-onojeghuo-3.jpg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">White</CardTitle>
                        <h6 className="card-category">Subtitle</h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Description
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a>
                      <img
                          alt="..."
                          src={require("assets/img/faces/joe-gardner-2.jpg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Yellow</CardTitle>
                        <h6 className="card-category">Subtitle</h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Description
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a>
                      <img
                          alt="..."
                          src={require("assets/img/faces/erik-lucatero-2.jpg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Green</CardTitle>
                        <h6 className="card-category">Sub</h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Desc
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a>
                      <img
                          alt="..."
                          src={require("assets/img/faces/clem-onojeghuo-3.jpg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Oolong</CardTitle>
                        <h6 className="card-category">Subtitle</h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Description
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a>
                      <img
                          alt="..."
                          src={require("assets/img/faces/clem-onojeghuo-3.jpg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Black</CardTitle>
                        <h6 className="card-category">Subtitle</h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Description
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a>
                      <img
                          alt="..."
                          src={require("assets/img/faces/clem-onojeghuo-3.jpg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Dark</CardTitle>
                        <h6 className="card-category">Subtitle</h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Description
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Benefits</h2>
                <h5 className="description">
                  Consuming tea has proven medical benefits including, but is not limited to,
                  energy, weight loss, immune and digestive system enhancement and reduction of
                  heart attack risk.
                </h5>
                <br />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-album-2" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Energy</h4>
                    <p className="description">
                      Spend your time generating new ideas. You don't have to
                      think of implementing.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-bulb-63" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Weight Loss</h4>
                    <p>
                      Larger, yet dramatically thinner. More powerful, but
                      remarkably power efficient.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-chart-bar-32" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Immune and Digestive System</h4>
                    <p>
                      Choose from a veriety of many colors resembling sugar
                      paper pastels.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-chart-bar-32" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Heart Attack</h4>
                    <p>
                      Choose from a veriety of many colors resembling sugar
                      paper pastels.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Market</h2>
                <h5 className="description">
                  Currently, tea is the most popular manufactured drink and the secondmost consumed beverage,
                  second only to water. The market size value in 2020 forthe tea industry was 14.02 billion
                  of dollars and is expected to grow 5.5% from 2019to 2025.
                </h5>
                <br />
              </Col>
            </Row>
            <br />
          </Container>
        </div>
        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="text-center"> Questions? </h2>
                <Form className="contact-form">
                  <Row>
                    <Col md="6">
                      <label>Name</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" />
                      </InputGroup>
                    </Col>
                    <Col md="6">
                      <label>Email</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="text" />
                      </InputGroup>
                    </Col>
                  </Row>
                  <label>Message</label>
                  <Input
                    placeholder="Tell us your thoughts and feelings..."
                    type="textarea"
                    rows="4"
                  />
                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button className="btn-fill" color="danger" size="lg">
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default InfoPage;
