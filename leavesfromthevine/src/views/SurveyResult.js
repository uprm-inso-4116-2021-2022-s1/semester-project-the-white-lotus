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
import {Container, Row, Col, Card, CardBody, CardTitle, CardText, CardSubtitle} from 'reactstrap';
import {
    Button,
    ButtonGroup,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from "reactstrap";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

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
                        "url(" + require("assets/img/SurveyHeader.jpg") + ")",
                }}
                className="page-header page-header-xs"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter"/>
                <Container>
                    <div className="motto text-center">
                        <h1>Survey Result</h1>
                        <br/>
                    </div>
                </Container>
            </div>
        </>
    );
}

function SurveyResult() {
    let [recipes, setRecipes] = React.useState([])

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        fetch('http://localhost:5432/getfullrecipebyid/8')
            .then((response) => response.json())
            .then((tests) => setRecipes(tests.result.rows))
        document.body.classList.add("recipe-page");
        return function cleanup() {
            document.body.classList.remove("recipe-page");
        };
    });
    return (
        <>
            <ExamplesNavbar/>
            <PageHeader/>
            <div className="main">
                <div className="section text-center">
                    <Container >
                        <Row className="mr-0 ml-0">
                            {recipes.map((properties, index) =>
                                (properties.difficulty === "Easy" && <Col key={index}>
                                <Card style={{width: '20rem'}} >
                                    <CardBody>
                                        <CardTitle>{properties.title}</CardTitle>
                                        <CardSubtitle>{properties.teaname}</CardSubtitle>
                                        <CardText>
                                            <p>Note: {properties.note + ""}</p>
                                            <p>Yield: {properties.yield}</p>
                                            <p>Ingredients:{properties.ingredients + ""}</p>
                                            <p>Procedure: {properties.procedure}</p>
                                            <p>Difficulty: {properties.difficulty}</p>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>))}
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default SurveyResult;
