// src/pages/Home.js
import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Title>Chào mừng đến với Ứng dụng Quản lý Hội viên</Title>
            <Paragraph>Vui lòng đăng nhập để bắt đầu quản lý.</Paragraph>
        </div>
    );
};

export default Home;
