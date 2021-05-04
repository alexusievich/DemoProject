import React from 'react';
import '../styles/NotFoundPage.css'
import {Button, Result} from "antd";
import {Link} from 'react-router-dom'


class NotFoundPage extends React.Component {
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" style={{borderRadius: '40px'}}><Link to={"/"}>Back Home</Link></Button>}
            />
        )
    }
}

export default NotFoundPage