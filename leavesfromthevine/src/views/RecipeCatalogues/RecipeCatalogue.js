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
import DemoFooter from "../../components/Footers/DemoFooter";
import AddPopover from "../../components/Page/AddPopover";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import RecipeModal from "./AddRecipeModal";

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
                        "url(" + require("assets/img/tea-flowers.jpg") + ")",
                }}
                className="page-header page-header-xs"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter"/>
                <Container>
                    <div className="motto text-center">
                        <h1>Recipe Catalogue</h1>
                        <br/>
                    </div>
                </Container>
            </div>
        </>
    );
}

function RecipeCatalogue() {
    let [recipes, setRecipes] = React.useState([])

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        fetch('http://localhost:5432/getfullrecipes')
            .then((response) => response.json())
            .then((tests) => setRecipes(tests.result.rows))
        document.body.classList.add("recipe-page");
        return function cleanup() {
            document.body.classList.remove("recipe-page");
        };
    });
    return (
        <>
            <IndexNavbar/>
            <PageHeader/>
            <div className="main">
                <Container>
                    <h3>Filters:</h3>
                    <p></p>
                    <UncontrolledDropdown>
                        <DropdownToggle
                            aria-expanded={false}
                            aria-haspopup={true}
                            caret
                            color="success"
                            data-toggle="dropdown"
                            href="#pablo"
                            id="dropdownMenuLink"
                            onClick={e => e.preventDefault()}
                            role="button"
                        >
                            Difficulties
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="dropdownMenuLink">
                            <DropdownItem href="/recipe-catalogue">
                                All Recipes
                            </DropdownItem>
                            <DropdownItem href="/e-recipe-catalogue">
                                Easy
                            </DropdownItem>
                            <DropdownItem href="/m-recipe-catalogue">
                                Medium
                            </DropdownItem>
                            <DropdownItem href="/h-recipe-catalogue">
                                Hard
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Container>
                <div className="section text-center">
                    <Container>
                        <div align="right">
                            <Row className="mr-auto ml-auto">
                                <Col>
                                    {/*<AddPopover/>*/}
                                    <RecipeModal/>
                                </Col>
                            </Row>
                        </div>
                        <Row className="mr-0 ml-0">
                            {recipes.map((properties, index) => <Col key={index}>
                                <Card style={{width: '20rem'}}>
                                    <CardBody>
                                        <CardTitle>{properties.title}</CardTitle>
                                        <CardSubtitle>{properties.teaname}</CardSubtitle>
                                        <CardText>
                                            <p>Note: {properties.note + ""}</p>
                                            <p>Yield: {properties.yield}</p>
                                            <p>Ingredients: {properties.ingredients + ""}</p>
                                            <p>Procedure: {properties.procedure}</p>
                                            <p>Difficulty: {properties.difficulty}</p>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>)}
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default RecipeCatalogue;
