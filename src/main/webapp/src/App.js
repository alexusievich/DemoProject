import './App.css';
import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';

import {Switch, Route, Redirect} from 'react-router-dom';

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Phones from "./components/Phones";
import MainPage from "./components/MainPage";

const {Header, Footer, Content} = Layout;


function App() {
    return (
        <Switch>
            <Layout className="mainLayout">
                <Header>
                    <AppHeader/>
                </Header>
                <Content>
                    <Redirect from="/" to="/main"/>
                    <Route path="/main">
                        <MainPage/>
                    </Route>
                    <Route path="/phones/">
                        <Phones/>
                    </Route>
                </Content>
                <Footer>
                    <AppFooter/>
                </Footer>
            </Layout>
        </Switch>
    );
}

export default App;
