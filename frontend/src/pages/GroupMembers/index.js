// src/pages/CollectiveMembers.js
import React, { useState, useEffect } from 'react';
import { Layout, Button, Popover, Menu, notification } from 'antd';
import { PlusOutlined, FileExcelOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import SearchFilter from './components/SearchFilter';
import CollectiveMemberList from './components/MemberList';
import AddCollectiveMemberModal from './components/AddCollectiveMemberModal';
import AddExcelModal from './components/AddExcelModal';
import moment from "moment";

const { Header, Content } = Layout;

// Styled Button for Import and Export
const StyledButton = styled(Button)`
    margin-right: 10px;
`;

const CollectiveMembers = () => {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isExcelModalVisible, setIsExcelModalVisible] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    // Giả lập dữ liệu hội viên tập thể, trong thực tế bạn sẽ lấy từ API
    useEffect(() => {
        const fetchData = async () => {
            // Thực hiện gọi API để lấy dữ liệu hội viên tập thể
            // Giả lập dữ liệu
            const data = [
                {
                    key: '1',
                    companyName: 'Công ty ABC',
                    address: '123 Đường A, Quận 1, TP.HCM',
                    joinDate: '2023-01-15',
                    field: 'Công nghệ',
                    contactEmail: 'contact@abc.com',
                    contactPhone: '0912345678',
                    website: 'https://www.abc.com',
                    status: 'Đang hoạt động',
                },
                {
                    key: '2',
                    companyName: 'Công ty XYZ',
                    address: '456 Đường B, Quận 2, TP.HCM',
                    joinDate: '2022-05-20',
                    field: 'Y tế',
                    contactEmail: 'contact@xyz.com',
                    contactPhone: '0987654321',
                    website: '',
                    status: 'Tạm ngưng',
                },
                // Thêm nhiều hội viên khác...
            ];
            setMembers(data);
            setFilteredMembers(data);
        };
        fetchData();
    }, []);

    const handleSearch = (searchText) => {
        const lowercasedFilter = searchText.toLowerCase();
        const filteredData = members.filter(member =>
            member.companyName.toLowerCase().includes(lowercasedFilter) ||
            member.address.toLowerCase().includes(lowercasedFilter) ||
            member.field.toLowerCase().includes(lowercasedFilter)
        );
        setFilteredMembers(filteredData);
    };

    const handleFilter = (filters) => {
        let filteredData = [...members];
        if (filters.status) {
            filteredData = filteredData.filter(member => member.status === filters.status);
        }
        if (filters.field) {
            filteredData = filteredData.filter(member => member.field === filters.field);
        }
        if (filters.date && filters.date.length === 2) {
            const [start, end] = filters.date;
            filteredData = filteredData.filter(member => {
                const joinDate = moment(member.joinDate);
                return joinDate.isBetween(moment(start, 'DD/MM/YYYY'), moment(end, 'DD/MM/YYYY'), null, '[]');
            });
        }
        setFilteredMembers(filteredData);
    };

    const handleAddMember = (newMember) => {
        // Giả lập thêm hội viên mới, trong thực tế bạn sẽ gọi API
        const updatedMembers = [
            ...members,
            {
                key: (members.length + 1).toString(),
                companyName: newMember.companyName,
                address: newMember.address,
                joinDate: newMember.joinDate,
                field: newMember.field,
                contactEmail: newMember.contactEmail,
                contactPhone: newMember.contactPhone,
                website: newMember.website,
                status: newMember.status,
            },
        ];
        setMembers(updatedMembers);
        setFilteredMembers(updatedMembers);
        notification.success({ message: 'Thêm hội viên tập thể thành công!' });
    };

    const handleEditMember = (updatedMember, originalMember) => {
        // Giả lập cập nhật hội viên, trong thực tế bạn sẽ gọi API
        const updatedMembers = members.map(member =>
            member.key === originalMember.key ? { ...member, ...updatedMember } : member
        );
        setMembers(updatedMembers);
        setFilteredMembers(updatedMembers);
        notification.success({ message: 'Cập nhật hội viên tập thể thành công!' });
    };

    const handleDeleteMember = (key) => {
        // Giả lập xóa hội viên, trong thực tế bạn sẽ gọi API
        const updatedMembers = members.filter(member => member.key !== key);
        setMembers(updatedMembers);
        setFilteredMembers(updatedMembers);
        notification.success({ message: 'Xóa hội viên tập thể thành công!' });
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<PlusOutlined />} onClick={() => setIsAddModalVisible(true)}>
                Thêm lẻ
            </Menu.Item>
            <Menu.Item key="2" icon={<FileExcelOutlined />} onClick={() => setIsExcelModalVisible(true)}>
                Thêm bằng file Excel
            </Menu.Item>
        </Menu>
    );

    return (
            <Content style={{ padding: '20px' }}>
                {/* Thanh tìm kiếm và bộ lọc */}
                <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

                {/* Nút thêm hội viên với Popover */}
                <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                    <Popover content={menu} trigger="click">
                        <Button type="primary" icon={<PlusOutlined />}>
                            Thêm hội viên
                        </Button>
                    </Popover>
                </div>

                {/* Bảng danh sách hội viên tập thể */}
                <CollectiveMemberList
                    members={filteredMembers}
                    onDeleteMember={handleDeleteMember}
                    onEditMember={handleEditMember}
                />

                {/* Modal thêm/sửa hội viên tập thể */}
                <AddCollectiveMemberModal
                    visible={isAddModalVisible}
                    onClose={() => setIsAddModalVisible(false)}
                    onAddMember={handleAddMember}
                    memberData={null} // Không có dữ liệu khi thêm mới
                />

                {/* Modal thêm bằng file Excel */}
                <AddExcelModal
                    visible={isExcelModalVisible}
                    onClose={() => setIsExcelModalVisible(false)}
                />
            </Content>
    );
};

export default CollectiveMembers;
