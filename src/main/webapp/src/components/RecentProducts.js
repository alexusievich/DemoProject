import React from 'react'
import axios from "axios";
import {Card} from "antd";
import {Link} from "react-router-dom";
import GetCookie from "./GetCookie";
import '../styles/Main&RecentPages.css'

const {Meta} = Card;

class RecentProducts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phones: [],
        };
    }

    componentDidMount() {

        let id1 = '';
        let id2 = '';

        let arrayId = JSON.parse(GetCookie('phoneIds'));

        id1 = arrayId[1];
        id2 = arrayId[0];

        if (id1 !== '') {
            axios.get('/api/products/' + id1).then(response => {
                const phone = response.data;
                this.setState(prevState => ({
                    phones: [...prevState.phones, phone]
                }))
            })
        }

        if (id2 !== '') {
            axios.get('/api/products/' + id2).then(response => {
                const phone = response.data;
                this.setState(prevState => ({
                    phones: [...prevState.phones, phone]
                }))
            })
        }

    };

    render() {

        const renderPhones = (this.state.phones.map(phone => {
                return (
                    <Card hoverable
                          key={phone.id}
                          className="recentCards"
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
                        <div className="priceRecent">{phone.price} RUB</div>
                    </Card>
                )
            })
        )

        return (
            <div>
                <div className="recentProducts">
                    <div className="text">Recently viewed</div>
                    <div className="wrapper">{renderPhones}</div>
                </div>
            </div>

        )
    }
}

export default RecentProducts