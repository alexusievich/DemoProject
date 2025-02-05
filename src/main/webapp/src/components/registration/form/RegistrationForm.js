import React from "react";
import {Button, message, Form, Input} from "antd";
import axios from "axios";

const RegistrationForm = (props) => {

    const submitForm = async (username, password, email) => {
        try {
            await axios.post("/api/auth/create", {username: username, password: password, email: email});
            props.history.push("/success");
        } catch (error) {
            message.error(error.response.data);
        }
    }

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
        const emailRegex = new RegExp('([a-zA-Z0-9][\\w.-]{0,20}[a-zA-Z0-9]{1})@([a-zA-Z0-9]{1}[a-zA-Z0-9-]*[a-zA-Z0-9]{1}[.])+(ru|com|org|net)');
        if (emailRegex.test(values.email)) {
            values.password === values.passwordagain ?
                submitForm(values.username, values.password, values.email)
                :
                message.error("Passwords must match!")
        } else {
            message.error("Invalid e-mail address!")
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
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

            <Form.Item
                label="Re-enter password"
                name="passwordagain"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password again!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your e-mail!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{borderRadius: '40px'}}>
                    Create account
                </Button>
            </Form.Item>
        </Form>
    );
}

export default RegistrationForm