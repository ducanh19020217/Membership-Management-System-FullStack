// src/pages/IndividualMembers.js
import React, { useState } from 'react';
import {Layout, Button, notification, Row, Col, Space, Select, Input} from 'antd';
import SearchFilter from './components/SearchFilter';
import MemberList from './components/MemberList';
import AddMemberModal from "./components/AddMemberModal";
import AddMemberButton from "./components/AddMemberButton";
import AddExcelModal from "./components/AddExcelModal";
import ExportRecordsModal from "./components/ExportRecordModal";

const { Header, Content } = Layout;
const { Option } = Select;

const IndividualMembers = () => {
    const [members, setMembers] = useState([
        { name: 'Nguyễn Văn A', birthDate: '1990-01-01', joinDate: '2021-01-01', email: 'vana@example.com', position: 'Giám đốc', unit: 'Công ty A', dueDate: '30 ngày', status: 'active' },
        { name: 'Trần Thị B', birthDate: '1992-02-02', joinDate: '2021-02-01', email: 'thib@example.com', position: 'Nhân viên', unit: 'Công ty B', dueDate: '15 ngày', status: 'suspended' },
        { name: 'Nguyễn Văn A', birthDate: '1990-01-01', joinDate: '2021-01-01', email: 'vana@example.com', position: 'Giám đốc', unit: 'Công ty A', dueDate: '30 ngày', status: 'active' },
        { name: 'Trần Thị B', birthDate: '1992-02-02', joinDate: '2021-02-01', email: 'thib@example.com', position: 'Nhân viên', unit: 'Công ty B', dueDate: '15 ngày', status: 'suspended' },
        { name: 'Nguyễn Văn A', birthDate: '1990-01-01', joinDate: '2021-01-01', email: 'vana@example.com', position: 'Giám đốc', unit: 'Công ty A', dueDate: '30 ngày', status: 'active' },
        { name: 'Trần Thị B', birthDate: '1992-02-02', joinDate: '2021-02-01', email: 'thib@example.com', position: 'Nhân viên', unit: 'Công ty B', dueDate: '15 ngày', status: 'suspended' },
        { name: 'Nguyễn Văn A', birthDate: '1990-01-01', joinDate: '2021-01-01', email: 'vana@example.com', position: 'Giám đốc', unit: 'Công ty A', dueDate: '30 ngày', status: 'active' },
        { name: 'Trần Thị B', birthDate: '1992-02-02', joinDate: '2021-02-01', email: 'thib@example.com', position: 'Nhân viên', unit: 'Công ty B', dueDate: '15 ngày', status: 'suspended' },
        { name: 'Nguyễn Văn A', birthDate: '1990-01-01', joinDate: '2021-01-01', email: 'vana@example.com', position: 'Giám đốc', unit: 'Công ty A', dueDate: '30 ngày', status: 'active' },
        { name: 'Trần Thị B', birthDate: '1992-02-02', joinDate: '2021-02-01', email: 'thib@example.com', position: 'Nhân viên', unit: 'Công ty B', dueDate: '15 ngày', status: 'suspended' },
        { name: 'Nguyễn Văn A', birthDate: '1990-01-01', joinDate: '2021-01-01', email: 'vana@example.com', position: 'Giám đốc', unit: 'Công ty A', dueDate: '30 ngày', status: 'active' },
        { name: 'Trần Thị B', birthDate: '1992-02-02', joinDate: '2021-02-01', email: 'thib@example.com', position: 'Nhân viên', unit: 'Công ty B', dueDate: '15 ngày', status: 'suspended' },
        { name: 'Nguyễn Văn A', birthDate: '1990-01-01', joinDate: '2021-01-01', email: 'vana@example.com', position: 'Giám đốc', unit: 'Công ty A', dueDate: '30 ngày', status: 'active' },
        { name: 'Trần Thị B', birthDate: '1992-02-02', joinDate: '2021-02-01', email: 'thib@example.com', position: 'Nhân viên', unit: 'Công ty B', dueDate: '15 ngày', status: 'suspended' },
        // ... thêm nhiều hội viên khác
    ]);
    const [filteredMembers, setFilteredMembers] = useState(members);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalImport, setIsModalImport] = useState(false);
    const [isExportModalVisible, setIsExportModalVisible] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const handleImportFromExcel = (data) => {
        setIsModalImport(true);
    };



    const handleSearch = (searchText) => {
        // const lowercasedFilter = searchText.toLowerCase();
        // const filteredData = members.filter(member =>
        //     member.name.toLowerCase().includes(lowercasedFilter) ||
        //     member.email.toLowerCase().includes(lowercasedFilter)
        // );
        // setFilteredMembers(filteredData);
    };

    const handleFilter = (status) => {
        if (status) {
            const filteredData = members.filter(member => member.status === status);
            setFilteredMembers(filteredData);
        } else {
            setFilteredMembers(members);
        }
    };

    const handleAddMember = (newMember) => {
        setMembers((prevMembers) => [...prevMembers, { ...newMember, status: 'active' }]);
        notification.success({ message: 'Thêm hội viên thành công!' });
    };

    const handleExport = () => {

    }

    return (
        <Content style={{ padding: '20px' }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                <Col>
                    <div style={{marginBottom: '20px'}}>
                        <Input
                            placeholder="Tìm kiếm theo tên hoặc email"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{width: '300px', marginRight: '10px'}}
                        />
                        <Select
                            placeholder="Lọc theo trạng thái"
                            onChange={handleFilter}
                            style={{width: '200px', marginRight: '10px'}}
                        >
                            <Option value="">Tất cả</Option>
                            <Option value="active">Đang hoạt động</Option>
                            <Option value="suspended">Tạm ngưng</Option>
                            <Option value="inactive">Đã ngừng</Option>
                        </Select>
                        <Button type="primary" onClick={handleSearch} style={{marginRight: '10px'}}>Tìm kiếm</Button>
                        <Button type="primary" onClick={()=>{setIsExportModalVisible(true)}}>Export</Button>
                    </div>
                </Col>
                <Col>

                    <AddMemberButton
                        onAddSingleMember={() => setIsModalVisible(true)}
                        onAddFromExcel={handleImportFromExcel}
                    />

                </Col>
            </Row>
            <MemberList members={filteredMembers}/>
            <AddMemberModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onAddMember={handleAddMember}
            />
            <AddExcelModal
                visible={isModalImport}
                onClose={() => {
                    setIsModalImport(false)
                }}
            />
            <ExportRecordsModal
                visible={isExportModalVisible}
                onClose={() => setIsExportModalVisible(false)}
                selectedRecordsCount={100}
                onExport={handleExport}
            />
        </Content>
    );
};

export default IndividualMembers;
