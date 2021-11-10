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
import IndexNavbar from "../../components/Navbars/IndexNavbar";

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
      <IndexNavbar />
      <SurveyPageHeader />
      <div className="section profile-content">
        <Container>
          <br />
          <br />
          <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
            <Row className="ml-auto mr-auto text-center">
              <legend>
                This small survey will provide us with information
                which we would use to provide teas which you might enjoy.
              </legend></Row>
              <Row>
              <Col md="6">
                <CardBody>
                  <CardTitle></CardTitle>
                  <CardSubtitle></CardSubtitle>
                  <legend>Tea Types</legend>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  All Types <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Green Tea <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Yellow Tea <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Black Tea <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  White Tea <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Oolong Tea <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Herbal Tea <span className="form-check-sign" />
                    </Label></FormGroup>
                </CardBody>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md="6">
                <CardBody>
                  <CardTitle></CardTitle>
                  <CardSubtitle></CardSubtitle>
                  <legend>Difficulty</legend>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" name="all recipes" />
            All Recipes<span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" name="easy" />
            Easy<span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" name="medium" />
            Medium<span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" name="hard" />
            Hard<span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                </CardBody>
              </Col>
              <Col md="6">
                <CardBody>
                  <CardTitle></CardTitle>
                  <CardSubtitle></CardSubtitle>
                  <legend>Taste</legend>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  All Types <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Bitter <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Sweet <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Sour <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Salty <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                </CardBody>
              </Col>
            </Row>
            <CardTitle></CardTitle>
            <CardSubtitle></CardSubtitle>
            <legend>Notes</legend>
            <Row>
              <Col md="6">
                <CardBody>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Fruity <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Creamy <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Earthy <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Zesty <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Spicy <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Nutty <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Floral <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Woody <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Gourmand <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                </CardBody>
              </Col>
              <Col md="6">
                <CardBody>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Citrus <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Mineral <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Herb and Vegetal <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Acidic <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Smoky <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Hesperian <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Tannic <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                  Velvety <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                </CardBody>
              </Col>
            </Row>

            <CardTitle></CardTitle>
            <CardSubtitle></CardSubtitle>
            <legend>Ingredients</legend>
            <Row>
              <Col md="6">
                <CardBody>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Water <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Milk <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Honey <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Lemon <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Sugar <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Mint <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Lemon Zest <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Lemon Juice <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Sage Leaves <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Coconut <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Cinnamon <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Cloves <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Ginger <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Basil <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Sorbet <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Boba <span className="form-check-sign" />
                    </Label></FormGroup>
                </CardBody>
              </Col>
              <Col md="6">
                <CardBody>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Caramel <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Chocolate <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Almond <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Pistachio <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Peanut <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Açai <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Pumpkin Spice <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        cranberries <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        White Sugar <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Oranges <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Cinnamon Stick <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Agave Syrup <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Mango Cubes <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Strawberries <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Mint Leaves <span className="form-check-sign" />
                    </Label></FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                        Watermelon <span className="form-check-sign" />
                    </Label></FormGroup>
                </CardBody>
              </Col>
            </Row>

            <br/>
            <Row>
              <Col md="1">
                <Button
                  className="btn-round mr-1"
                  color="success"
                  href="/survey-result"
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
