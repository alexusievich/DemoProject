import React from 'react';
import '../styles/NotFoundPage.css'
import {Button, Result} from "antd";
import {Link} from 'react-router-dom'
import {CheckCircleFilled} from "@ant-design/icons";

class AuthorizationSuccess extends React.Component {
    render() {
        return (
            <Result
                icon={<CheckCircleFilled style={{color: '#1890ff'}} />}
                status="success"
                title="The account was successfully created!"
                extra={[
                    <Button type="primary" key="console" style={{borderRadius: '40px'}}>
                        <Link to={"/"}>
                            Return to main page
                        </Link>
                    </Button>,
                    <Button key="buy" style={{borderRadius: '40px'}}>
                        <Link to={"/login"}>
                            Sign in
                        </Link>
                    </Button>,
                ]}
            />
        )
    }
}

export default AuthorizationSuccess