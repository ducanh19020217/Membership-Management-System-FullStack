// src/pages/Login.js
import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { username, password } = values;
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password,
            });
            // localStorage.setItem('access_token', response.data.access);
            // localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            navigate('/dashboard');
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Đăng nhập</Title>
            {error && <Alert message={error} type="error" showIcon closable onClose={() => setError('')} />}
            <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ username: '', password: '' }}
                style={{ marginTop: '20px' }}
            >
                <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                    <Input placeholder="Tên đăng nhập" />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
