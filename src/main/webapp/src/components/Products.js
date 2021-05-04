import React from 'react';
import axios from "axios";
import {Button, Card, Checkbox, Dropdown, Input, Menu, Pagination, InputNumber} from 'antd'
import {ArrowDownOutlined, ArrowUpOutlined, DownOutlined, MinusOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import '../styles/Products.css'
import {Link} from "react-router-dom";

const {Meta} = Card;

class Products extends React.Component {

    pageSize = () => {
        return 6;
    }


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            category: '',
            minValue: 0,
            maxValue: this.pageSize(),
            current: 1,
            searchTerm: '',
            sortName: 'Sorting',
            minPrice: 0,
            maxPrice: 0,
            brands: [],
            appliedBrands: [],
            sortKey: '',
            sortCheckArrowUp: undefined,
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

    applyFilters = () => {
        axios.get('/api/products', {params: {category: this.props.match.params.category}}).then(response => {
            const products = response.data;

            let result = products.filter(product =>
                product.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            );


            if (this.state.appliedBrands.length !== 0) {
                result = result.filter(product =>
                    this.state.appliedBrands.indexOf(product.brand) !== -1
                );
            }
            if (this.state.minPrice > 0) {
                result = result.filter(product =>
                    product.price >= this.state.minPrice
                )
            }
            if (this.state.maxPrice > 0) {
                result = result.filter(product =>
                    product.price <= this.state.maxPrice
                )
            }

            if (this.state.sortKey !== '') {
                switch (this.state.sortKey) {
                    case '1':
                        result = result.sort((a, b) => a.popularity - b.popularity);
                        this.setState({
                            sortName: 'By popularity',
                            sortCheckArrowUp: true
                        })
                        break;
                    case '2':
                        result = result.sort((a, b) => b.popularity - a.popularity);
                        this.setState({
                            sortName: 'By popularity',
                            sortCheckArrowUp: false
                        })
                        break;
                    case '3':
                        result = result.sort((a, b) => a.rating - b.rating);
                        this.setState({
                            sortName: 'By rating',
                            sortCheckArrowUp: true
                        })
                        break;
                    case '4':
                        result = result.sort((a, b) => b.rating - a.rating);
                        this.setState({
                            sortName: 'By rating',
                            sortCheckArrowUp: false
                        })
                        break;
                    case '5':
                        result = result.sort((a, b) => a.price - b.price);
                        this.setState({
                            sortName: 'By price',
                            sortCheckArrowUp: true
                        })
                        break;
                    case '6':
                        result = result.sort((a, b) => b.price - a.price);
                        this.setState({
                            sortName: 'By price',
                            sortCheckArrowUp: false
                        })
                        break;
                    case '7':
                        result = result.sort((a, b) => a.name.localeCompare(b.name));
                        this.setState({
                            sortName: 'By name',
                            sortCheckArrowUp: true
                        })
                        break;
                    case '8':
                        result = result.sort((a, b) => b.name.localeCompare(a.name));
                        this.setState({
                            sortName: 'By name',
                            sortCheckArrowUp: false
                        })
                        break;
                    case '9':
                        this.setState({sortName: 'Sorting'});
                        break;
                    default:
                }
            }
            this.setState({products: result});
            this.setFirstPage();
        });
    }

    handleChangeSearch = (event) => {
        this.setState({searchTerm: event.target.value})
        this.applyFilters();
    }

    onBrandChange = (event) => {
        const appliedBrands = [...this.state.appliedBrands];
        if (event.target.checked) {
            appliedBrands.push(event.target.value);
        } else {
            appliedBrands.splice(appliedBrands.indexOf(event.target.value), 1);
        }
        this.setState({appliedBrands: appliedBrands});
        this.applyFilters();
    }

    handleChangePrice = (event) => {
        event.target.id === "1" ?
            this.setState({minPrice: event.target.value})
            :
            this.setState({maxPrice: event.target.value})
        this.applyFilters();
    }

    handleClickSort = (event) => {
        this.setState({sortKey: event.key});
        this.applyFilters();
    }

    setFirstPage = () => {
        this.setState({
            minValue: 0,
            maxValue: this.pageSize(),
            current : 1,
        })
    }

    fetchProducts = () => {
        axios.get('/api/products', {params: {category: this.props.match.params.category}}).then(response => {
            const products = response.data;
            const brands = [];
            products.forEach(product => {
                if (brands.indexOf(product.brand) === -1) {
                    brands.push(product.brand);
                }
            })
            this.setState({brands: brands});
            this.setState({products});
            this.setFirstPage();
            this.setState({
                searchTerm: '',
                sortName: 'Sorting',
                minPrice: 0,
                maxPrice: 0,
                appliedBrands: [],
                sortKey: '',
            })
        })
    }

    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.category !== prevProps.match.params.category) {
            this.fetchProducts();
        }
    }


    render() {

        const renderProducts = this.state.products.slice(this.state.minValue, this.state.maxValue).map((product) => {
            return (
                <Card hoverable
                      key={product.id}
                      className="myCard"
                      cover={
                          <Link to={"/productdetails/" + product.id}>
                              <img alt={product.name}
                                   src={product.img}
                              />
                          </Link>
                      }>
                    <Meta
                        title={product.name}
                        description={product.config}
                    />
                    <div className="priceCart">
                        <div className="price">{product.price} RUB</div>
                        <div className="cart">
                               <span onClick={() => this.props.addToCart(product.id, product.name)}>
                                   <ShoppingCartOutlined/>
                               </span>
                        </div>
                    </div>
                </Card>
            )
        });


        const menu = (
            <Menu>
                <Menu.Item key="1" onClick={this.handleClickSort}>
                    by popularity <ArrowUpOutlined/>
                </Menu.Item>
                <Menu.Item key="2" onClick={this.handleClickSort}>
                    by popularity <ArrowDownOutlined/>
                </Menu.Item>
                <Menu.Item key="3" onClick={this.handleClickSort}>
                    by rating <ArrowUpOutlined/>
                </Menu.Item>
                <Menu.Item key="4" onClick={this.handleClickSort}>
                    by rating <ArrowDownOutlined/>
                </Menu.Item>
                <Menu.Item key="5" onClick={this.handleClickSort}>
                    by price <ArrowUpOutlined/>
                </Menu.Item>
                <Menu.Item key="6" onClick={this.handleClickSort}>
                    by price <ArrowDownOutlined/>
                </Menu.Item>
                <Menu.Item key="7" onClick={this.handleClickSort}>
                    by name <ArrowUpOutlined/>
                </Menu.Item>
                <Menu.Item key="8" onClick={this.handleClickSort}>
                    by name <ArrowDownOutlined/>
                </Menu.Item>
                <Menu.Item key="9" onClick={this.handleClickSort}>
                    by default
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <div className="filterSearch">
                    <div className="sorting">
                        <div className="checkboxesName"> Brands: </div>
                        <div className="checkboxes">
                            {this.state.brands.map(brand => {
                                return (
                                    <Checkbox value={brand} onChange={this.onBrandChange}>{brand}</Checkbox>
                                )
                            })}
                        </div>
                        <div className="pricer">
                            <div className="priceText">
                                <strong>Price:</strong>
                            </div>
                            <div className="prices">
                                <div className="priceFilter"><InputNumber min={0} id={"1"} size={"small"}
                                                                          placeholder="Minimum"
                                                                          onBlur={this.handleChangePrice}/></div>
                                <div><MinusOutlined/></div>
                                <div className="priceFilter"><InputNumber min={0} id={"2"} size={"small"}
                                                                          placeholder="Maximum"
                                                                          onBlur={this.handleChangePrice}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="search">
                        <Input type="text" placeholder="Search by name"
                               onChange={this.handleChangeSearch} value={this.state.searchTerm}
                               size={"large"}/>
                    </div>
                    <div className="sorting">
                        <Dropdown overlay={menu} trigger='click'>
                            <Button className="sortButton" size={"large"}>
                                <div className="btnName">
                                    <div>{this.state.sortName} {(this.state.sortName !== 'Sorting') ?
                                        this.state.sortCheckArrowUp ? <ArrowUpOutlined/> : <ArrowDownOutlined/>
                                        : ''} </div>
                                    <div><DownOutlined/></div>
                                </div>
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                <div className="cardWrapper">
                    {renderProducts}
                </div>
                <div className="pagination">
                    <Pagination
                        current={this.state.current}
                        defaultPageSize={this.pageSize()}
                        onChange={this.handleChange}
                        total={this.state.products.length}
                    />
                </div>
            </div>
        )

    }

}


export default Products