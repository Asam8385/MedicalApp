import React from 'react'
import AdminSidebar from '../../UI/AdminSidebar'
import AdminHeader from '../../UI/AdminHeader'
import './AdminLayout.css';
import { Navigate,  Outlet, useNavigate } from 'react-router-dom'
import { Avatar, Button, Dropdown,  Image,Layout, Space, theme } from 'antd'

const { Header, Content, Sider, Footer } = Layout

const AdminLayout = ({ children }) => {
    
    const {
        token: { colorBgContainer },
      } = theme.useToken()
    return (
        <><Layout style={{
            height: '100svh',
            overflow: 'hidden'
        }}>
            <Header>
            <AdminHeader />
            </Header>
            <Layout>
                <Sider
                    className='main-sider'
                    breakpoint='md'
                    collapsedWidth={60}
                    width={200}
                    style={{
                        background: "#1b5a90",
                        padding: '2rem 0',
                        marginTop: 8,
                        marginBottom: 8
                    }}
                >
                    <AdminSidebar />
                </Sider>
                <Content
                    style={{
                        padding: 24,
                        margin: 8,
                        minHeight: 280,
                        background: colorBgContainer,
                        overflow: 'auto'
                    }}
                >
                    {children}
                </Content>
            </Layout>
            <Footer style={{
                textAlign: 'center',
                background: colorBgContainer,
                height: '2rem',
                padding: '0.5rem'
            }}>AFHR Technologies &copy; 2024</Footer>
        </Layout>
        
            </>
    )
}

export default AdminLayout