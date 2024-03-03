import React, { useRef, useState } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import { Button, Descriptions,Input, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';

import './Transactions.css';

const Transactions = () => {
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      key: 'doctor',
      width: '20%',
      ...getColumnSearchProps('doctor'),
    },
    {
      title: ' Appointment Number',
      dataIndex: 'number',
      key: 'number',
      width: '20%',
      ...getColumnSearchProps('number'),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
      ...getColumnSearchProps('date'),
      
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      width: '20%',
      ...getColumnSearchProps('time'),
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        width: '20%',
        ...getColumnSearchProps('amount'),
      },
  ];
    return (
        <>
            <AdminLayout >
            <Table columns={columns} dataSource={data} scroll={{ y: 320 }} />
            </AdminLayout>
        </>
    )
}
export default Transactions;

const data = [
    {
      key: '1',
      name: 'John Brown',
      doctor: 'Jonh',
      number: 1,
      date: '01-01-2024',
      time:'09:00 AM',
      amount:'500',
    },
    {
      key: '2',
      name: 'Joe Black',
      doctor: 'Jonh',
      number: 2,
      date: '01-01-2024',
      time:'09:00 AM',
      amount:'500',
    },
    {
      key: '3',
      name: 'Jim Green',
      doctor: 'Jonh',
      number: 3,
      date: '01-01-2024',
      time:'09:00 AM',
      amount:'500',
    },
    {
      key: '4',
      name: 'Jim Red',
      doctor: 'Jonh',
      number: 4,
      date: '01-01-2024',
      time:'09:00 AM',
      amount:'500',
    },
    {
      key: '4',
      name: 'Jim Red',
      doctor: 'Jonh',
      number: 4,
      date: '01-01-2024',
      time:'09:00 AM',
      amount:'500',
    },
    {
      key: '4',
      name: 'Jim Red',
      doctor: 'Jonh',
      number: 4,
      date: '01-01-2024',
      time:'09:00 AM',
      amount:'500',
    },
    {
      key: '4',
      name: 'Jim Red',
      doctor: 'Jonh',
      number: 4,
      date: '01-01-2024',
      time:'09:00 AM',
      amount:'500',
    },
    {
      key: '4',
      name: 'Jim Red',
      doctor: 'Jonh',
      number: 4,
      date: '01-01-2024',
      time:'09:00 AM',
      amount:'500',
    },
    
  ];