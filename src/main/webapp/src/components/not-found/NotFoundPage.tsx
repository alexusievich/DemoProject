import React, {FC} from 'react';
import './NotFoundPage.css'
import {Button, Result} from "antd";
import {Link} from 'react-router-dom'
import {AppRoutes} from "../../models/routes/routes.enum";

const NotFoundPage: FC = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" style={{borderRadius: '40px'}}><Link to={AppRoutes.BaseUrl}>Back Home</Link></Button>}
        />
    )
}

export default NotFoundPage;