// src/components/HomePage.js
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import SearchBar from './components/searchbar';

import './HomePage.css';

const HomePage = () => {
    const companies = [
        'COURSERA',
        'edX',
        'UDACITY',
        'EVENTBRITE',
        'QUIZLEDT',
        'NEARPOD',
        'ACHIEVE3000',
        'CHEGG',
        'WYZANT',
        'COLLEGE BOARD',
    ];

    const [expand,setexpand] = useState(false);
    const handlesearch = ()=>{
        setexpand(!expand);
    }

    return (
        <div className="homepage">
            {/* Header */}
            <header className="homepage-header">

            <div className="logo2">
          <img id="idk10" src={logo} alt="Logo" />

            <h2 id="sitename4">Eduverse</h2>
            
          </div>
                
                <p className='about-edu'>Best Teacher | Affordable Pricing | Exclusive Notes</p>
            </header>

            {/* Navigation Bar */}
            <nav className="homepage-navbar">
                <div className='search-btn'>
                <button onClick={handlesearch} style={{padding:"3px"}}><SearchIcon/></button>
                </div>
            
            <div className={`search-form ${expand?"show3":"hide3"}`}>
                    <SearchBar/>
                </div>
                <div className={`nav-buttons ${expand? "show4":"hide4"}`}>
                    <Link to="/about">
                        <Button className='navbtn' variant="outline-secondary">About</Button>
                    </Link>
                    <Link to="/login">
                        <Button className='navbtn' variant="outline-primary">Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button className='navbtn' variant="outline-secondary">SignUp</Button>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="content">
                {/* Ca rousel Section */}
                <div className="carousel-wrapper">
                    <Carousel className="homepage-carousel" interval={3000} controls={true} indicators={true}>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25saW5lJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww" alt="First slide" />
                            <Carousel.Caption>
                                <h3><b>Welcome to EDUVERSE</b></h3>
                                <p><b>Best Teacher | Affordable Pricing | Exclusive Notes</b></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://plus.unsplash.com/premium_photo-1663090752502-1f38cea3be4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b25saW5lJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww" alt="Second slide" />
                            <Carousel.Caption>
                                <h3><b>Explore Courses</b></h3>
                                <p><b>Find the perfect course tailored for you!</b></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://media.istockphoto.com/id/1287828808/photo/black-man-using-computer-with-educational-website.webp?a=1&b=1&s=612x612&w=0&k=20&c=krXB9Ygw5514iLe3so4feT2JkpfbzGMQKiJYINtJZUM=" alt="Third slide" />
                            <Carousel.Caption>
                                <h3>Learn from Experts</h3>
                                <p>Get insights from top industry instructors.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://media.istockphoto.com/id/1349104991/photo/e-learning-online-education-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=mG2l86JNDQmEP9t2NkJ4Nvc8rL-OGdXoU55ZrS1LDhA=" alt="Fourth slide" />
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
                <p>&copy; 2024 EDUVERSE. All rights reserved. 
                <div className="footer-links">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                </div>
                </p>
               
            </footer>
        </div>
    );
};

export default HomePage;
