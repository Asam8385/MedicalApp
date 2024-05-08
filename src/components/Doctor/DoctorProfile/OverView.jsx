import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from "react-icons/fa";

const OverView = ({ doctorId }) => {
    const { data, isError, isLoading } = useGetDoctorQuery(doctorId);
    console.log(data)
    return (
        <div className="col-md-12 col-lg-9">
            <div className='mb-3'>
                <h5 className='overview-text'>About Me</h5>
                <p className='text-secondary'>{data?.biography}</p>
            </div>

            <div>
                <h5 className='overview-text'>Education</h5>

                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: 'black' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date={data?.awardYear}
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">{data?.degree}</h5>
                        <h3 className="text-white">{data?.college}</h3>
                    </VerticalTimelineElement>

                </VerticalTimeline>

            </div>
            <div className='my-5'>
                <h5 className='overview-text'>Work & Experience</h5>

                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: 'black' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="2010 - Present (5 years)"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Glowing Smiles Family Dental Clinic</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: 'color' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="2007 - 2010 (3 years)"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Comfort Care Dental Clinic</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="2005 - 2007 (2 years)"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Dream Smile Dental Practice</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dignissimos.</p>
                    </VerticalTimelineElement>


                  

                </VerticalTimeline>
                
            </div>
            <div>
                <h5 className='overview-text'>Specializations</h5>
                <ul className="clearfix">
                    <li>Children Care</li>
                    <li>Dental Care</li>
                    <li>Oral and Maxillofacial Surgery </li>
                    <li>Orthodontist</li>
                    <li>Periodontist</li>
                    <li>Prosthodontics</li>
                </ul>
            </div>
        </div>
    )
}
export default OverView;