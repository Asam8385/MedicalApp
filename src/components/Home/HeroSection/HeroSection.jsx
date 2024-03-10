import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section id="hero" class="d-flex align-items-center">
            <div className="container">
                <div>
                    <small>TOTAL HEALTH CARE SOLUTION</small>
                    <h1>Your Most Trusted <br />Health Partner</h1>
                    <small>A repudiandae ipsam labore ipsa voluptatum quidem quae laudantium quisquam aperiam maiores sunt fugit, deserunt rem suscipit placeat.</small>
                </div>
                <div className="d-flex justify-content-start gap-2">
                    <Link to={'/doctors'} className="btn-get-started scrollto">Search Doctors</Link>
                    <Link to={'/track-appointment'} className="btn-get-started scrollto">booking doctors</Link>
                    <Link to={'/chat'} className="btn-get-started scrollto">let us know</Link>
                </div>
            </div>
        </section>
    )
}
export default HeroSection;