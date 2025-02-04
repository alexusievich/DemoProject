import React from "react";
import {Button, Result} from "antd";
import {DeleteFilled, ShoppingOutlined} from "@ant-design/icons";
import './Basket.css'
import '../not-found/NotFoundPage.css'
import {Link} from "react-router-dom";
import NumberFormat from 'react-number-format'

const Basket = (props) => {

    const clickItem = (id) => (props.history.push("/productdetails/" + id));

    const renderItems = props.basket?.items?.map(phone => {
        return (
            <div className="itemCard" key={phone.id}>
                <div className="itemImage" onClick={() => clickItem(phone.product.id)}>
                    <img alt={phone.product.name}
                         src={phone.product.img}
                    />
                </div>
                <div className="itemNameConfig" onClick={() => clickItem(phone.product.id)}>
                    <div className="itemName">
                        {phone.product.name}
                    </div>
                    <div className="itemConfig">
                        {phone.product.config}
                    </div>
                </div>
                <div className="itemPrice">
                    <NumberFormat value={phone.product.price} displayType='text' thousandSeparator=' ' suffix=' RUB'/>
                </div>
                <div className="itemRemove">
                    <Button type="primary" shape="round" size="large"
                            onClick={() => props.removeItem(phone.id)}>
                        Remove item
                    </Button>
                </div>
            </div>
        )
    })

    return (
        <>
            {!!props.basket &&
                <div>
                    <div className="basketTitle">
                        <div className="basketName">Shopping cart - {props.basket.items.length} items</div>
                        <div className="basketTotal">
                            Total: <NumberFormat value={props.basket.totalPrice} displayType='text'
                                                 thousandSeparator=' ' suffix=' RUB'/>
                        </div>
                        <div className="basketClear">
                            <Button className="clearBtn" shape="round" size="large"
                                    onClick={() => props.clearBasket}>
                                <DeleteFilled/> Clear basket
                            </Button>
                        </div>
                    </div>
                    <div>
                        {renderItems}
                    </div>
                </div>
            }

            {!(props.basket) &&
                <Result
                    icon={<ShoppingOutlined/>}
                    title="The shopping cart is empty right now!"
                    extra={<Button type="primary" style={{borderRadius: '40px'}}><Link to={"/"}>Back
                        Home</Link></Button>}
                />
            }
        </>
    )
}

export default Basket;