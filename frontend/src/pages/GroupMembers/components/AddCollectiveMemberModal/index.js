// src/components/AddCollectiveMemberModal.js
import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select, Upload, Radio, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';

const { Option } = Select;

// Styled Components
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

  .ant-form-item {
    margin-bottom: 12px;
  }
`;

const AddCollectiveMemberModal = ({ visible, onClose, onAddMember, memberData }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (memberData) {
            form.setFieldsValue({
                ...memberData,
                joinDate: moment(memberData.joinDate),
            });
        } else {
            form.resetFields();
        }
    }, [memberData, form]);

    const handleFinish = (values) => {
        const newMember = {
            ...values,
            joinDate: values.joinDate.format('YYYY-MM-DD'),
        };
        onAddMember(newMember);
        form.resetFields();
    };

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

    return (
        <StyledModal
            title="Thêm mới hội viên tập thể"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                {/* Tên công ty */}
                <Form.Item
                    label="Tên công ty"
                    name="companyName"
                    rules={[{ required: true, message: 'Tên công ty không được để trống!' }]}
                >
                    <Input placeholder="Nhập tên đầy đủ của công ty" />
                </Form.Item>

                {/* Địa chỉ */}
                <Form.Item
                    label="Địa chỉ trụ sở chính"
                    name="address"
                    rules={[{ required: true, message: 'Địa chỉ trụ sở chính không được để trống!' }]}
                >
                    <Input placeholder="Nhập địa chỉ trụ sở chính của công ty" />
                </Form.Item>

                {/* Ngày gia nhập */}
                <Form.Item
                    label="Ngày gia nhập"
                    name="joinDate"
                    rules={[
                        { required: true, message: 'Vui lòng chọn ngày gia nhập!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || value.isBefore(moment())) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Ngày gia nhập không được lớn hơn ngày hiện tại.');
                            },
                        }),
                    ]}
                >
                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>

                {/* Lĩnh vực hoạt động */}
                <Form.Item
                    label="Lĩnh vực hoạt động"
                    name="field"
                    rules={[{ required: true, message: 'Vui lòng nhập lĩnh vực hoạt động!' }]}
                >
                    <Input placeholder="Nhập ngành nghề hoặc lĩnh vực kinh doanh chính của công ty" />
                </Form.Item>

                {/* Email liên hệ */}
                <Form.Item
                    label="Email liên hệ"
                    name="contactEmail"
                    rules={[
                        { required: true, message: 'Vui lòng nhập địa chỉ email liên hệ!' },
                        { type: 'email', message: 'Địa chỉ email không hợp lệ!' },
                    ]}
                >
                    <Input placeholder="Nhập địa chỉ email liên hệ của công ty" />
                </Form.Item>

                {/* Số điện thoại liên hệ */}
                <Form.Item
                    label="Số điện thoại liên hệ"
                    name="contactPhone"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại liên hệ!' },
                        { pattern: /^[0-9]{10,15}$/, message: 'Số điện thoại không hợp lệ!' },
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại liên hệ của công ty" />
                </Form.Item>

                {/* Website */}
                <Form.Item
                    label="Website"
                    name="website"
                    rules={[{ type: 'url', message: 'Địa chỉ website không hợp lệ!' }]}
                >
                    <Input placeholder="Nhập địa chỉ website chính thức của công ty (nếu có)" />
                </Form.Item>

                {/* Trạng thái hội viên */}
                <Form.Item
                    label="Trạng thái hội viên"
                    name="status"
                    initialValue="Đang hoạt động"
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái hội viên!' }]}
                >
                    <Select>
                        <Option value="Đang hoạt động">Đang hoạt động</Option>
                        <Option value="Tạm ngưng">Tạm ngưng</Option>
                        <Option value="Đã ngừng">Đã ngừng</Option>
                    </Select>
                </Form.Item>

                {/* Nút thao tác */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>
                        {memberData ? 'Lưu thay đổi' : 'Thêm mới'}
                    </Button>
                    <Button style={{ marginLeft: '10px' }} onClick={onClose}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </StyledModal>
    );
};

export default AddCollectiveMemberModal;
