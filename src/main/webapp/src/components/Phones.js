import React from 'react';
import axios from "axios";
import {Card, Pagination} from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
import '../App.css'


const {Meta} = Card;

class Phones extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            phones: [],
            minValue: 0,
            maxValue: 2
        };
    }


    handleChange = value => {
        (value <= 1) ?
            this.setState({
                minValue: 0,
                maxValue: 2
            })
            :
            this.setState({
                minValue: this.state.maxValue,
                maxValue: value * 2
            });
    };


    componentDidMount() {
        axios.get('/api/products').then(response => {
            const phones = response.data;
            this.setState({phones})
        })
    }

    render() {

        const renderPhones = this.state.phones.slice(this.state.minValue, this.state.maxValue).map((phone) => {
            return <Card bordered={true}
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
                        <ShoppingCartOutlined/>
                    </a>
                </div>
            </Card>
        });


        return (
            <div>
                <div className="cardWrapper">
                    {renderPhones}
                </div>

                <Pagination
                    className = "pagination"
                    defaultCurrent={1}
                    defaultPageSize={this.state.maxValue}
                    onChange={this.handleChange}
                    total={this.state.phones.length}
                />
            </div>
        )
    }

}


export default Phones