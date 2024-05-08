import './index.css';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { Empty } from 'antd';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { Link } from 'react-router-dom';

const OurDoctors = () => {
    const { data, isLoading, isError } = useGetDoctorsQuery({ limit: 10 });
    const doctors = data?.doctors;

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && doctors?.length === 0) content = <div><Empty /></div>
    if (!isLoading && !isError && doctors?.length > 0) content =
        <>
            {
                doctors && doctors?.map((item, key) => (
                    <div class="col-lg-6 mt-3" key={key + 2}>
                        <div class="member d-flex align-items-start">
                            <div class="pic">
                                {item.img && <img src={item.img} class="img-fluid" alt="" />}
                            </div>
                            <div class="member-info">
                                <h4>{item?.firstName + ' ' + item?.lastName}</h4>
                                <span>{item?.designation}</span>
                                <p>{item?.specialization}</p>
                                <div class="social">
                                </div>
                                <div className="d-flex justify-content-evenly mt-2 gap-2 align-items-center">
									<Link to={`/doctors/profile/${item?.id}`} className="btn  btn-outline-info btn-sm view-profile-btn">Profile</Link>
									<Link to={`/booking/${item?.id}`} className="btn btn-sm book-btn">Book</Link>
								</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    return (
        <section id="doctors" class="doctors">
            <div class="container">
                <div class="section-title text-center mb-3">
                    <h2>OUR DOCTORS</h2>
                </div>

                <div class="row">
                    {content}
                </div>
            </div>
        </section>
    )
}

export default OurDoctors;