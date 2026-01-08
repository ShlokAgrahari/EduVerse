import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

import { ChevronLeft, ChevronRight, Search, GraduationCap, Users, BookOpen, Award, Sparkles, Star, TrendingUp, Clock, CheckCircle, ArrowRight, Play } from 'lucide-react';

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=1200&auto=format&fit=crop&q=80",
            title: "Welcome to EDUVERSE",
            description: "Best Teacher | Affordable Pricing | Exclusive Notes"
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1663090752502-1f38cea3be4e?w=1200&auto=format&fit=crop&q=80",
            title: "Explore Courses",
            description: "Find the perfect course tailored for you!"
        },
        {
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80",
            title: "Learn from Experts",
            description: "Get insights from top industry instructors."
        },
        {
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&auto=format&fit=crop&q=80",
            title: "Join Our Community",
            description: "Connect with fellow learners and instructors."
        }
    ];

    const companies = [
        'COURSERA', 'edX', 'UDACITY', 'EVENTBRITE', 'QUIZLEDT',
        'NEARPOD', 'ACHIEVE3000', 'CHEGG', 'WYZANT', 'COLLEGE BOARD'
    ];

    const stats = [
        { icon: Users, value: "50K+", label: "Active Students" },
        { icon: BookOpen, value: "500+", label: "Courses" },
        { icon: GraduationCap, value: "100+", label: "Expert Instructors" },
        { icon: Award, value: "95%", label: "Success Rate" }
    ];

    const featuredCourses = [
        {
            title: "Web Development Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.8,
            students: "12,450",
            duration: "42 hours",
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=60"
        },
        {
            title: "Data Science & Machine Learning",
            instructor: "Jose Portilla",
            rating: 4.9,
            students: "8,320",
            duration: "36 hours",
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60"
        },
        {
            title: "Digital Marketing Masterclass",
            instructor: "Phil Ebiner",
            rating: 4.7,
            students: "15,670",
            duration: "28 hours",
            level: "All Levels",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=60"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Software Engineer",
            content: "Eduverse transformed my career! The courses are top-notch and the instructors are incredibly knowledgeable.",
            avatar: "https://i.pravatar.cc/150?img=1",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Data Analyst",
            content: "Best investment I've made in my education. The practical projects helped me land my dream job.",
            avatar: "https://i.pravatar.cc/150?img=3",
            rating: 5
        },
        {
            name: "Emily Rodriguez",
            role: "Marketing Manager",
            content: "The flexibility and quality of courses on Eduverse are unmatched. Highly recommended!",
            avatar: "https://i.pravatar.cc/150?img=5",
            rating: 5
        }
    ];

    useEffect(() => {
        setIsVisible(true);
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="bg-[#03045e] text-white shadow-2xl">
                <div className="container mx-auto px-6 py-2">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3 group cursor-pointer">
                            
                                <img
                                    src={logo}
                                    alt="Eduverse Logo"
                                    className="w-16 h-16 object-contain"
                                />

                            <div className="leading-tight">
                                <h1 className="text-xl font-black tracking-tight">Eduverse</h1>
                                <p className="text-[10px] text-white font-medium">
                                    Learn • Grow • Excel
                                </p>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="nav-buttons flex items-center gap-3">
                            <Link to="/about">
                                <button className="px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm">
                                    About Us
                                </button>
                            </Link>

                            <Link to="/login">
                                <button className="px-4 py-1.5 text-sm font-semibold bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                                    Login
                                </button>
                            </Link>

                            <Link to="/signup">
                                <button className="px-4 py-1.5 text-sm font-semibold bg-white text-[#03045e] rounded-lg hover:bg-gray-100 transition-all shadow-lg">
                                    Sign Up
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </header>


            <div className="bg-white shadow-md border-b border-gray-200">
                <div className="container mx-auto px-6 py-3">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for courses, instructors, or topics..."
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#03045e] focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-sm"
                            />
                            <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#03045e] w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1">
                <div className="container px-6 py-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Carousel Section */}
                        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl group bg-white p-2">
                                <div className="relative h-[480px] rounded-2xl overflow-hidden">
                                    {slides.map((slide, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-all duration-700 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                                }`}
                                        >
                                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                                <div className="bg-[#03045e] backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                                    <h3 className="text-3xl font-black mb-2 text-white drop-shadow-lg">
                                                        {slide.title}
                                                    </h3>
                                                    <p className="text-base text-white font-medium">{slide.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all shadow-xl opacity-0 group-hover:opacity-100 transform hover:scale-110">
                                    <ChevronLeft className="w-5 h-5 text-[#03045e]" />
                                </button>
                                <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all shadow-xl opacity-0 group-hover:opacity-100 transform hover:scale-110">
                                    <ChevronRight className="w-5 h-5 text-[#03045e]" />
                                </button>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-full">
                                    {slides.map((_, index) => (
                                        <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-white shadow-lg' : 'w-2 bg-white/60 hover:bg-white/80'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Trusted Companies Section */}
                        <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="bg-white rounded-3xl shadow-2xl p-8 h-full border border-gray-200">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-black text-gray-800 mb-2">
                                        Trusted Worldwide
                                    </h2>
                                    <p className="text-gray-600 font-medium">Join thousands learning with industry leaders</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {companies.map((company, index) => (
                                        <div key={index} className="relative group" style={{ animationDelay: `${index * 0.1}s`, animation: 'fadeInUp 0.6s ease-out forwards', opacity: 0 }}>
                                            <div className="absolute inset-0 bg-[#03045e] rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                            <div className="relative bg-[#03045e] text-white px-4 py-3 rounded-2xl text-center font-bold text-xs shadow-lg transform group-hover:scale-105 group-hover:-translate-y-1 transition-all cursor-pointer border border-blue-400/30">
                                                {company}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="relative group">
                                    <div className="absolute inset-0 bg-[#03045e] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <div className="relative bg-white rounded-2xl shadow-xl p-6 text-center transform group-hover:scale-105 group-hover:-translate-y-2 transition-all border border-gray-100">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#03045e] rounded-2xl mb-4 shadow-lg transform group-hover:rotate-6 transition-transform">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-4xl font-black text-[#03045e] mb-2">
                                            {stat.value}
                                        </h3>
                                        <p className="text-gray-600 font-semibold text-sm">{stat.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Featured Courses Section - NEW! */}
                    <div className="mt-16">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-black text-gray-800 mb-3">
                                Featured Courses
                            </h2>
                            <p className="text-gray-600 text-lg">Start learning with our most popular courses</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredCourses.map((course, index) => (
                                <div key={index} className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                                    <div className="absolute inset-0 bg-[#03045e] rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                    <div className="relative">
                                        <div className="relative h-48 overflow-hidden">
                                            <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" />
                                                Trending
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="bg-blue-100 text-[#03045e] px-3 py-1 rounded-full text-xs font-bold">{course.level}</span>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                    <span className="font-bold text-gray-800">{course.rating}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#03045e] transition-colors">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    <span>{course.students}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{course.duration}</span>
                                                </div>
                                            </div>
                                            <button className="w-full bg-[#03045e] text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 group">
                                                <Play className="w-4 h-4" />
                                                Enroll Now
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonials Section - NEW! */}
                    <div className="mt-16 bg-[#03045e] rounded-3xl p-10 shadow-2xl">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-black text-white mb-3">
                                What Our Students Say
                            </h2>
                            <p className="text-white text-lg">Real stories from real learners</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transform hover:scale-105 hover:-translate-y-2 transition-all">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-white mb-6 italic">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-3">
                                        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-white/30" />
                                        <div>
                                            <p className="font-bold text-white">{testimonial.name}</p>
                                            <p className="text-sm text-white">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section - NEW! */}
                    <div className="mt-16 bg-[#03045e] rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                        <div className="relative z-10">
                            <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-4 animate-pulse" />
                            <h2 className="text-4xl font-black text-white mb-4">
                                Ready to Start Your Learning Journey?
                            </h2>
                            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                                Join thousands of students already learning on Eduverse. Start today and unlock your potential!
                            </p>
                            <button className="bg-white text-[#03045e] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-110 transition-all shadow-2xl inline-flex items-center gap-2 group">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="container mx-auto px-6 text-center">
                    <p className="mb-4 text-gray-300">&copy; 2024 EDUVERSE. All rights reserved.</p>
                    <div className="flex justify-center gap-8">
                        <a href="#" className="text-gray-300 hover:text-[#03045e] transition-colors font-medium">Privacy Policy</a>
                        <a href="#" className="text-gray-300 hover:text-[#03045e] transition-colors font-medium">Terms of Service</a>
                    </div>
                </div>
            </footer>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default HomePage;