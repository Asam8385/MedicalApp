import React from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import PatientProfileSetting from './PatientProfileSetting';
import DoctorProfileSetting from './DoctorProfileSetting';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';

const ProfileSetting = (props) => {
    const  {role, ...otherData}  = useAuthCheck();
    console.log(role)
    return (
        <DashboardLayout>
            {role === 'patient' ? <PatientProfileSetting /> : <DoctorProfileSetting/>}
        </DashboardLayout>
    )
}
export default ProfileSetting;