import banner from "../images/banner.jpg";
import React from "react";
import '../styles/MainPage.css'
import RecentProducts from "./RecentProducts";
import GetCookie from "./GetCookie";

class MainPage extends React.Component {

    render() {

        return (
            <div>
                <img src={banner} alt="main banner" className="banner"/>
                {GetCookie('currentPhoneId') && <RecentProducts />}
            </div>

        )
    }
}

export default MainPage