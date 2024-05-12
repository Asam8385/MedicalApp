import React from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { FloatButton, ConfigProvider, Space } from 'antd';
import { FaRobot } from 'react-icons/fa';


const HeroSection = () => {
    const history = useNavigate();
    const handleButtonClick = () => {
        history('/chat');
      };
    return (
        <section id="hero" class="d-flex align-items-center">
            <div className="container">
                <div>
                    <small >TOTAL HEALTH CARE SOLUTION</small>
                    <h1>Your Most Trusted <br />Health Partner</h1>
                    {/* <small>serunt rem suscipit placeat.</small> */}
                </div>
                <div className="d-flex flex-wrap justify-content-start gap-2">
                    <Link to={'/doctors'} className="btn-get-started scrollto">Search Doctors</Link>
                    <Link to={'/chat'} className="btn-get-started scrollto">Chat bot</Link>
                    <FloatButton icon={<FaRobot/>} onClick={handleButtonClick}  tooltip={<div>Chat bot</div>}/>
                    <ConfigProvider
                                   theme={{
                                     token: {
                                        colorBgElevated: '#1677ff',
                                        colorText : '#ffffff'
                                        
                                       
                                     },
                                   }}
                                 >
                                   <Space>
                                   <FloatButton icon={<FaRobot/>} onClick={handleButtonClick}  tooltip={<div>Chat bot</div>}/> 
                                   </Space>
                    </ConfigProvider>
                </div>
            </div>
        </section>
    )
}
export default HeroSection;