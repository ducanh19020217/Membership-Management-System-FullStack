// src/components/HistoryModal.js
import React from 'react';
import { Modal, Table } from 'antd';
import styled from "styled-components";

// Styled component for modal header
const StyledHeader = styled.div`
    background-color: #D3F7FF;
    color: #08B7DD;
    padding: 16px;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center; // Align content vertically in the center
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    
`;

// Styled component for customizing the modal's close button
const StyledModal = styled(Modal)`
    .ant-modal-content {
        padding: 0 !important;
    }
    .ant-modal-body {
        padding: 16px;
    }
`;

const HistoryModal = ({ visible, onClose, historyData }) => {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 70,
        },
        {
            title: 'Ngày giờ xử lý',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
        {
            title: 'Tài khoản thao tác',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: 'Nhật ký xử lý',
            dataIndex: 'actionLog',
            key: 'actionLog',
        },
    ];

    return (
        <StyledModal
            title={<StyledHeader>Lịch sử xử lý</StyledHeader>}
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <Table
                columns={columns}
                dataSource={historyData}
                rowKey={(record) => record.timestamp}
                pagination={{
                    pageSize: 5, // Hiển thị 5 dòng mỗi trang
                    showSizeChanger: true, // Cho phép người dùng chọn số dòng mỗi trang
                    pageSizeOptions: ['5', '10', '20'], // Tùy chọn số lượng dòng mỗi trang
                }}
            />
        </StyledModal>
    );
};

export default HistoryModal;
