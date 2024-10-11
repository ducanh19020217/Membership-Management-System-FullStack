// src/components/HistoryModal.js
import React from 'react';
import { Modal, Table, Button, Typography } from 'antd';
import styled from 'styled-components';
import moment from "moment";

const { Text } = Typography;

// Styled Components for modal header
const StyledHeader = styled.div`
    background-color: #D3F7FF;
    color: #08B7DD;
    padding: 16px;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// Styled Components for Modal
const StyledModal = styled(Modal)`
    .ant-modal-header {
        padding: 0;
    }

    .ant-modal-title {
        font-size: 18px;
        font-weight: bold;
    }

    .ant-modal-close-x {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ant-modal-content {
        padding: 0;
    }

    .ant-modal-body {
        padding: 20px;
    }
`;

const HistoryModal = ({ visible, onClose, historyData }) => {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            width: 50,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Ngày giờ xử lý',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (text) => moment(text).format('DD/MM/YYYY HH:mm:ss'),
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
            footer={[
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
            centered
            width={800}
        >
            <Table
                columns={columns}
                dataSource={historyData}
                rowKey="key"
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
                }}
            />
        </StyledModal>
    );
};

export default HistoryModal;
