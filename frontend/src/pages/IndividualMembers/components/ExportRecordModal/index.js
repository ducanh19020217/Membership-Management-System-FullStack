import React from 'react';
import { Modal, Button } from 'antd';

const ExportRecordsModal = ({ visible, onClose, selectedRecordsCount, onExport }) => {
    return (
        <Modal
            title="Xác nhận xuất dữ liệu"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <p>Bạn có chắc chắn muốn xuất <strong>{selectedRecordsCount}</strong> bản ghi không?</p>

            <div style={{ textAlign: 'right' }}>
                <Button onClick={onClose} style={{ marginRight: '10px' }}>
                    Hủy
                </Button>
                <Button type="primary" onClick={onExport}>
                    Xuất dữ liệu
                </Button>
            </div>
        </Modal>
    );
};

export default ExportRecordsModal;
