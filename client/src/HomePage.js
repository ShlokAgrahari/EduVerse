// src/components/HomePage.js
import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const companies = [
        'Company A',
        'Company B',
        'Company C',
        'Company D',
        'Company E',
        'Company F',
        'Company G',
        'Company H',
        'Company I',
        'Company J',
    ];

    return (
        <div className="homepage">
            {/* Header */}
            <header className="homepage-header">
                <h1>ASHTRA</h1>
                <p>Best Teacher | Affordable Pricing | Exclusive Notes</p>
            </header>

            {/* Navigation Bar */}
            <nav className="homepage-navbar">
                <form className="search-form">
                    <input type="text" placeholder="Search courses..." />
                    <Button variant="outline-primary">Search</Button>
                </form>
                <div className="nav-buttons">
                    <Link to="/about">
                        <Button variant="outline-secondary">About Us</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline-primary">Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant="outline-secondary">Sign Up</Button>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="content">
                {/* Carousel Section */}
                <div className="carousel-wrapper">
                    <Carousel className="homepage-carousel" interval={3000} controls={true} indicators={true}>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://via.placeholder.com/600x500" alt="First slide" />
                            <Carousel.Caption>
                                <h3>Welcome to ASHTRA</h3>
                                <p>Best Teacher | Affordable Pricing | Exclusive Notes</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://via.placeholder.com/600x500" alt="Second slide" />
                            <Carousel.Caption>
                                <h3>Explore Courses</h3>
                                <p>Find the perfect course tailored for you!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://via.placeholder.com/600x500" alt="Third slide" />
                            <Carousel.Caption>
                                <h3>Learn from Experts</h3>
                                <p>Get insights from top industry instructors.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://via.placeholder.com/600x500" alt="Fourth slide" />
                            <Carousel.Caption>
                                <h3>Join Our Community</h3>
                                <p>Connect with fellow learners and instructors.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>

                {/* Trusted Companies Section */}
                <div className="trusted-companies">
                    <h2>Trusted by Companies Like:</h2>
                    <div className="company-ovals">
                        {companies.map((company, index) => (
                            <div key={index} className="company-oval">
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="homepage-footer">
                <p>&copy; 2024 ASHTRA. All rights reserved.</p>
                <div className="footer-links">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
