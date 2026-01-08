import React, { useState } from 'react';
import { Upload, Plus, Trash2, Save, XCircle } from 'lucide-react';
import './CreateCourse.css';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
const CreateCourse = () => {
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    level: 'Beginner',
    videoContents: [{ label: '', file: null }],
    previewVideo:null,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setCourse({ ...course, [field]: file });

    if (field === 'image' && file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoFileChange = (e, index) => {
    const newVideoContents = [...course.videoContents];
    newVideoContents[index].file = e.target.files[0];
    setCourse({ ...course, videoContents: newVideoContents });
  };

  const handlePreviewFileChange = (e) => {
    const file = e.target.files[0];
    setCourse({ ...course, previewVideo: file });
  };
  

  const handleRemoveImage = () => {
    setCourse({ ...course, image: null });
    setImagePreview(null);
  };

  const handleLabelChange = (e, index) => {
    const newVideoContents = [...course.videoContents];
    newVideoContents[index].label = e.target.value;
    setCourse({ ...course, videoContents: newVideoContents });
  };

  const addVideoInput = () => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      videoContents: [...prevCourse.videoContents, { label: '', file: null }],
    }));
  };

  const deleteVideoInput = (index) => {
    const newVideoContents = course.videoContents.filter((_, i) => i !== index);
    setCourse({ ...course, videoContents: newVideoContents });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    console.log(course);
    const fdata = new FormData();
    fdata.append('title', course.title);
    fdata.append('description', course.description);
    fdata.append('pricing', course.price);
    fdata.append('category', course.category);
    fdata.append('level', course.level);
    if (course.image) fdata.append('image', course.image);
    if (course.previewVideo) fdata.append('previewVideo', course.previewVideo);

    course.videoContents.forEach((video, index) => {
      if (video.file) {
        fdata.append(`videoContents`, video.file);
        fdata.append(`videoContents[${index}]`, video.label);
      }
    });
    console.log(fdata)


    try {
      const response = await fetch('http://localhost:8000/instructor/newcourse', {
        method: 'POST',
        credentials: 'include',
        body: fdata,
      });
      if (!response.ok) {
        throw new Error('Failed to create course');
      }
      navigate('/user/instructor-dashboard');
      const data = await response.json();
      console.log(data.lectures); 
      console.log('Data:', data);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  if (isLoading) {
    return <Loader />; 
  }
  return (
    <div className="design-container">
      <div className="design-header">
        <h1>Create New Course</h1>
      </div>

      <form className="design-content" onSubmit={handleSubmit}>
        <div className="section">
          <h3>Course Title</h3>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleInputChange}
            placeholder="Enter course title"
            className="form-input"
            required
          />
        </div>

       
        <div className="section">
          <h3>Course Description</h3>
          <textarea
            name="description"
            value={course.description}
            onChange={handleInputChange}
            placeholder="Describe the course"
            className="form-textarea"
            required
          ></textarea>
        </div>

        <div className="section course-details-grid">
          <div className="course-detail">
            <h3>Course Price (₹)</h3>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleInputChange}
              placeholder="Enter course price"
              className="form-input"
              required
            />
          </div>

          <div className="course-detail">
            <h3>Category</h3>
            <select
              name="category"
              value={course.category}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">Select Category</option>
              <option value="Development">Development</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="course-detail">
            <h3>Level</h3>
            <select
              name="level"
              value={course.level}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="section course-thumbnail-section">
          <h3>Course Thumbnail</h3>
          <div className="thumbnail-upload-container">
            {imagePreview ? (
              <div className="thumbnail-preview">
                <img src={imagePreview} alt="Thumbnail Preview" className="thumbnail-image" />
                <button type="button" className="remove-button" onClick={handleRemoveImage}>
                  <XCircle size={20} /> Remove Image
                </button>
              </div>
            ) : (
              <div className="upload-section">
                <input
                  type="file"
                  id="image-upload"
                  name="image"
                  onChange={(e) => handleFileChange(e, 'image')}
                  accept="image/*"
                  className="file-input"
                  required
                />
              </div>
            )}
          </div>
        </div>

        <div className="section">
          <h3>Video Content</h3>
          {course.videoContents.map((video, index) => (
            <div key={index} className="video-content-item">
              <div className="video-input-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Video Label"
                  value={video.label}
                  onChange={(e) => handleLabelChange(e, index)}
                  required
                />
                <input
                  type="file"
                  className="file-input"
                  accept="video/*"
                  onChange={(e) => handleVideoFileChange(e, index)}
                  required
                />
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteVideoInput(index)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="add-button" onClick={addVideoInput}>
            <Plus size={16} />
            Add Another Video
          </button>
        </div>

        <div className="section preview-video-section">
          <h3>Preview Video</h3>
          <div className="video-input-row">
            <input
              type="file"
              id="video-preview"
              name="video-preview"
              accept="video/*"
              className="file-input"
              onChange={handlePreviewFileChange}
            />
          </div>
        </div>

        <button type="submit" className="submit-button1">
          <Save size={20} />
          Save Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
