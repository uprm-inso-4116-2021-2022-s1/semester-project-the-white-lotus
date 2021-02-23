import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  CardText,
  Row,
  Col,
} from "reactstrap";
import Example from "../../components/Others/Carousel.js"

// core components

function SectionTeaTypesExample() {
  return (
    <>
      <div
        className="section section-dark text-center"
      >
        <Container>

            <Example/>

        </Container>
      </div>{" "}
    </>
  );
}

export default SectionTeaTypesExample;