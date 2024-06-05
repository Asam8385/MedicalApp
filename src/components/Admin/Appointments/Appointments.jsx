import React from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import img from "../../../images/doc/doctor 3.jpg";
import moment from "moment";
import { useGetAllAppointmentsQuery, useGetPatientInvoicesQuery } from "../../../redux/api/appointmentApi";
import { useGetPatientPrescriptionQuery } from "../../../redux/api/prescriptionApi";
import { Button, Tabs, Tag, Tooltip } from "antd";
import CustomTable from "../../UI/component/CustomTable";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FaRegEye } from "react-icons/fa";
import { clickToCopyClipBoard } from "../../../utils/copyClipBoard";

import "./Appointments.css";

const AdminAppointments = () => {
	const { data, isLoading: pIsLoading } = useGetAllAppointmentsQuery();
    const reversedData = Array.isArray(data) ? [...data].reverse() : [];





	const appointmentColumns = [
        {
            title: 'Doctor',
            key: 20,
            width: 150,
            render: function (data) {
                return <>
                    <div className="avatar avatar-sm mr-2 d-flex gap-2">
                        <div>
                            <img className="avatar-img rounded-circle" src={data?.doctor?.img} alt="" />
                        </div>
                        <div>
                            <h6 className='text-nowrap mb-0'>{data?.doctor?.firstName + ' ' + data?.doctor?.lastName}</h6>
                            <p className='form-text'>{data?.doctor?.designation}</p>
                        </div>
                    </div>
                </>
            }
        },
        {
            title: 'App Date',
            key: 22,
            width: 100,
            render: function (data) {
                return (
                    <div>{moment(data?.scheduleDate).format("LL")} <span className="d-block text-info">{data?.scheduleTime}</span></div>
                )
            }
        },
        {
            title: 'Booking Date',
            key: 22,
            width: 100,
            render: function (data) {
                return <div>{moment(data?.createdAt).format("LL")}</div>
            }
        },
        {
            title: 'Status',
            key: 24,
            width: 100,
            render: function (data) {
                return <Tag color="#f50">{data?.status}</Tag>
            }
        },
        {
            title: 'Action',
            key: 25,
            width: 100,
            render: function (data) {
                return (
                    <Link to={`/dashboard/appointments/${data.id}`}>
                        <Button type='primary'>View</Button>
                    </Link>
                )
            }
        },
    ];

	const items = [
        {
            key: '1',
            label: 'Appointment',
            children: <CustomTable
                loading={pIsLoading}
                columns={appointmentColumns}
                dataSource={reversedData}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />,
        },
      
    ];

    return (
        <>
            <AdminLayout >
			<Tabs defaultActiveKey="1" items={items} />
            </AdminLayout>
        </>
    )
}
export default AdminAppointments;