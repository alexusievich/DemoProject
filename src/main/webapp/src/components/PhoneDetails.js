import React from 'react'
import axios from "axios";

class PhoneDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneDetails: ''
        };
    }

    componentDidMount() {
        axios.get('/api/products/1001').then(response => {
            const phoneDetails = response.data;
            this.setState({phoneDetails})
        })
    };

    render() {
        return (

            <div>
                {console.log(this.state.phoneDetails.name)}
                <img style={{ width: '200px' }} src={this.state.phoneDetails.img}/>
                <div>{this.state.phoneDetails.name}</div>
                <div> <strong>{this.state.phoneDetails.price} RUB </strong> </div>
            </div>
            )
    }
}

export default PhoneDetails