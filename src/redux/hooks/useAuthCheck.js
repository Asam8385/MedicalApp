import { useEffect, useState } from "react";
import { useGetDoctorQuery } from "../api/doctorApi";
import { useGetAdminQuery } from "../api/adminApi";
import { useGetPatientQuery } from "../api/patientApi";
import { getUserInfo } from '../../service/auth.service';

export default function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);
    const [userId, setUserId] = useState('');
    const [isSkip, setIsSkip] = useState(true);
    const [data, setData] = useState({});
    const [role, setRole] = useState("");
    const { data: doctorData, isError, isSuccess: dIsSuccess } = useGetDoctorQuery(userId, { skip: isSkip });
    const { data: patientData, isError: pIsError, isSuccess: pIsSuccess } = useGetPatientQuery(userId, { skip: isSkip });
    const { data: AdminData, isError: AIsError, isSuccess: AIsSuccess } = useGetAdminQuery(userId, { skip: isSkip });

    useEffect(() => {
        const localAuth = getUserInfo();
        
        if (localAuth && localAuth !== null) {
            if (localAuth.role === 'patient') {
                
                setUserId(localAuth?.userId)
                setIsSkip(false);
                setData(patientData)
                setRole(localAuth.role)
                setAuthChecked(pIsSuccess && !pIsError && !AIsError)
            } else if (localAuth.role === 'doctor') {
                setUserId(localAuth?.userId)
                setIsSkip(false);
                setData(doctorData)
                setRole(localAuth.role)
                setAuthChecked(dIsSuccess && !isError && !pIsError)
            }
            else if (localAuth.role === 'admin') {
                console.log(localAuth)
                setUserId(localAuth?.userId)
                setIsSkip(false);
                setData(AdminData)
                setRole(localAuth.role)
                setAuthChecked(AIsSuccess && !isError && !pIsError )
            }
        }
    }, [patientData, doctorData, isError, dIsSuccess, pIsError, pIsSuccess, AdminData, AIsError]);

    return {
        authChecked,
        data,
        role
    };
}