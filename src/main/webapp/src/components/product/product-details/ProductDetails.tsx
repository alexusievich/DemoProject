import React, {useEffect, useState, FC} from 'react';
import axios from "axios";
import {Card, Carousel, Button} from "antd";
import {StarFilled, ShoppingCartOutlined} from "@ant-design/icons";
import './ProductDetails.css';
import productDetailsBanner from '../../../assets/images/prodDetailsBanner.png'
import NumberFormat from "react-number-format";
import {handleRecentProductsInCookies} from "./product-details.utils";

type ProductDetailsProps = {
    match: any;
    addToCart: (id: any, name: any) => Promise<void>;
    history: any;
    location: any;
}

const ProductDetails: FC<ProductDetailsProps> = ({match, addToCart, history, location}) => {

    const [phoneDetails, setPhoneDetails] = useState<any>({});

    useEffect(() => {
        const fetchProducts = async () => {
            const id = match.params.id;
            try {
                const response = await axios.get('/api/products/' + id);
                const phoneDetails = response.data;
                setPhoneDetails(phoneDetails);
                handleRecentProductsInCookies(phoneDetails);
            } catch (error) {
                history.push("/404");
            }
        }

        fetchProducts();
    }, []);

    // @ts-ignore
    const images = phoneDetails?.images?.sort((a, b) => a.id - b.id).map(image => (
            <Card key={image.id} className="image"
                  cover={
                      <img src={image.imageLink}
                           alt={phoneDetails?.name}/>
                  }>
            </Card>
        )
    );

    // @ts-ignore
    const techSpecs = phoneDetails?.techSpec?.sort((a, b) => a.id - b.id).map((techspec, index) => (
            <div className="techspecrow" key={index}>
                <div className="techspecname">
                    {techspec.name}
                </div>
                <div className="techspecvalue">
                    {techspec.value}
                </div>
            </div>
        )
    );

    return (
        <div>
            {phoneDetails &&
                <div className="phonedetails">
                    <div className="images">
                        <Carousel autoplay>
                            {images}
                        </Carousel>
                    </div>
                    <div className="information">
                        <div className="name">
                            {phoneDetails.name} {phoneDetails.config}
                        </div>
                        <div className="rating">
                            <StarFilled style={{color: "#1890ff"}}/> {phoneDetails.rating}
                        </div>
                        <div className="description">
                            {phoneDetails.description}
                        </div>
                        <div className="pricee">
                            <NumberFormat value={phoneDetails.price} displayType='text' thousandSeparator=' '
                                          suffix=' RUB'/>
                        </div>
                        <div className="cartt">
                            <Button type="primary" shape="round" icon={<ShoppingCartOutlined/>} size="large"
                                    onClick={() => addToCart(phoneDetails.id, phoneDetails.name)}>
                                Add to cart
                            </Button>
                        </div>
                    </div>
                    <div className="underImage">
                        <div className="techspecs">
                            <div className="techspectitle">Technical Specifications</div>
                            {techSpecs}
                        </div>
                        <div className="prodDetBanner">
                            <img src={productDetailsBanner} alt="discount 30%"/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDetails;