// src/components/Sidebar.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
    UserOutlined,
    GroupOutlined,
    FundOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import styled from 'styled-components'; // Import styled-components

const { Sider } = Layout;

// Styled component for Menu Item
const StyledMenuItem = styled(Menu.Item)`
    font-weight: bold;
    font-size: 16px;
    color: #fff; /* Default text color */
    
    &:hover {
        background-color: #089DDD; /* Change background color on hover */
        color: #fff; /* Change text color on hover */
    }

    &.ant-menu-item-selected {
        background-color: #089DDD; /* Background for selected item */
        color: #fff; /* Text color for selected item */
    }
    
    &.ant-menu-title-content {
        transition: none !important;
    }
    
    &.ant-menu-item {
        transition: none !important;
    }
`;

const Sidebar = ({ collapsed, onToggle }) => {
    return (
        <Sider
            width={collapsed ? 80 : 328}
            collapsed={collapsed}
        >
            <div style={{ display: 'flex', justifyContent: collapsed ? 'center':'flex-end', padding: '10px' }}>
                {collapsed ? (
                    <MenuUnfoldOutlined onClick={onToggle} style={{ fontSize: '24px', cursor: 'pointer' }} />
                ) : (
                    <MenuFoldOutlined onClick={onToggle} style={{ fontSize: '24px', cursor: 'pointer' }} />
                )}
            </div>
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                <StyledMenuItem key="1" icon={<UserOutlined style={{ fontSize: '20px' }}/>}>
                    <Link to="/individual-members">Hội viên cá nhân</Link>
                </StyledMenuItem>
                <StyledMenuItem key="2" icon={<GroupOutlined style={{ fontSize: '20px' }} />}>
                    <Link to="/group-members">Hội viên tập thể</Link>
                </StyledMenuItem>
                <StyledMenuItem key="3" icon={<FundOutlined style={{ fontSize: '20px' }}/>}>
                    <Link to="/fund-management">Quản lý quỹ</Link>
                </StyledMenuItem>
                <StyledMenuItem key="4" icon={<CalendarOutlined style={{ fontSize: '20px' }}/>}>
                    <Link to="/birthday-management">Quản lý sinh nhật</Link>
                </StyledMenuItem>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
