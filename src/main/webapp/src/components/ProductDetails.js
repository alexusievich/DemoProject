import React from 'react';
import axios from "axios";
import {Card, Carousel, Button} from "antd";
import {StarFilled, ShoppingCartOutlined} from "@ant-design/icons";
import '../styles/ProductDetails.css';
import Cookie from "./Cookie";
import productDetailsBanner from '../images/prodDetailsBanner.png'

class ProductDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneDetails: null,
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get('/api/public/products/' + id).then(response => {
            const phoneDetails = response.data;
            this.setState({phoneDetails});
            if (Cookie.getCookie('phoneIds') === '') {
                let arr = [];
                arr[0] = this.state.phoneDetails.id;
                Cookie.setCookie('phoneIds', JSON.stringify(arr));
            } else {
                let arr = JSON.parse(Cookie.getCookie('phoneIds'));
                if (arr.length === 1) {
                    if (arr[0] !== this.state.phoneDetails.id) {
                        arr[1] = this.state.phoneDetails.id;
                    }
                } else {
                    if (arr[1] !== this.state.phoneDetails.id) {
                        arr[0] = arr[1];
                        arr[1] = this.state.phoneDetails.id;
                    }
                }
                Cookie.setCookie('phoneIds', JSON.stringify(arr));
            }
        }).catch(error => {
            this.props.history.push("/404");
        })
    };

    render() {

        const renderImages = this.state.phoneDetails?.images.sort((a, b) => a.id - b.id).map(image => {

            return (
                <Card key={image.id} className="image"
                      cover={
                          <img src={image.imageLink}
                               alt={this.state.phoneDetails?.name}/>
                      }>
                </Card>
            )
        })

        const renderTechSpecs = this.state.phoneDetails?.techSpec.sort((a, b) => a.id - b.id).map(techspec => {

            return (
                <div className="techspecrow">
                    <div className="techspecname">
                        {techspec.name}
                    </div>
                    <div className="techspecvalue">
                        {techspec.value}
                    </div>
                </div>

            )
        })

        return (
            <div>
                {this.state.phoneDetails &&
                <div className="phonedetails">
                    <div className="images">
                        <Carousel autoplay>
                            {renderImages}
                        </Carousel>
                    </div>
                    <div className="information">
                        <div className="name">
                            {this.state.phoneDetails.name} {this.state.phoneDetails.config}
                        </div>
                        <div className="rating">
                            <StarFilled style={{color: "#1890ff"}}/> {this.state.phoneDetails.rating}
                        </div>
                        <div className="description">
                            {this.state.phoneDetails.description}
                        </div>
                        <div className="pricee">
                            {this.state.phoneDetails.price/1000} 000 RUB
                        </div>
                        <div className="cartt">
                            <Button type="primary" shape="round" icon={<ShoppingCartOutlined/>} size="large"
                                    onClick={() => this.props.addToCart(this.state.phoneDetails.id, this.state.phoneDetails.name)}>
                                Add to cart
                            </Button>
                        </div>
                    </div>
                    <div className="underImage">
                    <div className="techspecs">
                        <div className="techspectitle">Technical Specifications</div>
                        {renderTechSpecs}
                    </div>
                        <div className="prodDetBanner">
                            <img src={productDetailsBanner} alt="discount 30%"/>
                        </div>
                    </div>
                </div>
                }

            </div>
        )
    };
}


export default ProductDetails