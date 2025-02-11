import React, {FC} from "react";
import {Button, Result} from "antd";
import {DeleteFilled, ShoppingOutlined} from "@ant-design/icons";
import './Basket.css'
import '../not-found/NotFoundPage.css'
import {Link, useNavigate} from "react-router-dom";
import NumberFormat from 'react-number-format'
import {AppRoutes} from "../../models/routes/routes.enum";

type BasketProps = {
    basket?: any;
    clearBasket: () => Promise<void>;
    removeItem: (id: any) => Promise<void>;
}

const Basket: FC<BasketProps> = ({basket, clearBasket, removeItem}) => {
    const navigate = useNavigate();

    const clickItem = (id: any) => (navigate(AppRoutes.ProductDetails.replace(':id', id)));

    const renderItems = basket?.items?.map((phone: any) => {
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
                            onClick={() => removeItem(phone.id)}>
                        Remove item
                    </Button>
                </div>
            </div>
        )
    })

    return (
        <>
            {!!basket &&
                <div>
                    <div className="basketTitle">
                        <div className="basketName">Shopping cart - {basket.items.length} items</div>
                        <div className="basketTotal">
                            Total: <NumberFormat value={basket.totalPrice} displayType='text'
                                                 thousandSeparator=' ' suffix=' RUB'/>
                        </div>
                        <div className="basketClear">
                            <Button className="clearBtn" shape="round" size="large"
                                    onClick={clearBasket}>
                                <DeleteFilled/> Clear basket
                            </Button>
                        </div>
                    </div>
                    <div>
                        {renderItems}
                    </div>
                </div>
            }

            {!basket &&
                <Result
                    icon={<ShoppingOutlined/>}
                    title="The shopping cart is empty right now!"
                    extra={<Button type="primary" style={{borderRadius: '40px'}}><Link to={AppRoutes.BaseUrl}>Back
                        Home</Link></Button>}
                />
            }
        </>
    )
}

export default Basket;