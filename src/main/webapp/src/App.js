import './App.css';
import React from 'react';
import 'antd/dist/antd.css';
import banner from './images/banner.jpg';

import AppHeader from "./сomponents/AppHeader";
import AppFooter from "./сomponents/AppFooter";

import { Layout } from 'antd';
const { Header , Footer, Content} = Layout;


function App() {
  return (
      <Layout className="mainLayout">
          <Header>
              <AppHeader />
          </Header>
          <Content>
              <img src={banner}  alt={"main banner"} width={"100%"} />
          </Content>
          <Footer>
              <AppFooter />
          </Footer>
      </Layout>
  );
}

export default App;
