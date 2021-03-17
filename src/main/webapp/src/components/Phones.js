import React from 'react';
import axios from "axios";
import {Card} from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
import '../App.css'


const {Meta} = Card;

class Phones extends React.Component {

    state = {
        phones: []
    }

    componentDidMount() {
        axios.get('/products').then(response => {
            const phones = response.data;
            this.setState({phones})
        })
    }

    render() {
        return (
            <div className="cardWrapper">
                {this.state.phones.map(phone =>
                    <Card bordered={true}
                          className="myCard">
                        <a href="/#">
                            <Meta
                                title={phone.name}
                                description={phone.description}
                            />
                        </a>
                        <div className="priceCart">
                            <a href="/#" className="price">{phone.price} RUB</a>
                                <a href="/#" className="cart">
                                    <ShoppingCartOutlined />
                                </a>
                        </div>
                    </Card>
                )}
            </div>
        )
    }

}


export default Phones