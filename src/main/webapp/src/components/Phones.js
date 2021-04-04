import React from 'react';
import axios from "axios";
import {Card, Pagination, Input} from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
import '../styles/Phones.css'
import {Link} from "react-router-dom";


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
            maxValue: this.pageSize(),
            current: 1,
            searchTerm: '',
        };
    }

    handleChange = value => {
        this.setState({current: value});
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

    handleChangeSearch = (event) => {
        this.setState({searchTerm: event.target.value})
        axios.get('/api/products/').then(response => {
            const phones = response.data;
            const result = phones.filter(phone =>
                phone.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            );
            this.setState({phones: result})
        })
    }

    componentDidMount() {
        axios.get('/api/products/').then(response => {
            const phones = response.data;
            this.setState({phones});
        })
    };


    render() {

        const renderPhones = this.state.phones.slice(this.state.minValue, this.state.maxValue).map(phone => {
            return (
                <Card hoverable
                      key={phone.id}
                      className="myCard"
                      cover={
                          <Link to={"/phones/" + phone.id}>
                              <img alt={phone.name}
                                   src={phone.img}
                              />
                          </Link>
                      }>
                    <Meta
                        title={phone.name}
                        description={phone.config}
                    />
                    <div className="priceCart">
                        <div className="price">{phone.price} RUB</div>
                        <a href="/#" className="cart">
                            <ShoppingCartOutlined/>
                        </a>
                    </div>
                </Card>
            )
        });


        return (
            <div>
                <div>
                    <div className="search">
                        <Input type="text" placeholder="Search by name"
                               onChange={this.handleChangeSearch} value={this.state.searchTerm}
                        size={"large"}/>
                    </div>
                </div>
                <div className="cardWrapper">
                    {renderPhones}
                </div>
                <div className="pagination">
                    <Pagination
                        current={this.state.current}
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