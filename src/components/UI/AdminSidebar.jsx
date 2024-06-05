import React, { useState } from 'react';
import { ConfigProvider, Menu } from 'antd';
import {
  HomeOutlined,
  OrderedListOutlined,
  UserSwitchOutlined,
  UserOutlined,
  StarOutlined,
  TransactionOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'blue',
          
          colorBgContainer: 'transparent',
          colorText: 'white',
          
        },
      }}
    >
      <div   className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
            >
              <Menu.Item key="/admin/dashboard" icon={<HomeOutlined />}>
                <Link to={'/admin/dashboard'}>Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="/admin/appointments" icon={<OrderedListOutlined />}>
                <Link to={'/admin/appointments'}>Appointments</Link>
              </Menu.Item>
              <Menu.Item key="/admin/undoctors" icon={<UserSwitchOutlined />}>
                <Link to={'/admin/undoctors'}>Unverified Doctors</Link>
              </Menu.Item>
              <Menu.Item key="/admin/doctors" icon={<UserSwitchOutlined />}>
                <Link to={'/admin/doctors'}>Doctors</Link>
              </Menu.Item>
              <Menu.Item key="/admin/patients" icon={<UserOutlined />}>
                <Link to={'/admin/patients'}>Patients</Link>
              </Menu.Item>
              <Menu.Item key="/admin/reviews" icon={<StarOutlined />}>
                <Link to={'/admin/reviews'}>Reviews</Link>
              </Menu.Item>
              <Menu.Item key="/admin/transaction" icon={<TransactionOutlined />}>
                <Link to={'/admin/transaction'}>Transactions</Link>
              </Menu.Item>
              <Menu.Item key="/admin/profile" icon={<ProfileOutlined />}>
                <Link to={'/admin/profile'}>Profile</Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AdminSidebar;
