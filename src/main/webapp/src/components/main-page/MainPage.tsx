import mainBanner from "../../assets/images/banner.jpg";
import React, {FC} from "react";
import './Main&RecentPages.css'
import RecentProducts from "../product/recent-products/RecentProducts";

const MainPage: FC = () => {
    return (
        <div>
            <img src={mainBanner} alt="main banner" className="banner"/>
            <RecentProducts />
        </div>

    )
}

export default MainPage;