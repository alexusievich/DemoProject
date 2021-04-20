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
import Basket from './components/Basket';

import {Redirect} from "react-router";
import axios from "axios";

const {Header, Footer, Content} = Layout;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basket: null,
            numberItems: 0,
        }
    }

    componentDidMount() {
        axios.get('/api/basket').then(response => {
            const basket = response.data;
            this.setState({basket});
            this.setState({numberItems: basket.numberItems});
        })
    };


    render() {

        return (
            <Layout className="mainLayout">
                <Header>
                    <AppHeader numberItems={this.state.numberItems}/>
                </Header>
                <Content>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route exact path="/phones" component={Phones}/>
                        <Route exact path="/phones/:id" component={PhoneDetails}/>
                        <Route exact path="/404" component={NotFoundPage}/>
                        <Route exact path="/basket" component={Basket}/>
                        <Route>
                            <Redirect to="/404"/>
                        </Route>
                    </Switch>
                </Content>
                <Footer>
                    <AppFooter/>
                </Footer>
            </Layout>

        );
    }


}

export default App;
