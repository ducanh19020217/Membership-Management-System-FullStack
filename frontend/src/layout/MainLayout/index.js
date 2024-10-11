// src/layout/index.js
import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../../components/SidebarMenu';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { Content } = Layout;

const Index = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar collapsed={collapsed} onToggle={handleToggle} />
            <Layout style={{backgroundColor: 'white'}}> {/* Adjust the margin here */}
                <Header />
                <Content>
                    <Outlet /> {/* Render child routes here */}
                </Content>
                {/*<Footer />*/}
            </Layout>
        </Layout>
    );
};

export default Index;
