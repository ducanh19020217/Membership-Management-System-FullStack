// src/components/AddExcelModal.js
import React, { useState } from 'react';
import { Modal, Upload, Button, message } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Dragger } = Upload;

// Styled Components for Modal
const StyledModal = styled(Modal)`
    .ant-modal-header {
        background-color: #D3F7FF;
        color: #08B7DD;
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

    .ant-modal-body {
        padding: 20px;
    }
`;

const AddExcelModal = ({ visible, onClose }) => {
    const [fileList, setFileList] = useState([]);

    const beforeUpload = (file) => {
        const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isExcel) {
            message.error('Bạn chỉ có thể tải lên tệp Excel (.xlsx)!');
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('File phải nhỏ hơn 10MB!');
        }
        return isExcel && isLt10M;
    };

    const handleUpload = ({ file, onSuccess, onError }) => {
        // Giả lập quá trình upload, thay bằng API thực tế
        setTimeout(() => {
            if (file.name.endsWith('.xlsx')) {
                onSuccess("File uploaded successfully");
                message.success(`${file.name} đã được tải lên thành công.`);
            } else {
                onError(new Error("Invalid file type"));
                message.error(`${file.name} không hợp lệ.`);
            }
        }, 1000);
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <StyledModal
            title="Thêm hội viên tập thể từ file Excel"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={600}
        >
            <Dragger
                name="file"
                multiple
                customRequest={handleUpload}
                beforeUpload={beforeUpload}
                fileList={fileList}
                onChange={handleChange}
                accept=".xlsx"
                style={{ padding: '20px' }}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ fontSize: '48px', color: '#08B7DD' }} />
                </p>
                <p className="ant-upload-text">Kéo thả file Excel vào đây để tải lên</p>
                <p className="ant-upload-hint">Hoặc nhấn để chọn file từ máy tính</p>
            </Dragger>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <Button type="primary" onClick={onClose}>
                    Đóng
                </Button>
            </div>
        </StyledModal>
    );
};

export default AddExcelModal;
