import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Checkbox, Dropdown, Input, InputNumber, Menu, Pagination} from 'antd'
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DownOutlined,
    MinusOutlined,
    ShoppingCartOutlined,
    StarFilled
} from '@ant-design/icons'
import './Products.css'
import {Link} from "react-router-dom";
import NumberFormat from "react-number-format";

const {Meta} = Card;

const Products = (props: any) => {

    const pageSize = 6;

    const [products, setProducts] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(pageSize);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortName, setSortName] = useState('Sorting');
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [brands, setBrands] = useState<any>([]);
    const [appliedBrands, setAppliedBrands] = useState([]);
    const [sortKey, setSortKey] = useState('');
    const [isSortCheckArrowUp, setIsSortCheckArrowUp] = useState<boolean>();

    const handlePageChange = (value: any) => {
        setCurrentPage(value);
        if (value <= 1) {
            setMinValue(0);
            setMaxValue(pageSize);
        } else {
            setMinValue((value - 1) * pageSize);
            setMaxValue(value * pageSize);
        }
    };

    const applyFilters = async () => {
        try {
            const response = await axios.get('/api/products', {params: {category: props.match.params.category}});
            const products = response.data;

            let result = products.filter((product: any) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );


            if (appliedBrands.length !== 0) {
                result = result.filter((product: any) =>
                    //@ts-ignore
                    appliedBrands.indexOf(product.brand) !== -1
                );
            }
            if (minPrice && minPrice > 0) {
                result = result.filter((product: any) =>
                    product.price >= minPrice
                )
            }
            if (maxPrice && maxPrice > 0) {
                result = result.filter((product: any) =>
                    product.price <= maxPrice
                )
            }

            if (sortKey !== '') {
                switch (sortKey) {
                    case '1':
                        //@ts-ignore
                        result = result.sort((a, b) => a.popularity - b.popularity);
                        setSortName('By popularity');
                        setIsSortCheckArrowUp(true);
                        break;
                    case '2':
                        //@ts-ignore
                        result = result.sort((a, b) => b.popularity - a.popularity);
                        setSortName('By popularity');
                        setIsSortCheckArrowUp(false);
                        break;
                    case '3':
                        //@ts-ignore
                        result = result.sort((a, b) => a.rating - b.rating);
                        setSortName('By rating');
                        setIsSortCheckArrowUp(true);
                        break;
                    case '4':
                        //@ts-ignore
                        result = result.sort((a, b) => b.rating - a.rating);
                        setSortName('By rating');
                        setIsSortCheckArrowUp(false);
                        break;
                    case '5':
                        //@ts-ignore
                        result = result.sort((a, b) => a.price - b.price);
                        setSortName('By price');
                        setIsSortCheckArrowUp(true);
                        break;
                    case '6':
                        //@ts-ignore
                        result = result.sort((a, b) => b.price - a.price);
                        setSortName('By price');
                        setIsSortCheckArrowUp(false);
                        break;
                    case '7':
                        //@ts-ignore
                        result = result.sort((a, b) => a.name.localeCompare(b.name));
                        setSortName('By name');
                        setIsSortCheckArrowUp(true);
                        break;
                    case '8':
                        //@ts-ignore
                        result = result.sort((a, b) => b.name.localeCompare(a.name));
                        setSortName('By name');
                        setIsSortCheckArrowUp(false);
                        break;
                    case '9':
                        setSortName('Sorting');
                        break;
                    default:
                }
            }
            setProducts(result);
            setFirstPage();
        } catch (error) {
            console.error('Error while applying filters')
        }
    }

    const handleChangeSearch = async (event: any) => {
        setSearchTerm(event.target.value);
        await applyFilters();
    }

    const onBrandChange = async (event: any) => {
        const appliedBrandsArr = [...appliedBrands];
        if (event.target.checked) {
            // @ts-ignore
            appliedBrandsArr.push(event.target.value);
        } else {
            // @ts-ignore
            appliedBrandsArr.splice(appliedBrandsArr.indexOf(event.target.value), 1);
        }
        setAppliedBrands(appliedBrandsArr);
        await applyFilters();
    }

    const handleChangePrice = async (event: any) => {
        if (event.target.id === '1') {
            setMinPrice(event.target.value);
        } else {
            setMaxPrice(event.target.value);
        }
        await applyFilters();
    }

    const handleClickSort = async (event: any) => {
        setSortKey(event.key);
        await applyFilters();
    }

    const setFirstPage = () => {
        setMinValue(0);
        setMaxValue(pageSize);
        setCurrentPage(1);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products', {params: {category: props.match.params.category}});
                const products = response.data;
                const brands: any[] = [];
                products.forEach((product: any) => {
                    if (brands.indexOf(product.brand) === -1) {
                        brands.push(product.brand);
                    }
                });
                setBrands(brands);
                setProducts(products)
                setFirstPage();
                setSearchTerm('');
                setSortName('Sorting');
                setMinPrice(null);
                setMaxPrice(null);
                setAppliedBrands([]);
                setSortKey('');
            } catch (error) {
                props.history.push('/404');
            }
        }

        fetchProducts();
    }, []);

    const productsList = products.slice(minValue, maxValue).map((product: any) => {
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
                <div className="rate">
                    <StarFilled style={{color: "#1890ff"}}/> {product.rating}
                </div>
                <div className="priceCart">
                    <div className="price">
                        <NumberFormat value={product.price} displayType='text' thousandSeparator=' ' suffix=' RUB'/>
                    </div>
                    <div className="cart">
                               <span onClick={() => props.addToCart(product.id, product.name)}>
                                   <ShoppingCartOutlined/>
                               </span>
                    </div>
                </div>
            </Card>
        )
    });

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={handleClickSort}>
                by popularity <ArrowUpOutlined/>
            </Menu.Item>
            <Menu.Item key="2" onClick={handleClickSort}>
                by popularity <ArrowDownOutlined/>
            </Menu.Item>
            <Menu.Item key="3" onClick={handleClickSort}>
                by rating <ArrowUpOutlined/>
            </Menu.Item>
            <Menu.Item key="4" onClick={handleClickSort}>
                by rating <ArrowDownOutlined/>
            </Menu.Item>
            <Menu.Item key="5" onClick={handleClickSort}>
                by price <ArrowUpOutlined/>
            </Menu.Item>
            <Menu.Item key="6" onClick={handleClickSort}>
                by price <ArrowDownOutlined/>
            </Menu.Item>
            <Menu.Item key="7" onClick={handleClickSort}>
                by name <ArrowUpOutlined/>
            </Menu.Item>
            <Menu.Item key="8" onClick={handleClickSort}>
                by name <ArrowDownOutlined/>
            </Menu.Item>
            <Menu.Item key="9" onClick={handleClickSort}>
                by default
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="filterSearch">
                <div className="sorting">
                    <div className="checkboxesName"> Brands:</div>
                    <div className="checkboxes">
                        {/*@ts-ignore*/}
                        {brands.map((brand, index) => {
                            return (
                                <Checkbox
                                    key={index}
                                    value={brand}
                                    // @ts-ignore
                                    checked={appliedBrands.indexOf(brand) !== -1}
                                    onChange={onBrandChange}
                                >
                                    {brand}
                                </Checkbox>
                            )
                        })}
                    </div>
                    <div className="pricer">
                        <div className="priceText">
                            <strong>Price:</strong>
                        </div>
                        <div className="prices">
                            <div className="priceFilter"><InputNumber min={0} id={"1"} size={"small"}
                                                                      value={minPrice}
                                                                      placeholder="Minimum"
                                                                      onBlur={handleChangePrice}/></div>
                            <div><MinusOutlined/></div>
                            <div className="priceFilter"><InputNumber min={0} id={"2"} size={"small"}
                                                                      value={maxPrice}
                                                                      placeholder="Maximum"
                                                                      onBlur={handleChangePrice}/></div>
                        </div>
                    </div>
                </div>
                <div className="search">
                    <Input type="text" placeholder="Search by name"
                           onChange={handleChangeSearch} value={searchTerm}
                           size={"large"}/>
                </div>
                <div className="sorting">
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button className="sortButton" size="large">
                            <div className="btnName">
                                <div>{sortName} {(sortName !== 'Sorting') ?
                                    isSortCheckArrowUp ? <ArrowUpOutlined/> : <ArrowDownOutlined/>
                                    : ''} </div>
                                <div><DownOutlined/></div>
                            </div>
                        </Button>
                    </Dropdown>
                </div>
            </div>
            <div className="cardWrapper">
                {productsList}
            </div>
            <div className="pagination">
                <Pagination
                    current={currentPage}
                    defaultPageSize={pageSize}
                    onChange={handlePageChange}
                    total={products.length}
                />
            </div>
        </>
    )
}

export default Products;