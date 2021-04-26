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
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import SurveyPageHeader from "components/Headers/SurveyPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <SurveyPageHeader />
      <div className="section profile-content">
        <Container>
          <br />
          <br />
          <Card>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <p>
                  This small survey will provide us with information
                  which we would use to provide teas which you might enjoy.
              </p>
                <CardBody>
                  <CardTitle></CardTitle>
                  <CardSubtitle></CardSubtitle>
                  <CardText>
                    <FormGroup check>
                      <Label check>
                        <Input defaultValue="" type="checkbox" />
                        Option <span className="form-check-sign" />
                      </Label>
                      <Label check>
                        <Input defaultValue="" type="checkbox" />
                        Option <span className="form-check-sign" />
                      </Label>
                    </FormGroup>
                  </CardText>
                </CardBody>
              </Col>
            </Row>
            <br />
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <CardBody>
                  <CardTitle></CardTitle>
                  <CardSubtitle></CardSubtitle>
                  <CardText>
                    <FormGroup check>
                      <Label check>
                        <Input defaultValue="" type="checkbox" />
                  Option <span className="form-check-sign" />
                      </Label>
                      <Label check>
                        <Input defaultValue="" type="checkbox" />
                  Option <span className="form-check-sign" />
                      </Label>
                    </FormGroup>
                  </CardText>
                </CardBody>
              </Col>
            </Row>

            <Row>
              <Col className="ml-auto mr-auto" md="1">
                <Button
                  className="btn-round mr-1"
                  color="primary"
                  href="/landing-page"
                >
                  Submit
              </Button>
              </Col>
            </Row>
            <br />
            <br />

          </Card>
        </Container>
      </div>
    </>
  );
}

export default ProfilePage;
