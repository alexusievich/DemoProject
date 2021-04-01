import React from 'react'
import axios from "axios";
import {Card, Carousel, Button} from "antd";
import {StarFilled, ShoppingCartOutlined} from "@ant-design/icons";
import '../styles/PhoneDetails.css'


class PhoneDetails extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            phoneDetails: null,
        };
    }


    componentDidMount() {
        console.log(this.state.phoneDetails)
        const id = this.props.match.params.id;
        axios.get('/api/products/' + id).then(response => {
            const phoneDetails = response.data;
            this.setState({phoneDetails});
        })
    };


    render() {

        const renderImages = this.state.phoneDetails?.images.sort((a, b) => a.id - b.id).map(image => {
            return (
                <Card key={image.id} className="image"
                      cover={
                          <img src={image.imageLink}
                               alt={this.state.phoneDetails.name}/>
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
                            {this.state.phoneDetails?.name} {this.state.phoneDetails?.config}
                        </div>
                        <div className="rating">
                            {this.state.phoneDetails?.rating} <StarFilled style={{color: "#1890ff"}}/>
                        </div>
                        <div className="description">
                            {this.state.phoneDetails?.description}
                        </div>
                        <div className="pricee">
                            {this.state.phoneDetails?.price} RUB
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