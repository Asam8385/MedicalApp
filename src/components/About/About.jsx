import React from 'react'
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import ImageHeading from '../../images/doc/doctor 5.jpg'
import img from '../../images/logo.png'
import SubHeader from '../Shared/SubHeader';
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { Empty, message } from 'antd';
import { Link } from 'react-router-dom';
import { truncate } from '../../utils/truncate';
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';

const About = () => {

    const { data: doctorData, isLoading: DoctorIsLoading, isError: doctorIsError } = useGetDoctorsQuery({ limit: 4 });

   
    const doctors = doctorData?.doctors;

    let doctorContent = null;
    if (!DoctorIsLoading && doctorIsError) doctorContent = <div>Something Went Wrong !</div>
    if (!DoctorIsLoading && !doctorIsError && doctors?.length === 0) doctorContent = <div><Empty /></div>
    if (!DoctorIsLoading && !doctorIsError && doctors?.length > 0) doctorContent =
        <>
            {doctors && doctors.map((item, id) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={id + item.id}>
                    <div className="card shadow border-0 mb-5 mb-lg-0">
                        {item.img && <img src={item.img} class="img-fluid w-100" alt="" />}
                        <div className="p-2">
                            <h4 className="mt-4 mb-0" style={{ color: '#223a66' }}><a>{item?.firstName + ' ' + item?.lastName}</a></h4>
                            <p>{item?.designation}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>

    return (
        <>
            <Header />
            <SubHeader title="about us" subtitle="No need alter option to heal" />
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="col-lg-4">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>Our Doctors Acheivement</h2>
                            <p className='form-text m-0'></p>
                        </div>
                        <p className='mt-3'>Our doctors are highly skilled and experienced professionals dedicated to providing exceptional medical care. They work tirelessly to ensure the well-being of our patients, offering expert diagnoses and effective treatments. Our team is committed to maintaining the highest standards of medical excellence, and they are always ready to address any health concerns with compassion and precision. Trust our doctors to deliver the best healthcare services, ensuring you receive the attention and care you deserve.</p>
                    </div>

                    <div className="col-lg-8">

                        <img src={ImageHeading} alt="" className="img-fluid rounded shadow" />
                    </div>
                </div>
            </div>

          
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row align-items-center">
                    <div className="col-lg-4">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>Our Doctors Acheivement</h2>
                            <p className='form-text m-0'></p>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            {
                                Array(6).fill(null).map((_, id) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6" key={id + 3}>
                                        <div className="award-img">
                                            <img src={img} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>Meet Our Specialist</h2>
                            <p className='form-text m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ipsum!</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {doctorContent}

                </div>
            </div>

            <div className="container say-about" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>What Doctor's Say</h2>
                            <p className='form-text m-0'></p>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6 offset-lg-6">
                        <div className="my-2">
                            <h4 style={{ color: '#223a66' }} className='my-0'>Amazing service!</h4>
                            <span>John Partho</span>
                        </div>
                        <p className='form-text'>
                        They provide excellent service with great attention to detail. Their expertise and dedication are unmatched. They handle each case with care and professionalism, ensuring the best outcomes for their patients. Their facility is equipped with state-of-the-art technology, and they are committed to providing top-notch care. Whether it's a routine check-up or a complex procedure,
                         you can trust them to deliver the highest quality service.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About