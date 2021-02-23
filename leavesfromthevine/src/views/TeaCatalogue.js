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
import { Container, Table, Button, FormGroup, Input, Modal } from 'reactstrap';
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import teas from "../dummy data/tea.json";

function TeaModal() {
    const [liveDemo, setLiveDemo] = React.useState(false);
    return(
        <>
            <Button color="primary" type="button" onClick={() => setLiveDemo(true)}>
                Launch demo modal
            </Button>
            <Modal isOpen={liveDemo} toggle={() => setLiveDemo(false)}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLiveLabel">
                        Modal title
                    </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setLiveDemo(false)}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Woohoo, you're reading this text in a modal!</p>
                </div>
                <div className="modal-footer">
                    <div className="left-side">
                        <Button
                            className="btn-link"
                            color="default"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => setLiveDemo(false)}
                        >
                            Never mind
                        </Button>
                    </div>
                    <div className="divider" />
                    <div className="right-side">
                        <Button
                            className="btn-link"
                            color="danger"
                            type="button"
                            onClick={() => setLiveDemo(false)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

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
                        <th>View More</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teas.single_tea.map((properties, index)=> <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{properties.type}</td>
                            <td>{properties.name}</td>
                            <td>{properties.description}</td>
                            <td><TeaModal /></td>
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
