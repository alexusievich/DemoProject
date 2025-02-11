import React, {FC} from 'react';
import '../../not-found/NotFoundPage.css'
import {Button, Result} from "antd";
import {Link} from 'react-router-dom'
import {CheckCircleFilled} from "@ant-design/icons";
import {AppRoutes} from "../../../models/routes/routes.enum";

const RegistrationSuccess: FC = () => {
    return (
        <Result
            icon={<CheckCircleFilled style={{color: '#1890ff'}}/>}
            status="success"
            title="The account was successfully created!"
            extra={[
                <Button type="primary" key="console" style={{borderRadius: '40px'}}>
                    <Link to={AppRoutes.BaseUrl}>
                        Back Home
                    </Link>
                </Button>,
                <Button key="buy" style={{borderRadius: '40px'}}>
                    <Link to={AppRoutes.Login}>
                        Sign in
                    </Link>
                </Button>,
            ]}
        />
    )
}

export default RegistrationSuccess;