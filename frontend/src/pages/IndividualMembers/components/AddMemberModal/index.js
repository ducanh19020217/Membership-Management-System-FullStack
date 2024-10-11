import React, {useEffect, useState} from 'react';
import { Modal, Form, Input, Button, DatePicker, Select, Upload, message, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';

const { Option } = Select;

// Styled Components
const StyledModal = styled(Modal)`

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

const AddMemberModal = ({ visible, onClose, onAddMember }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if(!visible) form.resetFields()
    }, [visible]);

    const handleFinish = (values) => {
        const newMember = {
            ...values,
            birthDate: values.birthDate.format('YYYY-MM-DD'),
            joinDate: values.joinDate.format('YYYY-MM-DD'),
        };
        onAddMember(newMember);
        form.resetFields();
        onClose();
    };

    const beforeUpload = (file) => {
        const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isImage) {
            message.error('Bạn chỉ có thể tải lên tệp JPG/PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Hình ảnh phải nhỏ hơn 2MB!');
        }
        return isImage && isLt2M;
    };

    return (
        <StyledModal
            title="Thêm mới hội viên"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                {/* Ảnh đại diện */}
                <Form.Item label="Ảnh thẻ cá nhân" name="profilePicture">
                    <Upload
                        name="profilePicture"
                        listType="picture"
                        beforeUpload={beforeUpload}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                    </Upload>
                </Form.Item>

                {/* Họ và tên */}
                <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Họ và tên không được để trống' }]}
                >
                    <Input placeholder="Nhập họ và tên đầy đủ" />
                </Form.Item>

                {/* Giới tính */}
                <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                >
                    <Radio.Group>
                        <Radio value="Nam">Nam</Radio>
                        <Radio value="Nữ">Nữ</Radio>
                    </Radio.Group>
                </Form.Item>

                {/* Ngày sinh */}
                <Form.Item
                    label="Ngày sinh"
                    name="birthDate"
                    rules={[
                        { required: true, message: 'Vui lòng chọn ngày sinh' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || value.isBefore(moment())) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Ngày sinh không được lớn hơn ngày hiện tại.');
                            },
                        }),
                    ]}
                >
                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>

                {/* Quốc tịch */}
                <Form.Item
                    label="Quốc tịch"
                    name="nationality"
                    initialValue="Việt Nam"
                    rules={[{ required: true, message: 'Vui lòng chọn quốc tịch' }]}
                >
                    <Select>
                        <Option value="Việt Nam">Việt Nam</Option>
                        <Option value="Khác">Khác</Option>
                    </Select>
                </Form.Item>

                {/* Số căn cước công dân */}
                <Form.Item
                    label="Số căn cước công dân"
                    name="idNumber"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số căn cước công dân' },
                        { len: 12, message: 'Căn cước công dân phải đúng 12 ký tự' }
                    ]}
                >
                    <Input placeholder="Nhập số căn cước công dân" />
                </Form.Item>

                {/* Ảnh căn cước công dân (2 mặt) */}
                <Form.Item label="Ảnh căn cước công dân (2 mặt)" name="idPhotos">
                    <Upload
                        name="idPhotos"
                        listType="picture"
                        multiple
                        beforeUpload={beforeUpload}
                        maxCount={2}
                    >
                        <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                    </Upload>
                </Form.Item>

                {/* Số điện thoại */}
                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                        { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có 10 số' }
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                {/* Địa chỉ email */}
                <Form.Item
                    label="Địa chỉ email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập địa chỉ email' },
                        { type: 'email', message: 'Địa chỉ email không hợp lệ' }
                    ]}
                >
                    <Input placeholder="Nhập địa chỉ email" />
                </Form.Item>

                {/* Địa chỉ thường trú */}
                <Form.Item
                    label="Địa chỉ thường trú"
                    name="permanentAddress"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ thường trú' }]}
                >
                    <Input placeholder="Nhập địa chỉ thường trú" />
                </Form.Item>

                {/* Ngày gia nhập */}
                <Form.Item
                    label="Ngày gia nhập"
                    name="joinDate"
                    rules={[
                        { required: true, message: 'Vui lòng chọn ngày gia nhập' },
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

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm hội viên
                    </Button>
                    <Button style={{ marginLeft: '10px' }} onClick={onClose}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </StyledModal>
    );
};

export default AddMemberModal;
