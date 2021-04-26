import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Container,
  CardText,
  Row,
  Col,
} from "reactstrap";


// core components

function SectionTeaTypes() {
  return (
    <>
      <div
        className="section section-dark text-center"
        // style={{
        //    backgroundImage: "url(" + require("assets/img/login.jpg") + ")",
        // }}
      >
        <Container>
        <h2 className="title">Types of tea</h2>
            <Row className="text-center" md="6">
              <Col md="4">
              {/* <Card className="card-register ml-auto mr-auto"
                style = {{
                    backgroundImage: "url(" + require("assets/img/whiteTea.jpg") + ")",
                    color: 'Black'
                }}>
                    <h1>White tea</h1>
                    <h3>Wilted and unoxidized</h3>
                    <CardText>Wilted and unoxidized</CardText>
                    <Button href="/#" color="primary">Go somewhere</Button>
            
                </Card> */}
                <Card style={{width: '20rem'}}>
                  <CardImg top src="https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/white-tea-in-cup-1296x728.jpg?w=1155&h=1528" alt="..." />
                  <CardBody>
                    <CardTitle><h2>White tea</h2></CardTitle>
                    <CardText>Wilted and unoxidized</CardText>
                  </CardBody>
                </Card>
              </Col>

                {/* <Card className="card-register ml-auto mr-auto"
                style = {{
                    backgroundImage: "url(" + require("assets/img/yellowTea.png") + ")",
                    color: 'Black'
                }}>
                    <h1>Yellow tea</h1>
                    <h3>Unwilted and unoxidized but allowed to yellow</h3>
                    <CardText>Unwilted and unoxidized but allowed to yellow</CardText>
                    <Button href="/#" color="primary">Go somewhere</Button>
            
                </Card> */}
              <Col md="4">
                <Card style={{width: '20rem'}}>
                  <CardImg top src="https://blog.piquetea.com/wp-content/uploads/2020/03/Yellow-Tea-Your-Guide-to-This-Rare-Variety-Main.png" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Yellow tea</h2></CardTitle>
                    <CardText>Unwilted and unoxidized but allowed to yellow</CardText>
                  </CardBody>
                </Card>
              </Col>
                {/* <Card className="card-register ml-auto mr-auto"
                style = {{
                    backgroundImage: "url(" + require("assets/img/greenTea.jpg") + ")",
                    color: 'Black'
                }}>
                    <h1>Green tea</h1>
                    <h3>Unwilted and unoxidized</h3>
                    <CardText>Unwilted and unoxidized</CardText>
                    <Button href="/#" color="primary">Go somewhere</Button>
            
                </Card> */}
              <Col md="4">
                <Card style={{width: '20rem'}}>
                  <CardImg top src="https://images-prod.healthline.com/hlcmsresource/images/AN_images/matcha-green-tea-1296x728-feature.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Green tea</h2></CardTitle>
                    <CardText>Unwilted and unoxidized</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row className="text-center" md="6">
              <Col md="4">
              {/* <Card className="card-register ml-auto mr-auto"
                style = {{
                    backgroundImage: "url(" + require("assets/img/oolongTea.jpg") + ")",
                    color: 'Black'
                }}>
                    <h1>Oolong tea</h1>
                    <h3>Wilted, bruised, and partially oxidized</h3>
                    <CardText>Wilted, bruised, and partially oxidized</CardText>
                    <Button href="/#" color="primary">Go somewhere</Button>
            
                </Card> */}

                <Card style={{width: '20rem'}}>
                  <CardImg top src="https://cdn11.bigcommerce.com/s-3apqubyis6/images/stencil/1024x1024/products/136/524/GTT__53619.1570762248.jpg?c=2" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Oolong tea</h2></CardTitle>
                    <CardText>Wilted, bruised, and partially oxidized</CardText>
                  </CardBody>
                </Card>
              </Col>

                {/* <Card className="card-register ml-auto mr-auto"
                style = {{
                    backgroundImage: "url(" + require("assets/img/blackTea.jpg") + ")",
                    color: 'Black'
                }}>
                    <h1>Black tea</h1>
                    <h3>Wilted, sometimes crushed, and fully oxidized</h3>
                    <CardText>Wilted, sometimes crushed, and fully oxidized</CardText>
                    <Button href="/#" color="primary">Go somewhere</Button>
            
                </Card> */}
              <Col md="4">
                <Card style={{width: '20rem'}}>
                  <CardImg top src="https://cdn-prod.medicalnewstoday.com/content/images/articles/319/319646/black-tea.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Black tea</h2></CardTitle>
                    <CardText>Wilted, sometimes crushed, and fully oxidized</CardText>
                  </CardBody>
                </Card>
              </Col>

                {/* <Card className="card-register ml-auto mr-auto"
                style = {{
                    backgroundImage: "url(" + require("assets/img/postFermentedTea.jpg") + ")",
                    color: 'Black'
                }}>
                    <h1>Post-fermented or Dark tea</h1>
                    <CardText>Green tea that has been allowed to ferment/compost</CardText>
                    <Button href="/#" color="primary">Go somewhere</Button>
            
                </Card> */}
              <Col md="4">
                <Card style={{width: '20rem' }}>
                  <CardImg top src="https://www.chineseteainfo.com/wp-content/uploads/2019/08/what-is-chinese-dark-tea.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Dark tea</h2></CardTitle>
                    <CardText>Green tea that has been allowed to ferment/compost</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>

              
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

export default SectionTeaTypes;