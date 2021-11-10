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
  Col, CardImg, CardText,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import IndexNavbar from "../../components/Navbars/IndexNavbar";

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
      <IndexNavbar />
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
              <Col md="4" >
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a>
                      <img
                          alt="..."
                          src="https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/white-tea-in-cup-1296x728.jpg?w=1155&h=1528"
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">White</CardTitle>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Wilted and unoxidized
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
                          src="https://blog.piquetea.com/wp-content/uploads/2020/03/Yellow-Tea-Your-Guide-to-This-Rare-Variety-Main.png" alt="..."
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Yellow</CardTitle>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Unwilted and unoxidized, but allowed to yellow
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
                          src="https://images-prod.healthline.com/hlcmsresource/images/AN_images/matcha-green-tea-1296x728-feature.jpg"
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Green</CardTitle>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Unwilted and unoxidized
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
                          src="https://cdn11.bigcommerce.com/s-3apqubyis6/images/stencil/1024x1024/products/136/524/GTT__53619.1570762248.jpg?c=2"
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Oolong</CardTitle>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Wilted, bruised, and partially oxidized
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
                          src="https://cdn-prod.medicalnewstoday.com/content/images/articles/319/319646/black-tea.jpg"
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Black</CardTitle>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Wilted, sometimes crushed, and fully oxidized
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
                          src="https://www.chineseteainfo.com/wp-content/uploads/2019/08/what-is-chinese-dark-tea.jpg"
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Dark</CardTitle>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Green tea that has been allowed to ferment/compost
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
                  Consuming tea has proven medical benefits and many studies have found that some teas may
                  help with cancer, heart disease, and diabetes. In addition, it encourages weight loss, lowers cholesterol,
                  improves digestion, enhances the immune system, and bring about mental alertness. Some of these benefits
                  are explained below.
                </h5>
                <br />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-success">
                    <i className="nc-icon nc-time-alarm" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Energy</h4>
                    <p className="description">
                      Tea contains a moderate amount of caffeine, which can give you the energy you need
                      when you’re feeling sluggish. People often experience the effects of caffeinated
                      tea differently, reporting a more  sustained energizing effect,
                      rather than the high and crash often associated with
                      energy-boosting beverages. This is partly due to a unique compound present in tea
                      called l-theanine, which promotes calm, relaxation, and focus.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-success">
                    <i className="nc-icon nc-user-run" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Weight Loss</h4>
                    <p>
                      Some studies have even found that tea may enhance weight loss and help fight belly fat.
                      Teas have a type of flavonoid called catechins that may boost metabolism and help your
                      body break down fats more quickly.Once you've lost weight, tea could help you keep it off
                      by preventing the metabolism slowdown that's common after dropping a few pounds.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-success">
                    <i className="nc-icon nc-satisfied" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Digestion and Immune Health</h4>
                    <p>
                      Tea has been used across centuries and cultures
                      as the ultimate natural way to aid digestion and improve your gut health.
                      Certain teas support regular bowel movements, while others support a healthy
                      immune system to help your body eliminate gunk that could upset your stomach.
                      It could be your best option for natural relief of your most troublesome digestive symptoms.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-success">
                    <i className="nc-icon nc-favourite-28" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Heart Health</h4>
                    <p>
                      The latest study on tea suggests at least a cup a day
                      may help your body cling to heart-helping “good cholesterol” as you age.
                      Previous research has suggested more tea may significantly lower the risk
                      of heart disease and stroke by reducing low-density lipoprotein, or LDL,
                      the “bad” cholesterol that can build up in arteries. Tea appears to slow
                      the natural decrease in HDL that occurs during aging, according
                      to a study published in the Journal of the American Heart Association.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section section-success text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Herbal tea: A special case of tea</h2>
                <h5 className="description text-dark">
                  With the definition of tea being a process that includes camellia leaf as one of its main ingredients,
                  herbal tea does not follow this definition, as it is made from dried herbs, spices, flowers, fruits, seeds, roots
                  or leaves of other plants. This kind of beverage is best described as an infusion of ingredients. However, this
                  beverage is still referred to as tea by many people, so even though it is not considered a real type of tea
                  by definition it is often included in tea lists by convention.
                </h5>
                <br />
              </Col>
            </Row>
            <br />
          </Container>
        </div>
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Market</h2>
                <h5 className="description">
                  Tea has been very popular in the emerging market, owing to prevalence of tea culture.
                  Furthermore, growth in health awareness and increase in the disposable income has aided
                  the tea market growth. Currently, tea is the most popular manufactured drink
                  and the second most consumed beverage, second only to water. The market size value in
                  2020 for the tea industry was 14.02 billion of dollars and is expected to grow 5.5% from
                  2019 to 2025. China is one of the prominent regions in the market that accounted for a
                  sizeable share of the total market in 2019.
                </h5>
                <br />
              </Col>
            </Row>
            <br />
          </Container>
        </div>
        <div className="section section-dark text-center">
          <Container>
            <h2 className="title">Teaware</h2>
            <h5 className="description">
              There is a wide variety of methods to prepare tea and it varies according to culture, convenience or simply personal preference.
             Therefore, different equipment is needed. Teaware is basically the name used to describe all the non-edible materials used
              in the preparation and consumption of tea. Here is a list of the most commonly used ones.
            </h5>
            <br/>
            <Row className="text-center" md="6">
              <Col md="4">
                <Card style={{width: '20rem'}}>
                  <CardImg top src="https://mymodernmet.com/wp/wp-content/uploads/2019/04/unique-teapots-7.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Teapot</h2></CardTitle>
                    <CardText>Used to steep tea leaves in hot water</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card style={{width: '20rem'}}>
                  <CardImg top src="https://getteakettle.com/wp-content/uploads/2017/06/Electric-Tea-Kettle-Featured.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Tea Kettle</h2></CardTitle>
                    <CardText>Used to boil water</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card style={{width: '20rem'}}>
                  <CardImg top src="https://c1.wallpaperflare.com/preview/119/370/398/tea-cup-vintage-tea-cup-tea-coffee.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Teacup</h2></CardTitle>
                    <CardText>Vessels from which to drink the hot tea, after the leaves have been strained.</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row className="text-center" md="6">
              <Col md="4">
                <Card style={{width: '20rem'}}>
                  <CardImg top src="https://assets.bonappetit.com/photos/5e5e9eb7ac090900090fd874/3:2/w_3473,h_2315,c_limit/HLI-Tea-Strainer-6x9.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Tea strainer</h2></CardTitle>
                    <CardText>Used to extract leaves from tea solutions</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card style={{width: '20rem'}}>
                  <CardImg top src="https://www.letsdrinktea.com/wp-content/uploads/2019/09/Silver-tea-infusers.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Tea ball</h2></CardTitle>
                    <CardText>Used to hold tea leaves in water for removal after steeping</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card style={{width: '20rem' }}>
                  <CardImg top src="https://scitechdaily.com/images/Plastic-Mesh-Tea-Bag.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Tea bag</h2></CardTitle>
                    <CardText>Can be used similarly to the tea ball.</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card style={{width: '20rem' }}>
                  <CardImg top src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/SilverTeaCaddy.jpg/440px-SilverTeaCaddy.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Tea caddy</h2></CardTitle>
                    <CardText>Used to store and preserve the aroma and flavor of your favorite tea.</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card style={{width: '20rem' }}>
                  <CardImg top src="https://i.pinimg.com/originals/c3/98/ce/c398ce22a7b72ed7b699addb7b2f552c.jpg" alt="..." />
                  <CardBody>
                    <CardTitle><h2>Tea cozy</h2></CardTitle>
                    <CardText>A knitted cover for keeping a teapot hot after the tea is made.</CardText>
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

export default InfoPage;
