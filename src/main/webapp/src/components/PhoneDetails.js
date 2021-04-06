import React from 'react';
import axios from "axios";
import {Card, Carousel, Button} from "antd";
import {StarFilled, ShoppingCartOutlined} from "@ant-design/icons";
import '../styles/PhoneDetails.css';
import SetCookie from "./SetCookie";
import GetCookie from "./GetCookie"

let array = []

class PhoneDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneDetails: null,
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get('/api/products/' + id).then(response => {
            const phoneDetails = response.data;
            this.setState({phoneDetails});
        }).catch(error => {
            this.props.history.push("/404");
        })
    };

    createCookies() {

        this.state.phoneDetails && SetCookie('currentPhoneId', this.state.phoneDetails.id);

        if (this.state.phoneDetails) {

            if (array.length < 1) {
                array[0] = GetCookie('currentPhoneId')
            } else if (array.length === 1) {
                if (array[0] === GetCookie('currentPhoneId')) {
                    array[0] = GetCookie('currentPhoneId');
                } else {
                    array[1] = GetCookie('currentPhoneId');
                }
            } else if (array.length === 2) {
                if (array[1] === GetCookie('currentPhoneId')) {
                    array[1] = GetCookie('currentPhoneId');
                } else {
                    array[0] = array[1];
                    array[1] = GetCookie('currentPhoneId');
                }
            }
        }

        SetCookie('phoneIds', JSON.stringify(array))
    }

    render() {

        this.createCookies();

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
                            {this.state.phoneDetails.rating} <StarFilled style={{color: "#1890ff"}}/>
                        </div>
                        <div className="description">
                            {this.state.phoneDetails.description}
                        </div>
                        <div className="pricee">
                            {this.state.phoneDetails.price} RUB
                        </div>
                        <div className="cartt">
                            <a href="/#">
                                <Button type="primary" shape="round" icon={<ShoppingCartOutlined/>} size="large">
                                    Add to cart
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className="techspecs">
                        <div className="techspectitle">Technical Specifications</div>
                        {renderTechSpecs}
                    </div>
                </div>
                }

            </div>
        )
    }
}


export default PhoneDetails