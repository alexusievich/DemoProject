import React from "react";
import axios from "axios";
import {Button} from "antd";
import {DeleteFilled, ShoppingOutlined} from "@ant-design/icons";
import '../styles/Basket.css'
import '../styles/NotFoundPage.css'
import {Link} from "react-router-dom";

class Basket extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('/api/basket').then();
    };

    clearBasket = () => {
        axios.delete("/api/basket/clear").then(response => {
            this.props.setBasket(undefined);
        });
    }

    removeItems = (id) => {
        axios.delete(`/api/basket/removeitem/${id}`).then(response => {
                axios.get('/api/basket').then(response => {
                    const basket = response.data;
                    this.props.setBasket(basket);
                });
            }
        );

    }

    render() {


        const renderItems = this.props.basket?.items?.map(phone => {
            return (
                <div className="itemCard">
                    <div className="itemImage">
                        <img alt={phone.product.name}
                             src={phone.product.img}
                        />
                    </div>
                    <div className="itemNameConfig">
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
                                onClick={() => this.removeItems(phone.id)}>
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
                                    onClick={this.clearBasket}>
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
                        <Link to="/phones">
                            <Button type="primary" shape="round" size="large">
                                Continue shopping
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