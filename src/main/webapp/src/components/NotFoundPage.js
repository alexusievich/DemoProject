import React from 'react';
import {FrownOutlined} from "@ant-design/icons";
import '../styles/NotFoundPage.css'
import {Button} from "antd";
import {Link} from 'react-router-dom'


class NotFoundPage extends React.Component {
    render() {
        return (
            <div className="notfound">
                <div className="error">
                    <div className="circle">404</div>
                    <div className="text">The page was not found <FrownOutlined/></div>
                </div>
                <div className="button">
                    <Link to = "/" >
                    <Button type="primary" shape="round" size="large">
                        Return to main page
                    </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default NotFoundPage