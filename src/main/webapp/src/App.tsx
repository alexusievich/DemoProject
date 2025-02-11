import './App.css';
import React, {useEffect, useState, FC} from 'react';
import 'antd/dist/antd.css';
import {Layout, message, notification} from 'antd';
import {CheckCircleOutlined, LogoutOutlined, LoginOutlined} from '@ant-design/icons'
import AppHeader from "./components/header/AppHeader";
import AppFooter from "./components/footer/AppFooter";
import Products from "./components/product/Products";
import MainPage from "./components/main-page/MainPage";
import ProductDetails from "./components/product/product-details/ProductDetails";
import NotFoundPage from './components/not-found/NotFoundPage';
import Basket from './components/basket/Basket';
import RegistrationSuccess from "./components/registration/success/RegistrationSuccess";
import axios from "axios";
import LoginForm from "./components/login-form/LoginForm";
import RegistrationForm from "./components/registration/form/RegistrationForm";
import UserProfile from "./components/user-profile/UserProfile";
import {Route, Routes, Navigate} from 'react-router-dom';
import {AppRoutes} from './models/routes/routes.enum';

const {Header, Footer, Content} = Layout;

const App: FC = () => {

    const [basket, setBasket] = useState(null);
    const [user, setUser] = useState(null);

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

    const addToCart = async (id: any, name: any) => {
        try {
            const response = await axios.post("/api/basket", {id: id});
            setBasket(response.data);
            notification.open({
                placement: 'topRight',
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

    const removeItem = async (id: any) => {
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
                placement: 'topRight',
                //@ts-ignore
                message: `${user?.username}, you have successfully logged out of your account!`,
                duration: 2.5,
                icon: <LogoutOutlined style={{color: '#108ee9', fontSize: 30}}/>,
            });
            setUser(null);
            setBasket(null);
        } catch (error) {
            console.error('Error while logging out');
        }
    }

    const submitForm = async (username: any, password: any) => {
        try {
            const response = await axios.post("/api/auth/login", {username: username, password: password});
            setUser(response.data);
            notification.open({
                placement: 'topRight',
                //@ts-ignore
                message: `${user?.username}, you have successfully logged in to your account!`,
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
                {/*@ts-ignore*/}
                <AppHeader numberItems={basket ? basket.items.length : 0}
                    //@ts-ignore
                           currentUser={user?.username} logOut={logOut}/>
            </Header>
            <Content>
                <Routes>
                    <Route path={AppRoutes.BaseUrl} element={<MainPage/>}/>
                    <Route path={AppRoutes.Products} element={<Products addToCart={addToCart}/>}/>
                    <Route path={AppRoutes.ProductDetails} element={<ProductDetails addToCart={addToCart}/>}/>
                    <Route path={AppRoutes.Basket} element={<Basket basket={basket}
                                                                    clearBasket={clearBasket} removeItem={removeItem}/>}/>
                    <Route path={AppRoutes.Login} element = {<LoginForm currentUser={user} submitForm={submitForm}/>}/>
                    <Route path={AppRoutes.Registration} element={<RegistrationForm/>}/>
                    <Route path={AppRoutes.RegistrationSuccess} element={<RegistrationSuccess/>}/>
                    <Route path={AppRoutes.UserInfo} element={<UserProfile user={user}/>}/>
                    <Route path={AppRoutes.NotFound} element={<NotFoundPage/>}/>
                    <Route path="*" element={<Navigate to={AppRoutes.NotFound} replace/>}/>
                </Routes>
            </Content>
            <Footer>
                <AppFooter/>
            </Footer>
        </Layout>
    );
}

export default App;
