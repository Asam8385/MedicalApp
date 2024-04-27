import React from 'react'
import logo from '../../images/logo.png';
import userImg from '../../images/avatar.jpg';
import './AdminHeader.css';
import { Button, Popover, message } from 'antd';
import { loggedOut } from '../../service/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import avatar from '../../images/avatar.jpg';
import { useEffect } from 'react';
import { useState } from 'react';

const AdminHeader = () => {

    
    const { authChecked, data, role } = useAuthCheck();
    const [isLoggedIn, setIsLogged] = useState(false);
    console.log(data);
    const navigate = useNavigate()

    const hanldeSignOut = () => {
        localStorage.clear();
        loggedOut();
        navigate('/admin/')
        message.success("Successfully Logged Out")
        setIsLogged(false)
        
    }

    useEffect(() => { authChecked && setIsLogged(true) }, [authChecked]);
    const content = (
        <div className='nav-popover'>
            <div className='my-2'>
                <h5 className='text-capitalize'>{data?.firstName + ' ' + data?.lastName}</h5>
                <p className='my-0'>{data?.email}</p>
                <Link to="/admin/dashboard">Deshboard</Link>
            </div>
            <Button variant="outline-danger" className='w-100' size="sm" onClick={hanldeSignOut} >
                Logged Out
            </Button>
        </div >
    );



    return (
        <div className="header">
            <div className="header-left ">
                <a href="index.html" className="logo">
                    <img src={logo} alt="Logo" />
                </a>
            </div>

            <a id="toggle_btn">
                <i className="fe fe-text-align-left"></i>
            </a>

            <div className="top-nav-search">
                <form>
                    <input type="text" className="form-control" placeholder="Search here" />
                    <button className="btn" type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>

            <a className="mobile_btn" id="mobile_btn">
                <i className="fa fa-bars"></i>
            </a>
            <ul className="nav user-menu">

                <li >
                    <div className='m-3'>
                    <Popover content={content}>
                                    <div className='profileImage'>
                                        <img src={data?.img ? data?.img : avatar} alt="" className="profileImage shadow img-fluid" />
                                    </div>
                    </Popover>
                    </div>
                    
                </li>

            </ul>

        </div>
    )
}

export default AdminHeader