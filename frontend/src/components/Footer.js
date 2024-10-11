// src/components/Footer.js
import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            © {new Date().getFullYear()} NCA Member Management
        </Footer>
    );
};

export default AppFooter;
