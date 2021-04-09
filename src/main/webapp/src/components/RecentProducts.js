import React from 'react'
import axios from "axios";
import {Card} from "antd";
import {Link} from "react-router-dom";
import '../styles/Main&RecentPages.css'
import Cookie from "./Cookie";

const {Meta} = Card;

class RecentProducts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phones: [],
        };
    }

    componentDidMount() {

        let ids = [];

        if (Cookie.getCookie('phoneIds')) {
            ids = JSON.parse(Cookie.getCookie('phoneIds'));
        }


            ids.reverse().forEach(id => {
                if (id !== '') {
                    axios.get('/api/products/' + id).then(response => {
                        const phone = response.data;
                        this.setState(prevState => ({
                            phones: [...prevState.phones, phone]
                        }))
                    })
                }
            })

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
                {this.state.phones.length > 0 &&
                <div className="recentProducts">
                    <div className="text">Recently viewed</div>
                    <div className="wrapper">{renderPhones}</div>
                </div>}
            </div>
        )
    }

}


export default RecentProducts