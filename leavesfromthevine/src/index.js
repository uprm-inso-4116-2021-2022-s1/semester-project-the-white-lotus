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
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
// pages
import Home from "views/Home.js";
import NucleoIcons from "views/NucleoIcons.js";
import InfoPage from "views/examples/InfoPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import SurveyPage from "views/examples/SurveyPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import RecipeCatalogue from "./views/RecipeCatalogues/RecipeCatalogue";
import TeaCatalogue from "./views/TeaCatalogues/TeaCatalogue";
import ForumPage from "./views/ForumPage";
import FunFacts from "./views/FunFacts";
import SurveyResult from "./views/SurveyResult";
import GreenCatalogue from "./views/TeaCatalogues/TeaCatalogueG";
import YellowCatalogue from "./views/TeaCatalogues/TeaCatalogueY";
import WhiteCatalogue from "./views/TeaCatalogues/TeaCatalogueW";
import BlackCatalogue from "./views/TeaCatalogues/TeaCatalogueB";
import OolongCatalogue from "./views/TeaCatalogues/TeaCatalogueO";
import HerbalCatalogue from "./views/TeaCatalogues/TeaCatalogueH";
import EasyRecipe from "./views/RecipeCatalogues/RecipeCatalogueE";
import MediumRecipe from "./views/RecipeCatalogues/RecipeCatalogueM";
import HardRecipe from "./views/RecipeCatalogues/RecipeCatalogueH";
// others

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/home" render={(props) => <Home {...props} />}/>
            <Route
                path="/nucleo-icons"
                render={(props) => <NucleoIcons {...props} />}
            />
            <Route
                path="/info-page"
                render={(props) => <InfoPage {...props} />}
            />
            <Route
                path="/profile-page"
                render={(props) => <ProfilePage {...props} />}
            />
            <Route
                path="/register-page"
                render={(props) => <RegisterPage {...props} />}
            />
            <Route
                path="/recipe-catalogue"
                render={(props) => <RecipeCatalogue {...props} />}
            />
            <Route
                path="/survey-page"
                render={(props) => <SurveyPage {...props} />}
            />
            <Route
                path="/tea-catalogue"
                render={(props) => <TeaCatalogue {...props} />}
            />
            <Route
                path="/forum-page"
                render={(props) => <ForumPage {...props} />}
            />
            <Route
                path="/fun-facts"
                render={(props) => <FunFacts {...props} />}
            />
            <Route
                path="/green-tea-catalogue"
                render={(props) => <GreenCatalogue {...props} />}
            />
            <Route
                path="/yellow-tea-catalogue"
                render={(props) => <YellowCatalogue {...props} />}
            />
            <Route
                path="/white-tea-catalogue"
                render={(props) => <WhiteCatalogue {...props} />}
            />
            <Route
                path="/black-tea-catalogue"
                render={(props) => <BlackCatalogue {...props} />}
            />
            <Route
                path="/oolong-tea-catalogue"
                render={(props) => <OolongCatalogue {...props} />}
            />
            <Route
                path="/herbal-tea-catalogue"
                render={(props) => <HerbalCatalogue {...props} />}
            />
            <Route
                path="/e-recipe-catalogue"
                render={(props) => <EasyRecipe {...props} />}
            />
            <Route
                path="/m-recipe-catalogue"
                render={(props) => <MediumRecipe {...props} />}
            />
            <Route
                path="/h-recipe-catalogue"
                render={(props) => <HardRecipe {...props} />}
            />
            <Route
                path="/survey-result"
                render={(props) => <SurveyResult {...props} />}
            />
            <Redirect to="/home"/>

        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
