// src/components/SearchFilter.js
import React, { useState } from 'react';
import { Input, Select, DatePicker, Row, Col, Button } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const SearchFilter = ({ onSearch, onFilter }) => {
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterField, setFilterField] = useState('');
    const [filterDate, setFilterDate] = useState([]);

    const handleSearch = () => {
        onSearch(searchText);
    };

    const handleFilterStatus = (value) => {
        setFilterStatus(value);
        onFilter({ status: value, field: filterField, date: filterDate });
    };

    const handleFilterField = (value) => {
        setFilterField(value);
        onFilter({ status: filterStatus, field: value, date: filterDate });
    };

    const handleFilterDate = (dates, dateStrings) => {
        setFilterDate(dateStrings);
        onFilter({ status: filterStatus, field: filterField, date: dateStrings });
    };

    return (
        <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                <Input
                    placeholder="Tìm kiếm theo tên công ty, địa chỉ hoặc lĩnh vực"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    prefix={<SearchOutlined />}
                    allowClear
                    onPressEnter={handleSearch}
                />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                <Select
                    placeholder="Lọc theo trạng thái"
                    value={filterStatus}
                    onChange={handleFilterStatus}
                    style={{ width: '100%' }}
                    allowClear
                >
                    <Option value="Đang hoạt động">Đang hoạt động</Option>
                    <Option value="Tạm ngưng">Tạm ngưng</Option>
                    <Option value="Đã ngừng">Đã ngừng</Option>
                </Select>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                <Select
                    placeholder="Lọc theo lĩnh vực hoạt động"
                    value={filterField}
                    onChange={handleFilterField}
                    style={{ width: '100%' }}
                    allowClear
                >
                    <Option value="Công nghệ">Công nghệ</Option>
                    <Option value="Y tế">Y tế</Option>
                    <Option value="Giáo dục">Giáo dục</Option>
                    {/* Thêm các lựa chọn khác tùy theo nhu cầu */}
                </Select>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                <RangePicker
                    format="DD/MM/YYYY"
                    onChange={handleFilterDate}
                    style={{ width: '100%' }}
                    placeholder={['Ngày gia nhập từ', 'Đến']}
                />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} block>
                    Tìm kiếm
                </Button>
            </Col>
        </Row>
    );
};

export default SearchFilter;
