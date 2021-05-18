import {Form, Input, Button, message} from 'antd';
import React from "react";
import '../styles/LoginForm.css'
import axios from "axios";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
        }
    }

    submitForm = (username, password) => {
        axios.post("/api/auth/login", {username: username, password: password}).then(response => {
            this.props.submitForm(username,password);
            this.props.history.push("/");
        }).catch(error => {
            message.error("Invalid username or password!").then();
        })
    }

    render() {

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };


        const onFinish = (values) => {
            this.submitForm(values.username, values.password)
        };

        return (
            <div>

            {!(this.props.currentUser) &&
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{borderRadius: '40px'}}>
                        Sign in
                    </Button>
                </Form.Item>
            </Form>}


            </div>
        );
    };
}

export default LoginForm