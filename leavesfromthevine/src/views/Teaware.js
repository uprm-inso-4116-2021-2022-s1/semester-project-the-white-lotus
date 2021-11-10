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
import {Container, Row, Col, Card, CardBody, CardTitle, CardText, CardSubtitle, CardImg} from 'reactstrap';
import {
  Button,
  ButtonGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar";

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
              <h1>Teaware</h1>
              <br/>
            </div>
          </Container>
        </div>
      </>
  );
}

function Teaware() {

  return (
      <>
        <IndexNavbar/>
        <PageHeader/>
        <div className="main">
          <Container>
          </Container>
          <div className="section text-center">
            <Container>
              <Row className="mr-0 ml-0">
                 <Col>
                   <Card style={{width: '20rem'}}>
                     <CardBody>
                       <CardImg></CardImg>
                       <CardTitle>{"A"}</CardTitle>
                       <CardSubtitle>{"A"}</CardSubtitle>
                       <CardText>
                         <p>Note: {"A"}</p>
                         <p>Yield: {"A"}</p>
                       </CardText>
                     </CardBody>
                   </Card>
                   <Card style={{width: '20rem'}}>
                     <CardImg top src="https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/white-tea-in-cup-1296x728.jpg?w=1155&h=1528" alt="..." />
                     <CardBody>
                       <CardTitle><h2>White tea</h2></CardTitle>
                       <CardText>Wilted and unoxidized</CardText>
                     </CardBody>
                   </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
  );
}

export default Teaware;
