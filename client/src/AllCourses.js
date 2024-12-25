import React, { useState, useEffect } from "react";
import { BookOpen, Clock, Star, User, Bell, Search } from "lucide-react";
import "./AllCourses.css";
import { useNavigate } from "react-router-dom";

const AllCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseDurations, setCourseDurations] = useState({});
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const coursesResponse = await fetch("http://localhost:8000/my-courses", {
          method: "GET",
          credentials: "include",
        });
        if (!coursesResponse.ok) throw new Error("Failed to fetch courses");
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // Fetch user details
        const userResponse = await fetch("http://localhost:8000/user", {
          method: "GET",
          credentials: "include",
        });
        if (!userResponse.ok) throw new Error("Failed to fetch user details");
        const userData = await userResponse.json();
        setName(userData.data.userName);

        // Calculate total durations for courses
        const durations = {};
        for (const course of coursesData) {
          const totalDuration = await fetchCourseDuration(course.lectures);
          durations[course._id] = totalDuration;
        }
        setCourseDurations(durations);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const fetchCourseDuration = async (lectures) => {
    const durations = await Promise.all(
      lectures.map((lecture) => getVideoDuration(lecture.videoUrl))
    );
    return durations.reduce((total, duration) => total + duration, 0);
  };

  const getVideoDuration = async (videoUrl) => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement("video");
      videoElement.src = videoUrl;
      videoElement.onloadedmetadata = () => resolve(videoElement.duration);
      videoElement.onerror = () => reject("Error loading video");
    });
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours > 0 ? `${hours}:` : ""}${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  const handleOpenCourse = (courseId) => {
    navigate(`/user/lecture/${courseId}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="dashboard">
      <header className="header1">
        <div className="header-content">
          <div className="brand">
            <BookOpen className="brand-icon" />
            <span className="brand-name">EduLearn Pro</span>
          </div>

          <div className="search-container">
            <div className="search-wrapper">
              <div className="search-icon-wrapper">
                <Search />
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="user-menu">
            <button className="notification-button">
              <Bell className="notification-icon" />
            </button>
            <div className="user-profile">
              <div className="avatar">
                <User className="avatar-icon" />
              </div>
              <span className="user-name">{name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">My Learning Dashboard</h1>
          <p className="page-description">Explore your courses and continue learning</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image-container">
                <img
                  src={course.image}
                  alt={course.title}
                  className="course-image"
                />
                <span className="course-category">{course.category}</span>
              </div>

              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>

                <div className="course-meta">
                  <div className="meta-item">
                    <User className="meta-icon" />
                    <span>{course.createdBy}</span>
                  </div>
                  <div className="meta-item">
                    <Clock className="meta-icon" />
                    <span>
                      {courseDurations[course._id]
                        ? formatTime(courseDurations[course._id])
                        : "Loading..."}
                    </span>
                  </div>
                  <div className="meta-item">
                    <Star className="meta-icon" />
                    <span>4.4</span>
                  </div>
                </div>

                <div className="course-actions">
                  <button
                    className="action-button primary-button"
                    onClick={() => handleOpenCourse(course._id)}
                  >
                    Start Course
                  </button>
                  <button className="action-button secondary-button">
                    Rate Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllCourses;
