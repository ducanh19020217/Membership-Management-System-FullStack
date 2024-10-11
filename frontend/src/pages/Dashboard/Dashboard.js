// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Table, Typography, Alert } from 'antd';
import api from '../../services/api';

const { Title } = Typography;

const Dashboard = () => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('members/');
                setMembers(response.data);
            } catch (err) {
                console.error('Error fetching members:', err);
                setError('Không thể lấy danh sách hội viên. Vui lòng thử lại.');
            }
        };

        fetchMembers();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            width: '10%',
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            width: '25%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            key: 'phone_number',
            sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
            width: '15%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            sorter: (a, b) => a.address.localeCompare(b.address),
            width: '30%',
        },
    ];

    return (
        <div>
            <Title level={2}>Dashboard</Title>
            {error && <Alert message={error} type="error" showIcon closable onClose={() => setError('')} />}
            <Table
                dataSource={members}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                style={{ marginTop: '20px' }}
            />
        </div>
    );
};

export default Dashboard;
