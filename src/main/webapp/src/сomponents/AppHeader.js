import React from 'react';
import {Menu} from "antd";
import {MenuOutlined, ShoppingCartOutlined, UserOutlined, MobileOutlined} from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import logo from '../images/logo.png';
import '../App.css';

function AppHeader() {
    return (
        <div className="header">
            <Menu mode="horizontal" triggerSubMenuAction={"click"}>
                <Menu.Item key="icon" style={{float:'left'}}>
                    <a href={"#####"}>
                    <img src={logo}/>
                    </a>
                </Menu.Item>
                <SubMenu key="catalog" icon={<MenuOutlined />} title="Catalog"
                style={{float: 'left', fontSize: '120%'}}>
                    <Menu.Item key="apple"><a href="#">Apple</a></Menu.Item>
                    <Menu.Item key="android"><a href="##">Android</a></Menu.Item>
                    <Menu.Item key="audio"><a href="###">Audio</a></Menu.Item>
                    <Menu.Item key="accessories"><a href="####">Accessories</a></Menu.Item>
                </SubMenu>
                    <Menu.Item key="cart" style={{float:'right'}}><a href="##">
                        <ShoppingCartOutlined style={{ fontSize: '120%'}}/></a></Menu.Item>
                    <Menu.Item key="user" style={{float:'right'}}><a href="#">
                        <UserOutlined style={{ fontSize: '120%'}}/></a></Menu.Item>
            </Menu>
        </div>
    )
}

export default AppHeader;



