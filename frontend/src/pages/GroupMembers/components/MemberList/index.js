// src/components/CollectiveMemberList.js
import React, { useState } from 'react';
import { Table, Button, Space, Modal, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, HistoryOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import AddCollectiveMemberModal from '../AddCollectiveMemberModal';
import HistoryModal from '../HistoryModal';
import moment from "moment";

const { Text } = Typography;

// Styled Components for Status
const StatusTag = styled(Text)`
  color: ${(props) => {
    if (props.status === 'Đang hoạt động') return '#52c41a';
    if (props.status === 'Tạm ngưng') return '#faad14';
    if (props.status === 'Đã ngừng') return '#f5222d';
    return '#000';
}};
`;

const CollectiveMemberList = ({ members, onDeleteMember, onEditMember }) => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);

    const handleEdit = (record) => {
        setSelectedMember(record);
        setIsAddModalVisible(true); // Sử dụng modal thêm để sửa
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: (
                <>
                    Bạn có chắc chắn muốn xóa hội viên <Text strong>{record.companyName}</Text> không?
                </>
            ),
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onDeleteMember(record.key);
            },
        });
    };

    const handleHistory = (record) => {
        // Giả lập dữ liệu lịch sử, trong thực tế bạn sẽ lấy từ API
        const history = [
            {
                key: '1',
                timestamp: '2024-10-10 14:32:21',
                account: 'admin',
                actionLog: 'Thêm mới hội viên',
            },
            {
                key: '2',
                timestamp: '2024-10-11 09:15:05',
                account: 'user1',
                actionLog: 'Chỉnh sửa thông tin hội viên',
            },
            // Thêm các bản ghi lịch sử khác nếu cần
        ];
        setSelectedHistory(history);
        setIsHistoryModalVisible(true);
    };

    const columns = [
        {
            title: 'Số thứ tự',
            dataIndex: 'index',
            key: 'index',
            width: 50,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên công ty',
            dataIndex: 'companyName',
            key: 'companyName',
            width: 250,
            render: (text) => <Text>{text}</Text>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 200,
        },
        {
            title: 'Ngày gia nhập',
            dataIndex: 'joinDate',
            key: 'joinDate',
            width: 120,
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Lĩnh vực hoạt động',
            dataIndex: 'field',
            key: 'field',
            width: 200,
        },
        {
            title: 'Email liên hệ',
            dataIndex: 'contactEmail',
            key: 'contactEmail',
            width: 200,
            render: (text) => <a href={`mailto:${text}`}>{text}</a>,
        },
        {
            title: 'Số điện thoại liên hệ',
            dataIndex: 'contactPhone',
            key: 'contactPhone',
            width: 150,
            render: (text) => <a href={`tel:${text}`}>{text}</a>,
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            width: 200,
            render: (text) => text ? <a href={text} target="_blank" rel="noopener noreferrer">{text}</a> : '---',
        },
        {
            title: 'Trạng thái hội viên',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (text) => <StatusTag status={text}>{text}</StatusTag>,
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 150,
            render: (text, record) => (
                <Space size="middle" className="action-buttons">
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)}>
                        Xóa
                    </Button>
                    <Button type="link" icon={<HistoryOutlined />} onClick={() => handleHistory(record)}>
                        Lịch sử
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={members}
                pagination={{ pageSize: 20 }}
                rowKey="key"
                rowClassName="hover-row"
            />

            {/* Modal thêm/sửa hội viên tập thể */}
            <AddCollectiveMemberModal
                visible={isAddModalVisible}
                onClose={() => {
                    setIsAddModalVisible(false);
                    setSelectedMember(null);
                }}
                onAddMember={(member) => {
                    onEditMember(member, selectedMember);
                    setIsAddModalVisible(false);
                    setSelectedMember(null);
                }}
                memberData={selectedMember}
            />

            {/* Modal xem lịch sử */}
            <HistoryModal
                visible={isHistoryModalVisible}
                onClose={() => setIsHistoryModalVisible(false)}
                historyData={selectedHistory}
            />
        </>
    );
};

export default CollectiveMemberList;
