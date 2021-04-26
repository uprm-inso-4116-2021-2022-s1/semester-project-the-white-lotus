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
import {Container, Col, Row, Card, CardBody,CardText} from 'reactstrap';
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import funfacts from '../dummy data/funfact.json'

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
                        "url(" + require("assets/img/tea_catalogue.jpeg") + ")",
                }}
                className="page-header page-header-xs"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter"/>
                <Container>
                    <div className="motto text-center">
                        <h1>Fun Facts</h1>
                        <br/>
                    </div>
                </Container>
            </div>
        </>
    );
}


function FunFacts() {
    let [facts, setFacts] = React.useState([])
    fetch('http://localhost:5432/getfunfacts')
        .then((response) => response.json())
        .then((tests) => setFacts(tests.FunFacts.rows))
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("fun-facts");
        return function cleanup() {
            document.body.classList.remove("fun-facts");
        };
    });
    return (
        <>
            <ExamplesNavbar/>
            <PageHeader/>
            <div className="main">
                <div className="section text-center">
                    <Row className="mr-0 ml-0">
                        {facts.map((facts) =>
                        <Col>
                            <Card style={{width: '30rem'}}>
                                <CardBody>
                                    <CardText>{facts.funfact}</CardText>
                                </CardBody>
                            </Card>
                        </Col>)}
                    </Row>
                </div>
            </div>
            <DemoFooter/>
        </>
    );
}

export default FunFacts;
