import {Form, Input, Button, message} from 'antd';
import React, {FC} from "react";
import './LoginForm.css'
import axios from "axios";

type LoginFormProps = {
    submitForm: (username: any, password: any) => Promise<void>;
    history: any;
    currentUser?: any;
}

const LoginForm: FC<LoginFormProps> = ({submitForm, history, currentUser}) => {

    const onSubmitForm = async (username: any, password: any) => {
        try {
            await axios.post("/api/auth/login", {username: username, password: password});
            submitForm(username, password);
            history.push("/");
        } catch (error) {
            message.error("Invalid username or password!")
        }
    };

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


    const onFinish = async (values: any) => {
        await onSubmitForm(values.username, values.password)
    };

    return (
        <div>
            {!currentUser &&
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
}

export default LoginForm;