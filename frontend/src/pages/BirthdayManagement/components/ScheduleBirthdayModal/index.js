// ScheduleBirthdayModal.js
import React from 'react';
import { Modal, Form, Input, DatePicker, Select, TimePicker } from 'antd';
import moment from 'moment';

const ScheduleBirthdayModal = ({ visible, onCancel, onSchedule, birthday }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                // Thêm ngày sinh nhật vào giá trị
                const scheduledDateTime = moment(birthday)
                    .set({ hour: values.scheduleTime.hour(), minute: values.scheduleTime.minute() });
                onSchedule({ ...values, scheduledDateTime: scheduledDateTime.format() });
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Đặt lịch chúc mừng sinh nhật"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="congratulatoryMethod"
                    label="Hình thức"
                    rules={[{ required: true, message: 'Vui lòng chọn hình thức chúc mừng!' }]}
                >
                    <Select placeholder="Chọn hình thức chúc mừng">
                        <Select.Option value="email">Gửi qua Email</Select.Option>
                        <Select.Option value="phone">Gửi qua Số Điện Thoại</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="message"
                    label="Mẫu tin nhắn"
                    rules={[{ required: true, message: 'Vui lòng nhập mẫu tin nhắn!' }]}
                >
                    <Input.TextArea placeholder="Nhập mẫu tin nhắn" />
                </Form.Item>
                <Form.Item
                    name="scheduleTime"
                    label="Hẹn giờ"
                    rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
                >
                    {birthday}
                    <TimePicker
                        defaultValue={moment('12:00', 'HH:mm')}
                        format="HH:mm"
                        placeholder="Chọn thời gian"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ScheduleBirthdayModal;
