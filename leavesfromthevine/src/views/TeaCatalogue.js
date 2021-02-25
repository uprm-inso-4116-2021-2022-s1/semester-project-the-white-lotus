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
import {Container, Table } from 'reactstrap';
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import TeaModal from "../components/Page/TeaModal";

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
          <div className="filter" />
          <Container>
            <div className="motto text-center">
                <h1>Tea Encyclopedia</h1>
                <br />
            </div>
          </Container>
        </div>
      </>
  );
}


function TeaCatalogue() {
    let [teas, setTeas] = React.useState([])
    fetch('http://localhost:5432/gettea')
        .then((response) => response.json())
        .then((tests) => setTeas(tests.result.rows))
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("tea-catalogue");
        return function cleanup() {
            document.body.classList.remove("tea-catalogue");
        };
    });
  return (
      <>
        <ExamplesNavbar />
        <PageHeader />
        <div className="main">
          <div className="section text-center">
            <Container>
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {teas.map((properties)=> <tr>
                            <th scope="row">{properties.id}</th>
                            <td>{properties.type}</td>
                            <td>{properties.name}</td>
                            <td>{properties.tea_desc}</td>
                            <td><TeaModal teaname={properties.name} teaid={properties.id}/></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Container>
          </div>
        </div>
        <DemoFooter />
      </>
  );
}

export default TeaCatalogue;
