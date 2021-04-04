import banner from "../images/banner.jpg";
import React from "react";
import axios from "axios";
import {Card} from "antd";
import {Link} from "react-router-dom";
import {ShoppingCartOutlined} from "@ant-design/icons";
import '../styles/MainPage.css'

const {Meta} = Card;

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phones: [],
        };
    }

    componentDidMount() {

        let id1 = '';
        let id2 = '';

        id1 = document.cookie.slice(0, document.cookie.lastIndexOf(' '));
        id2 = document.cookie.slice(document.cookie.lastIndexOf(' ') + 1);

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
                <img src={banner} alt="main banner" className="banner"/>
                <div className="recentProducts">
                    {this.state.phones.length > 0 && <div className="text">Recently viewed</div>}
                    <div className="wrapper">{renderPhones}</div>
                </div>
            </div>

        )
    }
}

export default MainPage