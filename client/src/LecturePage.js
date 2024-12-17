import React, { useState,useEffect, useRef } from 'react';
import { 
  Maximize, 
  Settings, Star, StarOutline,
  Minimize,
  X,
  CheckSquare,
  Columns,
  Square,
} from 'lucide-react';
import './LecturePage.css';

const courseData = {
  currentLecture: {
    id: 1,
    title: 'Introduction to React Fundamentals',
    uploadDate: 'May 15, 2024',
    rating: 4.8,
    description: `In this comprehensive lecture, we dive deep into React fundamentals. 
    Learn about components, state management, and building your first React application. 
    Perfect for beginners looking to start their React journey!

    🔍 What you'll learn:
    • React component structure
    • State and props
    • Hooks introduction
    • Best practices for React development`,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  lectures: [
    {
      id: 1,
      title: 'Introduction to React Fundamentals',
      channel: 'React Masters',
      views: '45.6K',
      duration: '45:32',
      thumbnail: 'https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isActive: true
    },
    {
      id: 2,
      title: 'State and Props in Depth',
      channel: 'React Masters',
      views: '38.2K',
      duration: '52:14',
      thumbnail: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
      isActive: false
    },
    {
      id: 3,
      title: 'Hooks and Component Lifecycle',
      channel: 'React Masters',
      views: '35.7K',
      duration: '38:55',
      thumbnail: 'https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
      isActive: false
    },
    {
      id: 4,
      title: 'Advanced State Management',
      channel: 'React Masters',
      views: '29.4K',
      duration: '61:20',
      thumbnail: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
      isActive: false
    },
    {
      id: 5,
      title: 'React Router and Navigation',
      channel: 'Web Dev Tutorials',
      views: '42.1K',
      duration: '47:30',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
      isActive: false
    },
    {
      id: 6,
      title: 'Context API and Global State',
      channel: 'React Mastery',
      views: '33.5K',
      duration: '55:45',
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
      isActive: false
    },
    {
      id: 7,
      title: 'Performance Optimization in React',
      channel: 'Code Wizards',
      views: '27.8K',
      duration: '49:15',
      thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fHx8fDA%3D',
      isActive: false
    },
    {
      id: 8,
      title: 'React Testing Fundamentals',
      channel: 'Dev Learning',
      views: '31.2K',
      duration: '53:00',
      thumbnail: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fHx8fDA%3D',
      isActive: false
    },
    {
      id: 9,
      title: 'Serverless React Applications',
      channel: 'Cloud Dev Academy',
      views: '25.6K',
      duration: '58:30',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fHx8fDA%3D',
      isActive: false
    },
    {
      id: 10,
      title: 'Microservices with React',
      channel: 'Enterprise Tech',
      views: '22.9K',
      duration: '62:15',
      thumbnail: 'https://images.unsplash.com/photo-1560732488-6bad3162347a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fHx8fDA%3D',
      isActive: false
    },
    {
      id: 11,
      title: 'React Design Patterns',
      channel: 'Code Architecture',
      views: '29.7K',
      duration: '50:45',
      thumbnail: 'https://images.unsplash.com/photo-1605379399642-870eabec7a76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fHx8fDA%3D',
      isActive: false
    }
  ]
};

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

  const courseRating = courseData.currentLecture.rating; 

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

  const getRatingStars = (rating) => {
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
      stars.push(<StarOutline key={fullStars + i + 1} />);
    }
    return stars;
  };

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
        <div className="logo">EduPro</div>
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
            <div className="video-placeholder">
              Video Player Placeholder
            </div>
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



          <h1 className="video-title">{courseData.currentLecture.title}</h1>

          

          <div className="video-stats">
           <div className="video-stats">
           <div className="rating-stars">
              {getRatingStars(courseData.currentLecture.rating)}
            </div>
            <span>•</span>
            <span>{courseData.currentLecture.uploadDate}</span>
          </div>
          </div>

          <div className="video-description">
            <p>{courseData.currentLecture.description}</p>
            <button className="show-more">Show more</button>
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
                  <span>Now Playing: {currentLecture.title}</span>
                )}
                <span>
                  {completedLecturesCount} / {totalLectures} Lectures Completed
                </span>
              </div>
            </div>
            <div className="recommended-lectures-scrollable">
              {courseData.lectures.map((lecture) => (
                <div 
                  key={lecture.id} 
                  className={`lecture-item ${lecture.isActive ? 'active' : ''}`}
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
                    <img src={lecture.thumbnail} alt={lecture.title} />
                    <span className="lecture-duration">{lecture.duration}</span>
                  </div>
                  <div className="lecture-details">
                    <h4>{lecture.title}</h4>
                    <p>{lecture.views} views</p>
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
