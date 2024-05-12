import React, { useEffect } from 'react';
import './BookDoctor.css';
import { Link } from 'react-router-dom';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { FaLocationArrow, FaCheckCircle, FaRegHeart, FaDollarSign, FaClock } from "react-icons/fa";
import { useAddFavouriteMutation } from '../../../redux/api/favouriteApi';
import StarRatings from 'react-star-ratings';
import { message } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

const BookDoctor = () => {
	const { data, isError, isLoading } = useGetDoctorsQuery({ limit: 10 });
	const doctors = data?.doctors;
	const [addFavourite, { isSuccess, isLoading: FIsLoading, isError: fIsError, error }] = useAddFavouriteMutation();

	const handleAddFavourite = (id) => {
		addFavourite({ doctorId: id });
	};

	useEffect(() => {
		if (!FIsLoading && fIsError) {
			message.error(error?.data?.message)
		}
		if (isSuccess) {
			message.success('Successfully Favourite Adde')
		}
	}, [isSuccess, fIsError, FIsLoading, error?.data?.message])

	// what to render 
	let content = null;
	if (!isLoading && isError) content = <div>Something Wrong !</div>
	if (!isLoading && !isError && doctors?.length === 0) content = <div>Empty</div>
	if (!isLoading && !isError && doctors?.length > 0) content =
		<>
			{
				doctors && doctors?.map((item) => (
					<SwiperSlide key={item.id}>
						<div className="profile-widget">
							<div className="doc-img">
								<Link to={'/doctors/profile'}>
									{item?.img && <img className="img-fluid" alt="" src={item?.img} />}
								</Link>
								<a style={{ cursor: 'pointer' }} className="position-absolute top-0 end-0 me-2" onClick={() => handleAddFavourite(item?.id)}>
									<FaRegHeart />
								</a>
							</div>
							<div className="pro-content">
								<h3 className="title">
									<Link to={'/doctors/profile'}>
										<a>{item?.firstName + ' ' + item?.lastName}</a>
									</Link>
									<FaCheckCircle className='verified' />
								</h3>
								<p className="speciality">{item?.designation}, {item?.specialization}</p>
								<div className="w-100 d-flex align-items-center">
									<StarRatings
										rating={5}
										starRatedColor="#f4c150"
										numberOfStars={5}
										name='rating'
										className="star"
										starDimension="20px"
										starSpacing="5px"
									/>
									<span className="d-inline-block text-secondary mt-2">(27)</span>
								</div>
								<div className="d-flex justify-content-evenly align-items-center">
									<Link to={`/doctors/profile/${item?.id}`} className="btn  btn-outline-info btn-sm view-profile-btn">Profile</Link>
									<Link to={`/booking/${item?.id}`} className="btn btn-sm book-btn">Book</Link>
								</div>
							</div>
						</div >
					</SwiperSlide>
				))
			}
		</>
	return (
		<section className="section-doctor container">
			 <div className='mb-5 section-title text-center'>
                <h2>Book our doctors</h2>
                <p className='m-0 text-secondary'></p>
            </div> 
			<div className="container-fluid">
				
				<div className="row">
						<div className="d-flex justify-content-center align-items-center gap-3 border-0">
							<Swiper
								spaceBetween={20}
								slidesPerView={2}
								modules={[Navigation, Autoplay]}
								navigation={true}
								loop={true}
								centeredSlides={true}
								autoplay={{ delay: 2000, disableOnInteraction: false }}
							>
								{content}
							</Swiper>
						</div>
				</div>
			</div>
		</section >
	);
};

export default BookDoctor;