import React, { useState,useEffect, useRef } from 'react';

import { 
  Maximize, 
  Settings,
  Minimize,
  X,
  CheckSquare,
  Columns,
  Square,
  Star,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import './LecturePage.css';



const VideoSettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <h3>Video Settings</h3>
        <div className="settings-options">
          <div className="setting-item">
            <label>Video Quality</label>
            <select>
              <option>Auto</option>
              <option>1080p</option>
              <option>720p</option>
              <option>480p</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Playback Speed</label>
            <select>
              <option>1x (Normal)</option>
              <option>1.25x</option>
              <option>1.5x</option>
              <option>2x</option>
            </select>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const LecturePage = () => {

  const { courseId } = useParams();
  const [lectures, setLectures] = useState(null);
  const [currentVideo, setCurrentLecture] = useState(null);
  const navigate = useNavigate();
  const [creator,setCreator]=useState("")

  useEffect(() => {
          const fetchDetails = async () => {
              try {
                  const response = await fetch(`http://localhost:8000/lecture/${courseId}`);
                  if (!response.ok) throw new Error('Failed to fetch lectures');
                  const data = await response.json();
                  console.log(data)
                  const formatTime = (time) => {
                    const hours = Math.floor(time / 3600);
                    const minutes = Math.floor((time % 3600) / 60);
                    const seconds = Math.floor(time % 60);
                  
                    return `${hours > 0 ? `${hours}:` : ""}${minutes}:${
                      seconds < 10 ? `0${seconds}` : seconds
                    }`;
                  };
                  const getVideoDuration = async (videoUrl) => {
                    return new Promise((resolve) => {
                      const videoElement = document.createElement('video');
                      videoElement.src = videoUrl;
                      videoElement.onloadedmetadata = () => {
                        resolve(videoElement.duration);  // duration in seconds
                      };
                    });
                  };
                  const lecturesWithIndex = await Promise.all(
                    data.lectures.map(async (lecture, index) => {
                      const duration = await getVideoDuration(lecture.videoUrl); 
                      return {
                        ...lecture,
                        title: lecture.label,
                        index: index + 1,
                        duration: formatTime(duration),
                        isActive:false,
                      };
                    })
                  );
                  setCreator(data.createdBy)
                  setLectures(lecturesWithIndex);
                  console.log(lecturesWithIndex[0])
                  const setInitial=async()=>{
                    lecturesWithIndex[0].isActive=true
                  }
                  setInitial();
                  if (lecturesWithIndex.length > 0) {
                    setCurrentLecture(lecturesWithIndex[0]);
                  }
              } catch (error) {
                  console.log("Some error occurred", error);
              }
          };
          fetchDetails();
      }, [courseId]);

      const handleLectureClick = (lecture) => {
        const updatedLectures = lectures.map((lec) => 
          lec.index === lecture.index ? { ...lec, isActive: true } : { ...lec, isActive: false }
        );
        setLectures(updatedLectures);
        setCurrentLecture(lecture);
      };

      const courseData = {
        currentLecture: currentVideo
          ? {
              id: currentVideo.index,
              title: currentVideo.label,
              videoUrl: currentVideo.videoUrl,
              isActive:true,
            }
          : null,
        lectures: lectures || []
      };
 
  console.log(courseData);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'React Learner',
      text: 'Great explanation of React fundamentals! Really helped me understand the core concepts.',
      timestamp: '2 days ago'
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [completedLectures, setCompletedLectures] = useState(
    courseData.lectures.reduce((acc, lecture) => {
      acc[lecture.id] = lecture.isActive;
      return acc;
    }, {})
  );
  const videoContainerRef = useRef(null);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        {
          id: comments.length + 1,
          user: 'You',
          text: newComment,
          timestamp: 'Just now'
        },
        ...comments
      ]);
      setNewComment('');
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setIsSettingsOpen(false);
  };

  const toggleLectureCompletion = (lectureId) => {
    setCompletedLectures(prev => ({
      ...prev,
      [lectureId]: !prev[lectureId]
    }));
  };

  /*const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} />);
    }
    if (halfStar) {
      stars.push(<Star key={fullStars} fill="50%" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={fullStars + i + 1} />);
    }
    return stars;
  };*/

  // Count completed and total lectures
  const totalLectures = courseData.lectures.length;
  const completedLecturesCount = Object.values(completedLectures).filter(Boolean).length;

  // Find current active lecture
  const currentLecture = courseData.lectures.find(lecture => lecture.isActive);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isFullScreen) {
        toggleFullScreen();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isFullScreen]);
  

  return (
    <div className={`lecture-page ${isFullScreen ? 'fullscreen' : ''}`}>
      <header className="header">
        <div className="logo">EduVerse</div>
        <nav className="nav-bar">
          <a href="/home">Home</a>
          <a href="/courses">Courses</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <div className="main-content">
        <div className={`video-section ${isFullScreen ? 'fullwidth' : ''}`}>
          <div 
            ref={videoContainerRef} 
            className="video-container"
          >
            <video src={courseData.currentLecture?.videoUrl} controls className="video-placeholder">
              Your browser does not support the video tag.
            </video>
            <div className="video-controls">
              {isFullScreen ? (
                <div className="fullscreen-controls">
                  <button 
                    className="minimize-toggle" 
                    onClick={toggleFullScreen}
                    title="Exit Fullscreen"
                  >
                    <Columns />
                  </button>
                  <button 
                    className="settings-toggle" 
                    onClick={() => setIsSettingsOpen(true)}
                    title="Video Settings"
                  >
                    <Settings />
                  </button>
                </div>
              ) : (
                <div className="default-controls">
                  <button 
                    className="fullscreen-toggle" 
                    onClick={toggleFullScreen}
                    title="Fullscreen"
                  >
                    <Maximize />
                  </button>
                  <button 
                    className="settings-toggle" 
                    onClick={() => setIsSettingsOpen(true)}
                    title="Video Settings"
                  >
                    <Settings />
                  </button>
                </div>
              )}
            </div>
          </div>



          

          

          <div className="video-description">
             <p>{courseData.currentLecture?.title}</p>
            <p className="show-more">Created by: {creator}</p>
          </div>

          <div className="comments-section">
            <div className="comments-header">
              <h3>{comments.length} Comments</h3>
            </div>

            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              {newComment && (
                <div className="comment-buttons">
                  <button onClick={() => setNewComment('')}>Cancel</button>
                  <button className="post-button" onClick={handleAddComment}>
                    Comment
                  </button>
                </div>
              )}
            </div>

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-user">{comment.user}</span>
                      <span className="comment-timestamp">{comment.timestamp}</span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {!isFullScreen && (
          <div className="recommended-lectures-container">
            <div className="lectures-header">
              <h3>More Lectures</h3>
              <div className="lecture-progress">
                {currentLecture && (
                  <span>Now Playing: {courseData.currentLecture.title}</span>
                )}
                <span>
                  {completedLecturesCount} / {totalLectures} Lectures Completed
                </span>
              </div>
            </div>
            <div className="recommended-lectures-scrollable">
              {courseData.lectures.map((lecture) => (
                <div 
                  key={lecture.index} 
                  className={`lecture-item ${lecture.isActive ? 'active' : ''}`}
                  onClick={() => handleLectureClick(lecture)}
                >
                  <div 
                    className="lecture-completion-checkbox"
                    onClick={() => toggleLectureCompletion(lecture.id)}
                  >
                    {completedLectures[lecture.id] ? (
                      <CheckSquare className="checked" />
                    ) : (
                      <Square className="unchecked" />
                    )}
                  </div>
                  <div className="lecture-thumbnail">
                    <span className="lecture-duration">{lecture.duration}</span>
                  </div>
                  <div className="lecture-details">
                    <h4>{lecture.title}</h4>
                    <p>Video Length: {lecture.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VideoSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

export default LecturePage;
