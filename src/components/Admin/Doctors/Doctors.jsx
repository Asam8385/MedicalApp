import React, { useState } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import './Doctors.css';
import doctorData from './doctorData';
import { Card,Flex,Input,Button, Modal} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card;

const Doctors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState(doctorData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = doctorData.filter(doctor =>
            doctor.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredDoctors(filtered);
    };

    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (
        <>
            <AdminLayout >
            <div className="container">
            <div className="filter">
                <Input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: 300 }}
                />
            </div>
            <br/>
            <br/>
            <Flex wrap="wrap" gap="middle" justify="center">
           
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} >
                        <Card
                            hoverable
                            style={{
                                width:300,
                                borderBlockColor:"Highlight",
                                borderBlockWidth: 4,
                                                                
                            }}
                            cover={
                                <img
                                    alt="profile"
                                    src = {doctor.avatar}
                                />
                            }
                            actions={[
                                <EditOutlined key="edit" />,
                                <DeleteOutlined  key="delete" onClick={showModal}/>,
                            ]}
                            >
                            <Meta
                                
                                title={doctor.name}
                                description={doctor.speciality}
                                
                                />
                        
                        </Card>
                        <Modal title="Remove doctor" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <p>Are you want to remove this doctor from this clinic?</p>
                        </Modal>
                        
                    </div>
                ))}
            
            </Flex>
        </div>
            </AdminLayout>
            
        </>
    )
}
export default Doctors;