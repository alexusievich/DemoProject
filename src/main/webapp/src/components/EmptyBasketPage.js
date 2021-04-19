import {ShoppingOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Button} from "antd";
import React from "react";

class EmptyBasketPage extends React.Component {
    render() {
        return (
            <div className="notfound">
                <div className="error">
                    <div className="text">The shopping cart is empty right now <ShoppingOutlined /></div>
                </div>
                <div className="button">
                    <Link to="/phones">
                        <Button type="primary" shape="round" size="large">
                            Continue shopping
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default EmptyBasketPage