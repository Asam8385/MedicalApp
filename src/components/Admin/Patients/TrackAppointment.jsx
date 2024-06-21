import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import './index.css';
import { Input, message } from 'antd';
import { useTrackAppointmentMutation } from '../../../redux/api/appointmentApi';
import TrackDetailPage from './TrackDetailPage';
import { useEffect, useState } from 'react';
import AvailableServiceContent from '../../Home/AvailableFeatures/AvailableServiceContent';
const { Search } = Input;

const TrackAppointment = () => {
    const [trackAppointment, { data, isSuccess, isLoading, isError, error }] = useTrackAppointmentMutation();
    const [showInfo, setShowInfo] = useState(false);

    const onSearch = (value) => {
        if (value.length > 5) {
            trackAppointment({ id: value })
        }
    }

    useEffect(() => {
        if (isSuccess && !isError && data?.id) {
            message.success("Succcessfully Get Information !")
            setShowInfo(!showInfo);
        }
        if (isError) {
            message.error(error?.data?.message);
        }
        if (isSuccess && data?.id === undefined) {
            message.error("No Data is Available !")
        }
    }, [isSuccess, isError, error, data]);

    // What to render
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>
    if (!isLoading && !isError && data?.id) content = <TrackDetailPage data={data} setShowInfo={setShowInfo} />
    return (
        <>
            <div style={{ minHeight: '100vh' }}>
                {
                    showInfo ? content
                        :
                        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '9rem' }}>
                            <div>
                                <div className='mb-5 section-title text-center'>
                                    <h3>Enter User ID</h3>

                                </div>
                                <div className='mx-auto d-flex justify-content-center'>
                                    <Search
                                        placeholder="Find User Details..."
                                        allowClear
                                        enterButton="Track"
                                        onSearch={onSearch}
                                        style={{ width: 500 }}
                                        size='large'
                                    />
                                </div>

                                <section className="container" style={{ marginBottom: '8rem', marginTop: '5rem' }}>
                                    <div className="flex" style={{ maxWidth: '900px' }}>
                                        <div className='mb-4 section-title text-center'>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default TrackAppointment;