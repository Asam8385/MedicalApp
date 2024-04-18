import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import './Doctors.css';
import VerifyDoctorAdmin from './SearchDoctor/Doctorverify';

const UnverifiedDoctors = () => {
    return (
        <>
            <AdminLayout >
               <VerifyDoctorAdmin/>
            </AdminLayout>
        </>
    )
}
export default UnverifiedDoctors;