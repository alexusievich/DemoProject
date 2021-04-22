import './App.css';
import React from 'react';
import 'antd/dist/antd.css';
import {Layout, notification} from 'antd';
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
        }
    }



    componentDidMount() {
        axios.get('/api/basket').then(response => {
            const basket = response.data;
            this.setState({basket});
        })
    };

    addToCart = (id, name) => {
        axios.post("/api/basket", {id: id}).then(response => {
                const basket = response.data;
                this.setState({basket});
                notification.open({
                    message: `The ${name} successfully added to cart!`,
                    duration: 1.5,
                });
            }
        );
    }

    setBasket = (basket) => {
        this.setState({basket});
    }

    render() {

        return (
            <Layout className="mainLayout">
                <Header>
                    <AppHeader numberItems={this.state.basket ? this.state.basket.items.length : 0}/>
                </Header>
                <Content>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route exact path="/phones" render={(props) =>
                            (<Phones {...props} addToCart={this.addToCart}/>)}/>
                        <Route exact path="/phones/:id" render={(props) =>
                            (<PhoneDetails {...props} addToCart={this.addToCart}/>)}/>
                        <Route exact path="/404" component={NotFoundPage}/>
                        <Route exact path="/basket" render={(props) =>
                            (<Basket {...props} basket={this.state.basket} setBasket={this.setBasket}/>)}/>
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
