import React, { useState } from 'react';
import { Modal, Upload, Button, notification } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const AddExcelModal = ({ visible, onClose }) => {
    const [fileList, setFileList] = useState([]);

    // Hàm kiểm tra file trước khi upload
    const beforeUpload = (file) => {
        const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const isLt10M = file.size / 1024 / 1024 < 10; // Kiểm tra file có nhỏ hơn 10MB không

        if (!isExcel) {
            notification.error({
                message: 'Tải file thất bại!',
                description: 'Chỉ chấp nhận các file Excel (.xlsx).',
            });
            return Upload.LIST_IGNORE; // Dừng upload nếu không phải file Excel
        }

        if (!isLt10M) {
            notification.error({
                message: 'Tải file thất bại!',
                description: 'File không được lớn hơn 10MB.',
            });
            return Upload.LIST_IGNORE; // Dừng upload nếu lớn hơn 10MB
        }

        return true; // Tiếp tục upload nếu hợp lệ
    };

    const handleUpload = ({ file, onSuccess, onError }) => {
        // Giả lập quá trình upload file, bạn có thể thay bằng API thực tế
        setTimeout(() => {
            if (file.name.endsWith('.xlsx')) {
                onSuccess("File uploaded successfully");
                notification.success({
                    message: 'Tải file thành công!',
                    description: `${file.name} đã được tải lên thành công.`,
                });
            } else {
                onError(new Error("Invalid file type"));
            }
        }, 1000);
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <Modal
            title="Thêm hội viên từ file Excel"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Dragger
                customRequest={handleUpload}
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                multiple // Cho phép upload nhiều file
                accept=".xlsx" // Chỉ chấp nhận file .xlsx
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
        </Modal>
    );
};

export default AddExcelModal;
