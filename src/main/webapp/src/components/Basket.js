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
        this.state = {
            basket: null,
            phones: [],
            numberItems: 0,
            totalPrice: 0,
        };
    }

    componentDidMount() {
        axios.get('/api/basket').then(response => {
            const basket = response.data;
            this.setState({basket});
            this.setState({phones: basket.items})
            let totalPrice;
            basket ? totalPrice = basket.totalPrice : totalPrice = 0;
            this.setState({totalPrice});
            let numberItems;
            basket ? numberItems = basket.numberItems : numberItems = 0;
            this.setState({numberItems});
        })
    };

    clearBasket = () => {
        axios.delete("/api/basket/clear").then(response => {
            axios.get('/api/basket').then(response => {
                const basket = response.data;
                this.setState({phones: basket.items});
                this.setState({totalPrice: 0})
                this.setState({numberItems: 0});
            });
        });
    }

    removeItems = (index) => {
        console.log(index)
        axios.delete(`/api/basket/removeitem/${index}`).then(response => {
                axios.get('/api/basket').then(response => {
                    const basket = response.data;
                    this.setState({phones: basket.items});
                    this.setState({totalPrice: basket.totalPrice})
                    this.setState({numberItems: basket.numberItems});
                });
            }
        );

    }

    render() {

        const renderItems = this.state.phones?.map((phone, index) => {
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
                        <Button type="primary" shape="round" size="large" onClick={() => this.removeItems(index)}>
                            Remove item
                        </Button>
                    </div>
                </div>
            )
        })


        return (
            <div>
                {this.state.totalPrice > 0 &&
                <div>
                    <div className="basketTitle">
                        <div className="basketName">Shopping cart - {this.state.numberItems} items</div>
                        <div className="basketTotal">Total: {this.state.totalPrice / 1000}.000 RUB</div>
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

                {this.state.totalPrice === 0 &&
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