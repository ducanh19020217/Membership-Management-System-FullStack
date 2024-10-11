// src/components/Header.js
import React, { useState } from 'react';
import { Menu, Layout, Avatar, Badge, Popover, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BellOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const [visible, setVisible] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    const content = (
        <div style={{ minWidth: '200px' }}>
            <h3 style={{ marginBottom: '10px' }}>Thông tin người dùng</h3>
            <p style={{ margin: '0' }}>Tên: John Doe</p> {/* Replace with actual user info */}
            <p style={{ margin: '0' }}>Email: johndoe@example.com</p> {/* Replace with actual user info */}
            <div style={{ marginTop: '10px' }}>
                <Button
                    type="primary"
                    block
                    onClick={() => alert('Chức năng này chưa sẵn sàng!')}
                    style={{ marginBottom: '10px' }}
                >
                    Đổi mật khẩu
                </Button>
                <Button type="danger" block onClick={handleLogout}>
                    Đăng xuất
                </Button>
            </div>
        </div>
    );

    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', gap: '20px' }}>
                <Badge
                    count={1}
                    showZero
                    style={{
                        marginRight: '20px',
                        zIndex: 1,
                        backgroundColor: 'red', // Change badge color to red
                        position: 'absolute',
                        top: '0',
                        right: '-25px',
                        color: 'white' // Ensure the badge text color is white for contrast
                    }}
                >
                    <BellOutlined style={{ color: 'black', fontSize: '24px' }} /> {/* Change icon color to black */}
                </Badge>
                <Popover
                    content={content}
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                >
                    <Avatar style={{ backgroundColor: '#87d068' }} />
                    {/* Replace "/path/to/avatar.jpg" with the actual path to your avatar image */}
                </Popover>
            </div>
        </Header>
    );
};

export default AppHeader;
