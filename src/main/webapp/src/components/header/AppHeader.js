import React from 'react';
import {Badge, Menu, Avatar} from "antd";
import {MenuOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import logo from '../../assets/images/logo.png';
import {Link} from 'react-router-dom';
import '../../App.css';

const AppHeader = (props) => {

    return (
        <div className="header">
            <Menu mode="horizontal" triggerSubMenuAction="click">
                <Menu.Item key="icon" style={{float: 'left'}}>
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                </Menu.Item>
                <SubMenu key="catalog" icon={<MenuOutlined/>} title="Catalog"
                         style={{float: 'left', fontSize: '120%'}}>
                    <Menu.Item key="phones"><Link to={"/products/phones"}>Phones</Link></Menu.Item>
                    <Menu.Item key="tablets"><Link to={"/products/tablets"}>Tablets</Link></Menu.Item>
                    <Menu.Item key="accessories"><Link to={"/products/accessories"}>Accessories</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="cart" style={{float: 'right'}}>
                    <Link to="/basket">
                        <Badge count={props.numberItems} offset={[0, 25]}>
                            <ShoppingCartOutlined className="cartLink" style={{fontSize: '120%'}}/>
                        </Badge>
                    </Link>
                </Menu.Item>
                <SubMenu key="user"
                         icon={props.currentUser && <Avatar style={{backgroundColor: '#1890ff'}} size={40}>
                             {props.currentUser}</Avatar>}
                         title={!props.currentUser && " Account"}
                         style={{float: 'right', fontSize: '120%'}}>
                    {!props.currentUser && <Menu.Item key="sign">
                        <Link to={"/login"}>Sign in</Link></Menu.Item>}
                    {props.currentUser && <Menu.Item key="email"><Link to={"/info/"}>Profile</Link></Menu.Item>}
                    {props.currentUser && <Menu.Item key="logout" onClick={props.logOut}>Log Out</Menu.Item>}
                    {props.currentUser && <Menu.Item key="register">
                        <Link to={"/register"}>Create Account</Link></Menu.Item>}
                </SubMenu>
            </Menu>
        </div>
    )
}

export default AppHeader;



