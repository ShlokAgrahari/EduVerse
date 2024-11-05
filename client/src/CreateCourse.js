// src/components/CreateCourse.js

import React, { useState } from 'react';
import './CreateCourse.css';
import { FaSave, FaPlusCircle, FaTrash } from 'react-icons/fa';

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    level: 'Beginner',
    videoContents: [{ label: '', file: null }], // To handle multiple videos
    resources: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e, index) => {
    const newVideoContents = [...course.videoContents];
    newVideoContents[index].file = e.target.files[0];
    setCourse({ ...course, videoContents: newVideoContents });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to save course details, e.g., sending data to the backend
    console.log('Course Created:', course);
  };

  return (
    <div className="create-course-page">
      <h1 id="abc"> <b>Create a New Course</b></h1>
      <form className="create-course-form" onSubmit={handleSubmit}>

        {/* Course Title */}
        <label>Course Title</label>
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleInputChange}
          placeholder="Enter course title"
          required
        />

        {/* Course Description */}
        <label>Course Description</label>
        <textarea
          name="description"
          value={course.description}
          onChange={handleInputChange}
          placeholder="Describe the course"
          required
        ></textarea>

        {/* Course Price */}
        <label>Course Price ($)</label>
        <input
          type="number"
          name="price"
          value={course.price}
          onChange={handleInputChange}
          placeholder="Enter course price"
          required
        />

        {/* Course Category */}
        <label>Category</label>
        <select
          name="category"
          value={course.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Development">Development</option>
          <option value="Business">Business</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>

        {/* Course Level */}
        <label>Level</label>
        <select
          name="level"
          value={course.level}
          onChange={handleInputChange}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Video Content Inputs */}
        <label>Video Content</label>
        {course.videoContents.map((video, index) => (
          <div key={index} className="video-input">
            <div className="video-input-row">
              <input
                type="text"
                className="video-label-input"
                placeholder="Video Label"
                value={video.label}
                onChange={(e) => handleLabelChange(e, index)}
                required
              />
              <input
                type="file"
                className="video-file-input"
                accept="video/*"
                onChange={(e) => handleFileChange(e, index)}
                required
              />
              <button
                type="button"
                className="delete-video-button"
                onClick={() => deleteVideoInput(index)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="add-video-button" onClick={addVideoInput}>
          <FaPlusCircle /> Add Another Video
        </button>

        {/* Additional Resources */}
        <label>Additional Resources (PDF, docs, etc.)</label>
        <input
          type="file"
          name="resources"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
        />

        {/* Course Thumbnail */}
        <label>Course Thumbnail</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          required
        />

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          <FaSave /> Save Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
