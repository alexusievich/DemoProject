import React from "react";
import {Button} from "antd";
import {DeleteFilled, ShoppingOutlined} from "@ant-design/icons";
import '../styles/Basket.css'
import '../styles/NotFoundPage.css'
import {Link} from "react-router-dom";

class Basket extends React.Component {

    clickItem = (id) => {
        this.props.history.push("/productdetails/" + id);
    }

    render() {

        const renderItems = this.props.basket?.items?.map(phone => {
            return (
                <div className="itemCard">
                    <div className="itemImage" onClick={() => this.clickItem(phone.product.id)}>
                        <img alt={phone.product.name}
                             src={phone.product.img}
                        />
                    </div>
                    <div className="itemNameConfig" onClick={() => this.clickItem(phone.product.id)}>
                        <div className="itemName">
                            {phone.product.name}
                        </div>
                        <div className="itemConfig">
                            {phone.product.config}
                        </div>
                    </div>
                    <div className="itemPrice">
                        {phone.product.price} RUB
                    </div>
                    <div className="itemRemove">
                        <Button type="primary" shape="round" size="large"
                                onClick={() => this.props.removeItem(phone.id)}>
                            Remove item
                        </Button>
                    </div>
                </div>
            )
        })


        return (
            <div>
                {this.props.basket &&
                <div>
                    <div className="basketTitle">
                        <div className="basketName">Shopping cart - {this.props.basket.items.length} items</div>
                        <div className="basketTotal">Total: {this.props.basket.totalPrice / 1000}.000 RUB</div>
                        <div className="basketClear">
                            <Button className="clearBtn" shape="round" size="large"
                                    onClick={this.props.clearBasket}>
                                <DeleteFilled/> Clear basket
                            </Button>
                        </div>
                    </div>
                    <div>
                        {renderItems}
                    </div>
                </div>
                }

                {!(this.props.basket) &&
                <div className="notfound">
                    <div className="error">
                        <div className="text">The shopping cart is empty right now <ShoppingOutlined/></div>
                    </div>
                    <div className="button">
                        <Link to="/">
                            <Button type="primary" shape="round" size="large">
                                Return to main page
                            </Button>
                        </Link>
                    </div>
                </div>
                }
            </div>
        )
    }

}

export default Basket;