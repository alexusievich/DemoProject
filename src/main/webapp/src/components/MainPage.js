import banner from "../images/banner.jpg";
import React from "react";
import '../styles/MainPage.css'
import RecentProducts from "./RecentProducts";

class MainPage extends React.Component {

    render() {

        return (
            <div>
                <img src={banner} alt="main banner" className="banner"/>
                <RecentProducts />
            </div>

        )
    }
}

export default MainPage