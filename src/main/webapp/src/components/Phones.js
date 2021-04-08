import React from 'react';
import axios from "axios";
import {Button, Card, Checkbox, Dropdown, Input, Menu, Pagination} from 'antd'
import {ArrowDownOutlined, ArrowUpOutlined, DownOutlined, MinusOutlined, ShoppingCartOutlined} from '@ant-design/icons'
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
            sortName: 'Sorting',
            minPrice: 0,
            maxPrice: 1000000,
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

    handleClickPriceUp = (event) => {
        let result;
        axios.get('/api/products/').then(response => {
            const phones = response.data;
            switch (event.key) {
                case '1':
                    result = phones.sort((a, b) => a.popularity - b.popularity);
                    this.setState({sortName: 'By ascending popularity'})
                    break;
                case '2':
                    result = phones.sort((a, b) => b.popularity - a.popularity);
                    this.setState({sortName: 'By descending popularity'})
                    break;
                case '3':
                    result = phones.sort((a, b) => a.rating - b.rating);
                    this.setState({sortName: 'By ascending rating'})
                    break;
                case '4':
                    result = phones.sort((a, b) => b.rating - a.rating);
                    this.setState({sortName: 'By descending rating'})
                    break;
                case '5':
                    result = phones.sort((a, b) => a.price - b.price);
                    this.setState({sortName: 'By ascending price'})
                    break;
                case '6':
                    result = phones.sort((a, b) => b.price - a.price);
                    this.setState({sortName: 'By descending price'})
                    break;
                case '7':
                    result = phones.sort((a, b) => a.name.localeCompare(b.name));
                    this.setState({sortName: 'By ascending name'})
                    break;
                case '8':
                    result = phones.sort((a, b) => b.name.localeCompare(a.name));
                    this.setState({sortName: 'By descending name'})
                    break;
                case '9':
                    result = phones;
                    this.setState({sortName: 'Sorting'});
                    break;
            }
            this.setState({phones: result})
        })
    }

    onChange = (event) => {
        let result = this.state.phones;
        if (event.target.checked) {
            axios.get('/api/products/').then(response => {
                const phones = response.data;
                result = phones.filter(phone =>
                    phone.name.toLowerCase().includes(event.target.value.toLowerCase())
                );
                this.setState({phones: result});
            })
        } else {
            axios.get('/api/products/').then(response => {
                result = response.data;
                this.setState({phones: result});
            });
        }
    }

    handleChangeMinPrice = (event) => {
        this.setState({minPrice: event.target.value})
        axios.get('/api/products/').then(response => {
            const phones = response.data;
            const result = phones.filter(phone =>
                phone.price > this.state.minPrice
            );
            this.setState({phones: result})
        })
    }

    handleChangeMaxPrice = (event) => {
        this.setState({maxPrice: event.target.value})
        axios.get('/api/products/').then(response => {
            const phones = response.data;
            const result = phones.filter(phone =>
                phone.price < this.state.maxPrice
            );
            this.setState({phones: result})
        })
    }


    componentDidMount() {
        axios.get('/api/products/').then(response => {
            const phones = response.data;
            this.setState({phones});
        })
    }


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



        const menu = (
            <Menu>
                <Menu.Item key="1" onClick={this.handleClickPriceUp}>
                    by popularity <ArrowUpOutlined/>
                </Menu.Item>
                <Menu.Item key="2" onClick={this.handleClickPriceUp}>
                    by popularity <ArrowDownOutlined/>
                </Menu.Item>
                <Menu.Item key="3" onClick={this.handleClickPriceUp}>
                    by rating <ArrowUpOutlined/>
                </Menu.Item>
                <Menu.Item key="4" onClick={this.handleClickPriceUp}>
                    by rating <ArrowDownOutlined/>
                </Menu.Item>
                <Menu.Item key="5" onClick={this.handleClickPriceUp}>
                    by price <ArrowUpOutlined/>
                </Menu.Item>
                <Menu.Item key="6" onClick={this.handleClickPriceUp}>
                    by price <ArrowDownOutlined/>
                </Menu.Item>
                <Menu.Item key="7" onClick={this.handleClickPriceUp}>
                    by name <ArrowUpOutlined/>
                </Menu.Item>
                <Menu.Item key="8" onClick={this.handleClickPriceUp}>
                    by name <ArrowDownOutlined/>
                </Menu.Item>
                <Menu.Item key="9" onClick={this.handleClickPriceUp}>
                    by default
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <div className="filterSearch">
                    <div className="sorting">
                        <div className="checkboxes">
                            <Checkbox value="Apple" onChange={this.onChange}>Apple</Checkbox>
                            <Checkbox value="Honor" onChange={this.onChange}>Honor</Checkbox>
                            <Checkbox value="Huawei" onChange={this.onChange}>Huawei</Checkbox>
                            <Checkbox value="Samsung" onChange={this.onChange}>Samsung</Checkbox>
                            <Checkbox value="Xiaomi" onChange={this.onChange}>Xiaomi</Checkbox>
                        </div>
                        <div className="pricer">
                            <div className="priceText">
                                Price:
                            </div>
                            <div className="prices">
                                <div className="priceFilter"><Input type="number" id={"1"} size={"small"}
                                                                    placeholder="Minimum"
                                                                    onChange={this.handleChangeMinPrice}/></div>
                                <div><MinusOutlined/></div>
                                <div className="priceFilter"><Input type="number" id={"2"} size={"small"}
                                                                    placeholder="Maximum"
                                                                    onChange={this.handleChangeMaxPrice}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="search">
                        <Input type="text" placeholder="Search by name"
                               onChange={this.handleChangeSearch} value={this.state.searchTerm}
                               size={"large"}/>
                    </div>
                    <div className="sorting">
                        <Dropdown overlay={menu}>
                            <Button size={"large"}>
                                <div className="btnName">
                                    <div>{this.state.sortName}</div>
                                    <div><DownOutlined/></div>
                                </div>
                            </Button>
                        </Dropdown>
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