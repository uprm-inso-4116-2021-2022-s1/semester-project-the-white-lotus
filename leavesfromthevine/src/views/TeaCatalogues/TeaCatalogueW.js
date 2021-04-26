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
import {Container, DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown} from 'reactstrap';
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TeaModal from "../../components/Page/TeaModal";

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
                        <h1>Tea Encyclopedia</h1>
                        <br/>
                    </div>
                </Container>
            </div>
        </>
    );
}


function TeaCatalogueW() {
    let filter =
        {
            "type": "WHITE_TEA"
        }
    let [teas, setTeas] = React.useState([])
    fetch('http://localhost:5432/getteabytype/WHITE_TEA')
        .then((response) => response.json())
        .then((tests) => setTeas(tests.teas.rows))
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("tea-catalogue");
        return function cleanup() {
            document.body.classList.remove("tea-catalogue");
        };
    });
    return (
        <>
            <ExamplesNavbar/>
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
                            Types of Tea
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="dropdownMenuLink">
                            <DropdownItem href="/tea-catalogue">
                                All Types
                            </DropdownItem>
                            <DropdownItem href="/green-tea-catalogue">
                                Green Tea
                            </DropdownItem>
                            <DropdownItem href="/yellow-tea-catalogue">
                                Yellow Tea
                            </DropdownItem>
                            <DropdownItem href="/black-tea-catalogue">
                                Black Tea
                            </DropdownItem>
                            <DropdownItem href="/white-tea-catalogue">
                                White Tea
                            </DropdownItem>
                            <DropdownItem href="/oolong-tea-catalogue">
                                Oolong Tea
                            </DropdownItem>
                            <DropdownItem href="/herbal-tea-catalogue">
                                Herbal Tea
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Container>
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
                            {teas.map((properties) => <tr>
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
        </>
    );
}

export default TeaCatalogueW;
