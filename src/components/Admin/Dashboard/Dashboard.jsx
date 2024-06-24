import React from 'react';
import {Card, Col, Progress, Row, Table, Avatar, Switch } from 'antd';
import AdminLayout from '../AdminLayout/AdminLayout';
import userImg from '../../../images/avatar.jpg';
import { useCountingQuery } from '../../../redux/api/authApi';
import { ConfigProvider } from 'antd';
import { SettingFilled } from '@ant-design/icons';

const AdminDashboard = () => {
    const { data, isError, error } = useCountingQuery();
    console.log(data)

    const doctorColumns = [
        {
            title: 'Doctor Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => `${record.firstName} ${record.lastName}`
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation'
        }
    ];

    const patientColumns = [
        {
            title: 'Patient Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span>
                    <Avatar src={record?.img} style={{ marginRight: 8 }} />
                    {record?.firstName}
                </span>
            )
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (text, record) => `${record?.mobile}`
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
            render: (text, record) => `${record?.email}`

        },
      
    ];

  

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'rgb(27, 90, 144)',
                    colorTextHeading: '#fff',
             
                },
                components: {
                    Table: {
                        colorHeaderText: '#fff',
                        headerBg : '#000',
                        rowHoverBg :  '#e6f4ff',
                    },
                    Card: {
                        colorBgContainer: '#f0f2f5',
                    },
                },
            }}
        >
            <AdminLayout>
            <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Card.Meta
                                avatar={<SettingFilled />}
                                title={<h3 style={{color:'black'}}>{data?.docCount}</h3>}
                                description="Doctors"
                            />
                            <Progress percent={50} size="small" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Card.Meta
                                avatar={<SettingFilled />}
                                title={<h3 style={{color:'black'}}>{data?.patientCount}</h3>}
                                description="Patients"
                            />
                            <Progress percent={50} size="small" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Card.Meta
                                avatar={<SettingFilled />}
                                title={<h3 style={{color:'black'}}>{data?.appointmentCount}</h3>}
                                description="Appointments"
                            />
                            <Progress percent={50} size="small" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Card.Meta
                                avatar={<SettingFilled />}
                                title={<h3 style={{color:'black'}}>$62523</h3>}
                                description="Revenue"
                            />
                            <Progress percent={50} size="small" />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginTop: 24 }}>
                    <Col span={24}>
                        <h3>Doctors List</h3>
                        <Table
                            columns={doctorColumns}
                            dataSource={data?.doctors}
                            pagination={false}
                            rowKey={(record) => record.id}
                        />
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginTop: 24 }}>
                    <Col span={24}>
                        <h3>Patients List</h3>
                        <Table
                            columns={patientColumns}
                            dataSource={data?.patients}
                            pagination={false}
                            rowKey={(record) => record.id}
                        />
                    </Col>
                </Row>
            </AdminLayout>
        </ConfigProvider>
    );
};

export default AdminDashboard;
