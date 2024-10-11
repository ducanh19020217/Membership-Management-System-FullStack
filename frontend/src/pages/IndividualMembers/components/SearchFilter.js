// src/components/SearchFilter.js
import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';

const { Option } = Select;

const SearchFilter = ({ onSearch, onFilter }) => {
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };

    const handleFilter = (value) => {
        setFilterStatus(value);
        onFilter(value);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <Input
                placeholder="Tìm kiếm theo tên hoặc email"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: '300px', marginRight: '10px' }}
            />
            <Select
                placeholder="Lọc theo trạng thái"
                onChange={handleFilter}
                style={{ width: '200px', marginRight: '10px' }}
            >
                <Option value="">Tất cả</Option>
                <Option value="active">Đang hoạt động</Option>
                <Option value="suspended">Tạm ngưng</Option>
                <Option value="inactive">Đã ngừng</Option>
            </Select>
            <Button type="primary" onClick={handleSearch} style={{ marginRight: '10px'}}>Tìm kiếm</Button>
            <Button type="primary" onClick={handleSearch}>Export</Button>
        </div>
    );
};

export default SearchFilter;
