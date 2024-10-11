// src/components/MemberList.js
import React, {useState} from 'react';
import {Table, Button, Space, Modal, Typography} from 'antd';
import AddMemberModal from "./AddMemberModal";
import HistoryModal from "./HistoryModal";

const { Text } = Typography;

const MemberList = ({ members }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const handleEdit = (record) => {
        setSelectedMember(record); // Set thông tin hội viên cần sửa
        setIsModalVisible(true); // Hiển thị modal
    };

    const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState([]);

    const handleHistory = (record) => {
        // Giả lập dữ liệu lịch sử (thực tế sẽ lấy từ API hoặc cơ sở dữ liệu)
        const history = [
            {
                timestamp: '2024-10-10 14:32:21',
                account: 'nguyenvanA',
                actionLog: 'Thêm mới hội viên',
            },
            {
                timestamp: '2024-10-11 09:15:05',
                account: 'lethib',
                actionLog: 'Chỉnh sửa thông tin hội viên',
            },
        ];

        setSelectedHistory(history); // Set lịch sử bản ghi
        setIsHistoryModalVisible(true); // Hiển thị modal lịch sử
    };

    const handleAddMember = (newMember) => {
        // Thêm hoặc sửa hội viên
        if (selectedMember) {
            // Logic để sửa hội viên
        } else {
            // Logic để thêm hội viên mới
        }
        setIsModalVisible(false);
        setSelectedMember(null);
    };

    const handleDelete = (record) => {
        setSelectedMember(record); // Set hội viên cần xóa
        showDeleteConfirm(record); // Hiển thị modal xác nhận
    };

    const onDeleteMember = () => {

    }

    const showDeleteConfirm = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: (
                <>
                    Bạn có chắc chắn muốn xóa hội viên <Text strong>{record.name}</Text> không?
                </>
            ),
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onDeleteMember(record); // Gọi hàm xóa hội viên từ props
            },
        });
    };

    const columns = [
        {
            title: 'Số thứ tự',
            dataIndex: 'index',
            render: (text, record, index) => index + 1,
            width: 70,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthDate',
            render: (text) => new Date(text).toLocaleDateString(),
            width: 100,
        },
        {
            title: 'Ngày gia nhập',
            dataIndex: 'joinDate',
            render: (text) => new Date(text).toLocaleDateString(),
            width: 100,
        },
        {
            title: 'Địa chỉ email',
            dataIndex: 'email',
            width: 200,
        },
        {
            title: 'Chức danh',
            dataIndex: 'position',
            width: 150,
        },
        {
            title: 'Đơn vị công tác',
            dataIndex: 'unit',
            width: 200,
        },
        {
            title: 'Thời hạn đóng phí',
            dataIndex: 'dueDate',
            width: 100,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 100,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
                    <Button type="link" danger onClick={() => handleDelete(record)}>Xóa</Button>
                    <Button type="link" onClick={() => handleHistory(record)}>Lịch sử</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={members}
                pagination={{ pageSize: 10 }}
                rowKey={(record) => record.email}
                rowClassName="hover-row"
            />
            <AddMemberModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onAddMember={handleAddMember}
                memberData={selectedMember} // Truyền dữ liệu hội viên cần sửa vào modal
            />
            {/* Hiển thị modal lịch sử */}
            <HistoryModal
                visible={isHistoryModalVisible}
                onClose={() => setIsHistoryModalVisible(false)}
                historyData={selectedHistory}
            />
        </>
    );
};

export default MemberList;
