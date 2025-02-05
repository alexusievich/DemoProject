import './App.css';
import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Layout, message, notification} from 'antd';
import {Switch, Route} from 'react-router-dom';
import {CheckCircleOutlined, LogoutOutlined, LoginOutlined} from '@ant-design/icons'
import AppHeader from "./components/header/AppHeader";
import AppFooter from "./components/footer/AppFooter";
import Products from "./components/product/Products";
import MainPage from "./components/main-page/MainPage";
import ProductDetails from "./components/product/product-details/ProductDetails";
import NotFoundPage from './components/not-found/NotFoundPage';
import Basket from './components/basket/Basket';
import AuthorizationSuccess from "./components/registration/success/AuthorizationSuccess";
import {Redirect} from "react-router";
import axios from "axios";
import LoginForm from "./components/login-form/LoginForm";
import RegistrationForm from "./components/registration/form/RegistrationForm";
import UserProfile from "./components/user-profile/UserProfile";

const {Header, Footer, Content} = Layout;

const App = () => {

    const [basket, setBasket] = useState();
    const [user, setUser] = useState();

    const getBasketAndUserInfo = async () => {
        try {
            const basketResponse = await axios.get('/api/basket');
            setBasket(basketResponse.data)
            const userResponse = await axios.get("/api/userinfo");
            setUser(userResponse.data);
        } catch (error) {
            console.error('Error while fetching user or basket data');
        }
    }

    useEffect(() => {
        getBasketAndUserInfo();
    }, []);

    const addToCart = async (id, name) => {
        try {
            const response = await axios.post("/api/basket", {id: id});
            this.setState(response.data);
            notification.open({
                top: 70,
                message: `The ${name} successfully added to cart!`,
                duration: 1.5,
                icon: <CheckCircleOutlined style={{color: '#108ee9', fontSize: 30}}/>,
            });
        } catch (error) {
            console.error('Error while adding to cart')
        }
    }

    const clearBasket = async () => {
        try {
           await axios.delete("/api/basket/clear");
           setBasket(null);
        } catch (error) {
            console.error('Error while clearing the basket');
        }
    }

    const removeItem = async (id) => {
        try {
            await axios.delete(`/api/basket/removeitem/${id}`);
            const response = await axios.get('/api/basket');
            setBasket(response.data);
        } catch (error) {
            console.error('Error while removing item from the basket');
        }
    }

    const logOut = async () => {
        try {
            await axios.post("/api/auth/logout");
            notification.open({
                top: 70,
                message: `${this.state.user.username}, you have successfully logged out of your account!`,
                duration: 2.5,
                icon: <LogoutOutlined style={{color: '#108ee9', fontSize: 30}}/>,
            });
            setUser(null);
            setBasket(null);
        } catch (error) {
            console.error('Error while logging out');
        }
    }

    const submitForm = async (username, password) => {
        try {
            const response = await axios.post("/api/auth/login", {username: username, password: password});
            setUser(response.data);
            notification.open({
                top: 70,
                message: `${this.state.user.username}, you have successfully logged in to your account!`,
                duration: 2.5,
                icon: <LoginOutlined style={{color: '#108ee9', fontSize: 30}}/>,
            });
            await getBasketAndUserInfo();
        } catch (error) {
            message.error("Invalid username or password!");
        }
    }

    return (
        <Layout className="mainLayout">
            <Header>
                <AppHeader numberItems={basket ? basket.items.length : 0}
                           currentUser={user?.username} logOut={logOut}/>
            </Header>
            <Content>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/products/:category" render={(props) =>
                        (<Products {...props} addToCart={addToCart}/>)}/>
                    <Route exact path="/productdetails/:id" render={(props) =>
                        (<ProductDetails {...props} addToCart={addToCart}/>)}/>
                    <Route exact path="/404" component={NotFoundPage}/>
                    <Route exact path="/basket" render={(props) =>
                        (<Basket {...props} basket={basket}
                                 clearBasket={clearBasket} removeItem={removeItem}/>)}/>
                    <Route exact path="/login" render={(props) =>
                        (<LoginForm {...props} submitForm={submitForm}/>)}/>
                    <Route exact path="/register" component={RegistrationForm}/>
                    <Route exact path="/success" component={AuthorizationSuccess}/>
                    <Route exact path="/info" render={(props) =>
                        (<UserProfile {...props} user={user}/>)}/>
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

export default App;
