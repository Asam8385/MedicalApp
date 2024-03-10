import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import p1 from '../../../images/avatar.jpg'
import { Avatar, Button, Card, Descriptions,Input, List, Space} from 'antd'
import './Appointments.css';

const { Search } = Input;

const data = [
	{
	  doctorName: 'Dr. John Doe',
	  doctorProfile: p1,
	  schedule: [
		{ patientName:"peter",date: '2024-02-12', time: '10:00 AM - 12:00 PM',amount:"$200",consulting:"physical" },
		{ patientName:"peter",date: '2024-02-13', time: '02:00 PM - 04:00 PM',amount:"$200",consulting:"virtual" },
		{ patientName:"peter",date: '2024-02-12', time: '10:00 AM - 12:00 PM',amount:"$200",consulting:"virtual" },
		{ patientName:"peter",date: '2024-02-13', time: '02:00 PM - 04:00 PM',amount:"$200",consulting:"physical" },
		{ patientName:"peter",date: '2024-02-12', time: '10:00 AM - 12:00 PM',amount:"$200",consulting:"virtual" },
		{ patientName:"peter",date: '2024-02-13', time: '02:00 PM - 04:00 PM',amount:"$200",consulting:"physical" },
		{ patientName:"peter",date: '2024-02-12', time: '10:00 AM - 12:00 PM',amount:"$200",consulting:"physical" },
		{ patientName:"peter",date: '2024-02-13', time: '02:00 PM - 04:00 PM',amount:"$200",consulting:"physical" },
		{ patientName:"peter",date: '2024-02-13', time: '02:00 PM - 04:00 PM',amount:"$200",consulting:"virtual" },
		// Add more scheduling details here if needed
	  ],
	},
	{
	  doctorName: 'Dr. John Doe',
	  doctorProfile: p1,
	  schedule: [
		{patientName:"peter", date: '2024-02-12', time: '10:00 AM - 12:00 PM',amount:"$200",consulting:"physical" },
		{patientName:"peter", date: '2024-02-13', time: '02:00 PM - 04:00 PM',amount:"$200",consulting:"virtual" },
		// Add more scheduling details here if needed
	  ],
	},
	{
	  doctorName: 'Dr. John Doe',
	  doctorProfile: p1,
	  schedule: [
		{ patientName:"peter",date: '2024-02-12', time: '10:00 AM - 12:00 PM',amount:"$200",consulting:"virtual" },
		{ patientName:"peter",date: '2024-02-13', time: '02:00 PM - 04:00 PM',amount:"$200",consulting:"physical" },
		// Add more scheduling details here if needed
	  ],
	},
	{
	  doctorName: 'Dr. John Doe',
	  doctorProfile: p1,
	  schedule: [
		{patientName:"peter", date: '2024-02-12', time: '10:00 AM - 12:00 PM' ,amount:"$200",consulting:"physical"},
		{ patientName:"peter",date: '2024-02-13', time: '02:00 PM - 04:00 PM',amount:"$200" ,consulting:"physical"},
		// Add more scheduling details here if needed
	  ],
	},
	// Add more doctor's data here if needed
  ];
const AdminAppointments = () => {
	const onSearch = (value, _e, info) => console.log(info?.source, value);
    return (
        <>
            <AdminLayout >
			<div className="custom-scrollbar" style={{ maxWidth: "100%", margin: '0 auto' }}> {/* Adjust maxHeight as needed */}
			<List
			
			grid={{ column: 1 }}
			dataSource={data}
			renderItem={(item) => (
				<List.Item>
				<Card style={{ width: '100%' }}>
					<Card.Meta
					avatar={<Avatar src={item.doctorProfile} />}
					title={item.doctorName}
					/>
					<div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<div style={{ flex: 1 }}>
						
						<div style={{ display:"contents" }}>
							{item.schedule.map((schedule, index) => (
							<div key={index} style={{ marginRight: '10px' }}>
								<Card style={{backgroundColor:"ButtonFace"}} >
								<Space direction="horizontal">
								<Card.Meta title="Patient Name" description={schedule.patientName} />
								<br/><br/><br/>
								<Card.Meta title="Date" description={schedule.date} />
								<br/><br/><br/>
								<Card.Meta title="Time" description={schedule.time} />
								<br/><br/><br/>
								<Card.Meta title="Consulting" description={schedule.consulting} />
								<br/><br/><br/>
								<Card.Meta title="Amount" description={schedule.amount} />
								
								</Space>
								</Card>
								<br/>
							</div>
							))}
						</div>
						
					</div>
					</div>
				</Card>
				</List.Item>
			)}
			/>
		</div>
            </AdminLayout>
        </>
    )
}
export default AdminAppointments;