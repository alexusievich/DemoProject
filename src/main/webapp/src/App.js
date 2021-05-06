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
import UserProfile from "./components/UserProfile";
import Cookie from "./components/Cookie";

const {Header, Footer, Content} = Layout;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basket: null,
            currentUser: null,
            user: null,
        }
    }

    componentDidMount() {
        const userId = this.getUserId();
        userId !== ''?
            axios.get('/api/public/basket', {params: {userId: userId}}).then(response => {
                const basket = response.data;
                this.setState({basket});
                console.log("YEs");
            })
            :
            axios.get('/api/public/basket/unregistered').then(response => {
                const basket = response.data;
                this.setState({basket});
                console.log("No");
            })
        let user = "";
        user = Cookie.getCookie("user");
        if (user !== "") {
            this.setState({currentUser: JSON.parse(user)})
        }
        axios.get("/api/userinfo/" + userId).then(response => {
                const user = response.data;
                this.setState({user});
            }
        )
    };

    getBasket = (response, name) => {
        const basket = response.data;
        this.setState({basket});
        notification.open({
            top: 70,
            message: `The ${name} successfully added to cart!`,
            duration: 1.5,
            icon: <CheckCircleOutlined style={{color: '#108ee9', fontSize: 30}}/>,
        });
    }


    addToCart = (id, name) => {
        const userId = this.getUserId();
        userId ?
            axios.post("/api/public/basket", {id: id, userId: userId}).then(
                response => {
                    this.getBasket(response, name);
                }
            )
            :
            axios.post("/api/public/basket/unregistered", {id: id})
                .then(response => {
                        this.getBasket(response, name);
                    }
                );
    }

    clearBasket = () => {
        axios.delete("/api/public/basket/clear").then(response => {
            this.setState({basket: null});
        });
    }

    removeItem = (id) => {
        const userId = this.getUserId();
        axios.delete(`/api/public/basket/removeitem/${id}`).then(response => {
                userId ?
                    axios.get('/api/public/basket', {params: {userId: userId}}).then(response => {
                        const basket = response.data;
                        this.setState({basket});
                    })
                    :
                    axios.get('/api/public/basket/unregistered').then(response => {
                        const basket = response.data;
                        this.setState({basket});
                    })
            }
        );
    }

    logOut = () => {
        axios.post("/api/public/auth/logout").then(response => {
            notification.open({
                top: 70,
                message: `${this.state.currentUser.username}, you have successfully logged out of your account!`,
                duration: 2.5,
                icon: <LogoutOutlined style={{color: '#108ee9', fontSize: 30}}/>,
            })
            this.setState({user: null});
            this.setState({currentUser: null});
            Cookie.deleteCookie("user");
        });
        axios.delete("/api/public/basket/logout").then(response => {
                this.setState({basket: null});
            }
        );
    }

    submitForm = (username, password) => {
        axios.post("/api/public/auth/login", {username: username, password: password}).then(response => {
            this.setState({currentUser: response.data});
            if (this.state.currentUser) {
                Cookie.setCookie("user", JSON.stringify(this.state.currentUser));
            }
            notification.open({
                top: 70,
                message: `${this.state.currentUser.username}, you have successfully logged in to your account!`,
                duration: 2.5,
                icon: <LoginOutlined style={{color: '#108ee9', fontSize: 30}}/>,
            });
            const userId = this.getUserId();
            axios.get('/api/public/basket', {params: {userId: userId}}).then(response => {
                const basket = response.data;
                this.setState({basket});
            })
            axios.get("/api/userinfo/" + userId).then(response => {
                    const user = response.data;
                    this.setState({user});
                }
            )
        }).catch(error => {
            message.error("Invalid username or password!");
        })
    }

    getUserId = () => {
        let userId = '';
        if (Cookie.getCookie("user") !== '') {userId = JSON.parse(Cookie.getCookie("user")).id;}
        return userId;
    }

    render() {

        return (
            <Layout className="mainLayout">
                <Header>
                    <AppHeader numberItems={this.state.basket ? this.state.basket.items.length : 0}
                               currentUser={this.state.currentUser?.username} logOut={this.logOut}/>
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
                        <Route exact path="/register" component={RegistrationForm}/>
                        <Route exact path="/success" component={AuthorizationSuccess}/>
                        <Route exact path="/info" render={(props) =>
                            (<UserProfile {...props} user={this.state.user}/> )}/>
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
