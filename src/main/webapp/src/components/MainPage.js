import mainBanner from "../images/banner.jpg";
import React from "react";
import '../styles/Main&RecentPages.css'
import RecentProducts from "./RecentProducts";

class MainPage extends React.Component {

    render() {

        return (
            <div>
                <img src={mainBanner} alt="main banner" className="banner"/>
                <RecentProducts />
            </div>

        )
    }
}

export default MainPage