import React from "react";
import {Button, message, Form, Input} from "antd";
import axios from "axios";

class RegistrationForm extends React.Component {

    submitForm = (username, password) => {
                axios.post("/api/auth/create", {username: username, password: password}).then(response => {
                    this.props.history.push("/success");
                }).catch(error => {
                    message.error(error.response.data);
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

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };


        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                        Create account
                    </Button>
                </Form.Item>
            </Form>
        );
    };
}

export default RegistrationForm