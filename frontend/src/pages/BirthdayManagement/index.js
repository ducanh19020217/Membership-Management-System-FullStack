import React, {useState} from 'react';
import {Table, Button, Modal, Layout, Form, Select, DatePicker, Space} from 'antd';
import ScheduleBirthdayModal from "./components/ScheduleBirthdayModal";

const { Header, Content } = Layout;

const BirthdayManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentMember, setCurrentMember] = useState(null);

    const handleSchedule = (member) => {
        setCurrentMember(member);
        setIsModalVisible(true);
    };

    const handleScheduleSubmit = (values) => {
        console.log('Đặt lịch chúc mừng sinh nhật cho:', currentMember);
        console.log('Giá trị:', values);
        // Xử lý lưu lịch hẹn ở đây
        setIsModalVisible(false);
    };

    const [dataSource, setDataSource] = React.useState([
        // Mẫu dữ liệu, bạn có thể thay thế bằng dữ liệu thực từ API hoặc state
        {
            key: '1',
            member: 'Nguyễn Văn A',
            birthday: '2024-10-15',
            congratulatoryMethod: 'Gửi tin nhắn',
            message: 'Chúc mừng sinh nhật!',
            status: 'Chưa chúc mừng',
        },
        {
            key: '2',
            member: 'Trần Thị B',
            birthday: '2024-10-20',
            congratulatoryMethod: 'Tổ chức tiệc',
            message: 'Chúc bạn một ngày thật vui vẻ!',
            status: 'Đã chúc mừng',
        },
        // Thêm nhiều mẫu dữ liệu ở đây...
    ]);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            width: 50,
        },
        {
            title: 'Hội viên',
            dataIndex: 'member',
            width: 150,
        },
        {
            title: 'Ngày sinh nhật',
            dataIndex: 'birthday',
            width: 100,
        },
        {
            title: 'Hình thức chúc mừng',
            dataIndex: 'congratulatoryMethod',
            width: 150,
        },
        {
            title: 'Lời nhắn',
            dataIndex: 'message',
            width: 200,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 120,
            render: (text) => (
                <span style={{ color: text === 'Chưa chúc mừng' ? 'red' : 'green' }}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button type="link" onClick={() => handleSchedule(record.key)}>
                        Cấu hình
                    </Button>
                    <Button type="link">
                        Xem lịch sử
                    </Button>
                </Space>
            ),
        },
    ];


    return (
        <Content style={{ padding: '20px' }}>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
            {/* Modal Đặt lịch */}
            <ScheduleBirthdayModal
                visible={isModalVisible}
                onCancel={()=>{setIsModalVisible(false)}}
                onSchedule={handleScheduleSubmit}
                birthday={currentMember?.birthday} // Truyền ngày sinh nhật
            />
        </Content>
    );
};

export default BirthdayManagement;
