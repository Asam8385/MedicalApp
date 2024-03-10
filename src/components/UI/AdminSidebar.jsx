import React , {useLayoutEffect, useState } from 'react';
import './AdminSidebar.css';
import { FaHome } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { Link ,useLocation } from 'react-router-dom';
import { Menu } from "antd"

const AdminSidebar = () => {
    const [selectedKey, setSelectedKey] = useState()

    const location = useLocation()

    useLayoutEffect(() => {
        const path = location.pathname.split('/')[1]
        setSelectedKey(path)
        console.log(selectedKey)
    }, [location])
    
    return (
        <><Menu
            mode="inline"
            defaultSelectedKeys={['']}
            defaultOpenKeys={['sub1']}
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => setSelectedKey(key)}
            style={{
                height: '100%',
                borderRight: 0,
                backgroundColor: "#1b5a90", // Background color of the sidebar
                color: 'white', // Foreground (text) color of the menu items
            }}
        >
            <Menu.Item key="" icon={<FaHome />} style={selectedKey === '' ? { backgroundColor: '#f0f2f5', color: '#1890ff' } : null}>
                <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="appointement" icon={<FaListUl />} style={selectedKey === 'appointement' ? { backgroundColor: '#f0f2f5', color: '#1890ff' } : null}>
                <Link to="/admin/appointments">Appointment</Link>
            </Menu.Item>
            <Menu.Item key="doctor" icon={ <FaUserAstronaut />} style={selectedKey === 'doctor' ? { backgroundColor: '#f0f2f5', color: '#1890ff' } : null}>
                <Link to="/admin/doctors">Doctor</Link>
            </Menu.Item>
            <Menu.Item key="patients" icon={<FaRegUser />}  style={selectedKey === 'patients' ? { backgroundColor: '#f0f2f5', color: '#1890ff' } : null}>
                <Link to="/admin/patients">Patients</Link>
            </Menu.Item>
            <Menu.Item key="reviews" icon={<FaRegStar />} style={selectedKey === 'reviews' ? { backgroundColor: '#f0f2f5', color: '#1890ff' } : null}>
                <Link to="/admin/reviews">Reviews</Link>
            </Menu.Item>
            <Menu.Item key="transaction" icon={<FaBriefcase />} style={selectedKey === 'transaction' ? { backgroundColor: '#f0f2f5', color: '#1890ff' } : null}>
                <Link to="/admin/transaction">Transaction</Link>
            </Menu.Item>
            <Menu.Item key="profile" icon={<FaRegUser />} style={selectedKey === 'profile' ? { backgroundColor: '#f0f2f5', color: '#1890ff' } : null}>
                <Link to="/admin/profile">Profile</Link>
            </Menu.Item>
        </Menu></>
    )
}

export default AdminSidebar