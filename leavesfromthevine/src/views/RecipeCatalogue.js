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
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardSubtitle} from 'reactstrap';
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import recipes from '../dummy data/recipes.json'

function PageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
            "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
      <>
        <div
            style={{
              backgroundImage:
                  "url(" + require("assets/img/dpi-library.jpg") + ")",
            }}
            className="page-header"
            data-parallax={true}
            ref={pageHeader}
        >
          <div className="filter" />
          <Container>
            <div className="motto text-center">
              <h1>Recipe Catalogue</h1>
                <h3>Scroll down to view our available recipes.</h3>
              <br />
            </div>
          </Container>
        </div>
      </>
  );
}


function RecipeCatalogue() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("recipe-page");
    return function cleanup() {
      document.body.classList.remove("recipe-page");
    };
  });
  return (
      <>
        <ExamplesNavbar />
        <PageHeader />
        <div className="main">
          <div className="section text-center">
            <Container>
                <Row className="ml-auto mr-auto">
                    {recipes.single_recipe.map((properties) => <Col>
                        <Card>
                            <CardTitle>{properties.name}</CardTitle>
                            <CardSubtitle>{properties.tealeaves}</CardSubtitle>
                            <CardText>
                                <p>Ingredients: {properties.ingredients}</p>
                                <p>Procedure: {properties.procedure}</p>
                                <p>Difficulty: {properties.difficulty}</p>
                            </CardText>
                        </Card>
                    </Col>)}
                </Row>
            </Container>
          </div>
        </div>
        <DemoFooter />
      </>
  );
}

export default RecipeCatalogue;
