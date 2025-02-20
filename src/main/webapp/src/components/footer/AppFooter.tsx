import React, {FC} from 'react';
import '../../App.css';
import {FacebookOutlined, InstagramOutlined, TwitterOutlined, PhoneOutlined, SendOutlined} from "@ant-design/icons";

const AppFooter: FC = () => {

    return (
        <div className="footer">
            <ul className="socials">
                <li><a href="https://www.facebook.com/"><FacebookOutlined/></a></li>
                <li><a href="https://www.instagram.com/"><InstagramOutlined/></a></li>
                <li><a href="https://www.twitter.com/"><TwitterOutlined/></a></li>
            </ul>
            <div className="connect"><PhoneOutlined/> Telephone: <a href="tel:+79524635291">+7(952)-463-52-91</a></div>
            <div className="connect">&copy; 2021 Shop52. All rights reserved.</div>
            <div className="connect"><SendOutlined/> E-mail: <a href="mailto:shop52NC@gmail.com">
                shop52NC@gmail.com</a></div>
        </div>
    )

}

export default AppFooter;