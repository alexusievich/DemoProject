import React, {useEffect, useState, FC} from 'react'
import axios from "axios";
import {Card} from "antd";
import {Link} from "react-router-dom";
import '../../main-page/Main&RecentPages.css'
import NumberFormat from "react-number-format";
import {getCookie} from "../../../utils/cookies.utils";

const {Meta} = Card;

const RecentProducts: FC = () => {

    const [phones, setPhones] = useState<any>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let ids = [];

                if (getCookie('phoneIds')) {
                    ids = JSON.parse(getCookie('phoneIds'));
                }

                for (const id of ids.reverse()) {
                    if (id !== '') {
                        const response = await axios.get('/api/products/' + id);
                        setPhones((prevState: any) => [...prevState, response.data]);
                    }
                }
            } catch (error) {
                console.error('Error while fetching recent product');
            }
        }

        fetchProducts();
    }, []);


    const phonesList = (phones.map((phone: any) => {
        return (
            <Link to={"/productdetails/" + phone.id} key={phone.id}>
                <Card hoverable
                      key={phone.id}
                      className="recentCards"
                      cover={
                          <img alt={phone.name}
                               src={phone.img}
                          />
                      }>
                    <Meta
                        title={phone.name}
                        description={phone.config}
                    />
                    <div className="priceRecent"><NumberFormat value={phone.price} displayType='text'
                                                               thousandSeparator=' ' suffix=' RUB'/></div>
                </Card>
            </Link>
        )
    }));

    return (
        <>
            {phones.length > 0 &&
                <div className="recentProducts">
                    <div className="text">
                        Recently viewed
                    </div>
                    <div className="wrapper">
                        {phonesList}
                    </div>
                </div>}
        </>
    )
}

export default RecentProducts