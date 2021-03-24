import React from 'react';
import axios from "axios";
import {Card, Pagination} from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
import '../App.css'


const {Meta} = Card;

class Phones extends React.Component {

    pageSize = () => {
        return 6;
    }


    constructor(props) {
        super(props);
        this.state = {
            phones: [],
            minValue: 0,
            maxValue: this.pageSize()
        };
    }


    handleChange = value => {
        console.log(value);
        if (value <= 1) {
            this.setState({
                minValue: 0,
                maxValue: this.pageSize()
            });
        } else {
            this.setState({
                minValue: (value - 1) * this.pageSize(),
                maxValue: value * this.pageSize()
            });
        }
    };


    componentDidMount() {
        axios.get('/api/products/').then(response => {
            const phones = response.data;
            this.setState({phones})
        })
    };



    render() {

        const renderPhones = this.state.phones.slice(this.state.minValue, this.state.maxValue).map(phone => {
            return (
                <Card hoverable
                      className="myCard"
                      cover={
                          <img
                              alt={phone.name}
                              src={phone.img}
                          />
                      }>
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
            )
        })


       return (
            <div>
                <div className="cardWrapper">
                    {renderPhones}
                </div>
                <div className = "pagination">
                    <Pagination
                        defaultPageSize={this.pageSize()}
                        onChange={this.handleChange}
                        total={this.state.phones.length}
                    />
                </div>
            </div>
        )
    };
}


export default Phones