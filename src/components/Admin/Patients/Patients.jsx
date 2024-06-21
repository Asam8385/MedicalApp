import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import './Patients.css';
import TrackAppointment from './TrackAppointment';

const Patients = () => {
    return (
        <>
            <AdminLayout >
               <TrackAppointment/>
            </AdminLayout>
        </>
    )
}
export default Patients;