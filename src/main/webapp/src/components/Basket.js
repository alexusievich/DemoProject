import React from "react";
import axios from "axios";
import {Button} from "antd";
import {DeleteFilled} from "@ant-design/icons";
import '../styles/Basket.css'
import '../styles/NotFoundPage.css'

class Basket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phones: [],
            numberItems: 0,
            totalPrice: 0,
        };
    }


    componentDidMount() {
        axios.get('/api/basket').then(response => {
            const phones = response.data.items;
            this.setState({phones});
            let total = 0;
            phones.forEach(phone =>
                total += phone.product.price
            )
            this.setState({totalPrice: total})
            const numberItems = phones.length;
            this.setState({numberItems: numberItems});
            if (this.state.numberItems === 0) {this.props.history.push("/emptybasket");}
        }).catch(error => {
            this.props.history.push("/emptybasket");
        })
    };

    clearBasket = () => {
        axios.delete("/api/basket/clear").then(response => {
            this.setState({totalPrice: 0});
            this.setState({numberItems: 0});
            this.props.history.push("/emptybasket");
        });
    }

    removeItems = (index) => {
        console.log(index)
        axios.delete(`/api/basket/removeitem/${index}`);
        axios.get('/api/basket').then(response => {
            const phones = response.data.items;
            this.setState({phones});
            let total = 0;
            phones.forEach(phone =>
                total += phone.product.price
            )
            this.setState({totalPrice: total})
            const numberItems = phones.length;
            this.setState({numberItems: numberItems});
            if (this.state.numberItems === 0) {this.props.history.push("/emptybasket");}
        });
    }

    render() {

        const renderItems = this.state.phones?.map((phone,index) => {
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
            }
        )

        return (

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
                }
                <div>{renderItems}</div>
            </div>
        )
    }
}

export default Basket;