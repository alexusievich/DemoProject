import './App.css';
import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {Switch, Route} from 'react-router-dom';

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Phones from "./components/Phones";
import MainPage from "./components/MainPage";
import PhoneDetails from "./components/PhoneDetails";
import NotFoundPage from './components/NotFoundPage';

const {Header, Footer, Content} = Layout;


function App() {
    return (

            <Layout className="mainLayout">
                <Header>
                    <AppHeader/>
                </Header>
                <Content>
                    <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/phones" component={Phones}/>
                    <Route exact path="/phones/:id" component={PhoneDetails} />
                    <Route component={NotFoundPage} />
                    </Switch>
                </Content>
                <Footer>
                    <AppFooter/>
                </Footer>
            </Layout>

    );
}

export default App;
