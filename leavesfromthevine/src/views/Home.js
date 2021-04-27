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

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

// index sections
import SectionButtons from "views/index-sections/SectionButtons.js";
import SectionNavbars from "views/index-sections/SectionNavbars.js";
import SectionNavigation from "views/index-sections/SectionNavigation.js";
import SectionProgress from "views/index-sections/SectionProgress.js";
import SectionNotifications from "views/index-sections/SectionNotifications.js";
import SectionTypography from "views/index-sections/SectionTypography.js";
import SectionJavaScript from "views/index-sections/SectionJavaScript.js";
import SectionCarousel from "views/index-sections/SectionCarousel.js";
import SectionNucleoIcons from "views/index-sections/SectionNucleoIcons.js";
import SectionDark from "views/index-sections/SectionDark.js";
import SectionLogin from "views/index-sections/SectionLogin.js";
import SectionExamples from "views/index-sections/SectionExamples.js";
import SectionForumPreview from "views/index-sections/SectionForumPreview.js";
import SectionDownload from "views/index-sections/SectionDownload.js";
import SectionTeaTypes from "views/index-sections/SectionTeaTypes.js";
import SectionGoal from "views/index-sections/SectionGoal.js";
import {Col, Container, Row} from "reactstrap";

function Home() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <IndexNavbar />
      <IndexHeader />
      <div className="main">
        <SectionGoal/>
        <SectionTeaTypes/>
        <SectionCarousel/>
        {/*<SectionForumPreview />
        <SectionButtons />
        <SectionNavbars />
        <SectionNavigation />
        <SectionProgress />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavaScript />
        <SectionCarousel />
        <SectionNucleoIcons />
        <SectionDark />
        <SectionLogin />
        <SectionExamples />
        <SectionDownload />*/}
          <div className="section landing-section">
              <Container>
                  <Row>
                      <Col className="ml-auto mr-auto" md="8">
                          <h1 className="text-center"> Questions? </h1>
                          <h3 className="text-center"> Contact our team!</h3>
                          <h5 className="text-center">
                              <br/>
                              <a href="mailto:alondra.pereira@upr.com">Alondra Pereira</a>
                              <br/>
                              <a href="mailto:maria.muñoz10@upr.com">M. Alejandra Muñoz</a>
                              <br/>
                              <a href="mailto:diego.paris@upr.com">Diego París</a>
                              <br/>
                              <a href="mailto:fher.rodriguez@upr.com">Fher Rodríguez</a>
                              <br/>
                              <a href="mailto:jomar.santos@upr.com">Jomar Santos</a>
                              <br/>
                              <a href="mailto:hector.miranda8@upr.com">Héctor Miranda</a>
                          </h5>
                      </Col>
                  </Row>
              </Container>
          </div>
      </div>
    </>
  );
}

export default Home;
