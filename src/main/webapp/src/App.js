import './App.css';
import React from 'react';
import 'antd/dist/antd.css';
import {Layout, message, notification} from 'antd';
import {Switch, Route} from 'react-router-dom';
import {CheckCircleOutlined, LogoutOutlined, LoginOutlined} from '@ant-design/icons'
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Products from "./components/Products";
import MainPage from "./components/MainPage";
import ProductDetails from "./components/ProductDetails";
import NotFoundPage from './components/NotFoundPage';
import Basket from './components/Basket';
import AuthorizationSuccess from "./components/AuthorizationSuccess";

import {Redirect} from "react-router";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

const {Header, Footer, Content} = Layout;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basket: null,
            currentUser: null,
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
                    top: 70,
                    message: `The ${name} successfully added to cart!`,
                    duration: 1.5,
                    icon: <CheckCircleOutlined style={{ color: '#108ee9', fontSize: 30}} />,
                });
            }
        );
    }

    clearBasket = () => {
        axios.delete("/api/basket/clear").then(response => {
            this.setState({basket: null});
        });
    }

    removeItem = (id) => {
        axios.delete(`/api/basket/removeitem/${id}`).then(response => {
                axios.get('/api/basket').then(response => {
                    const basket = response.data;
                    this.setState({basket});
                });
            }
        );
    }

    logOut = () => {
        axios.post("/api/auth/logout").then(response => {
            notification.open({
                top: 70,
                message: `${this.state.currentUser}, you have successfully logged out of your account!`,
                duration: 2.5,
                icon: <LogoutOutlined style={{ color: '#108ee9', fontSize: 30}} />,
            })
            this.setState({currentUser : null});
        });
    }

    submitForm = (username, password) => {
            axios.post("/api/auth/login", {username: username, password: password}).then(response => {
                this.setState({currentUser: response.data});
                notification.open({
                    top: 70,
                    message: `${this.state.currentUser}, you have successfully logged in to your account!`,
                    duration: 2.5,
                    icon: <LoginOutlined style={{ color: '#108ee9', fontSize: 30}} />,
                });
            }).catch(error => {
                message.error("Invalid username or password!");
            })
    }

    render() {

        return (
            <Layout className="mainLayout">
                <Header>
                    <AppHeader numberItems={this.state.basket ? this.state.basket.items.length : 0}
                    currentUser={this.state.currentUser} logOut={this.logOut}/>
                </Header>
                <Content>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route exact path="/products/:category" render={(props) =>
                            (<Products {...props} addToCart={this.addToCart}/>)}/>
                        <Route exact path="/productdetails/:id" render={(props) =>
                            (<ProductDetails {...props} addToCart={this.addToCart}/>)}/>
                        <Route exact path="/404" component={NotFoundPage}/>
                        <Route exact path="/basket" render={(props) =>
                            (<Basket {...props} basket={this.state.basket}
                            clearBasket={this.clearBasket} removeItem={this.removeItem}/>)}/>
                            <Route exact path="/login" render={(props) =>
                                (<LoginForm {...props} submitForm={this.submitForm}/>)}/>
                                <Route exact path="/register" component={RegistrationForm} />
                            <Route exact path="/success" component={AuthorizationSuccess}/>
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
