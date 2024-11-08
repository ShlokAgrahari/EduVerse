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
    videoContents: [{ label: '', file: null }], 

    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };
  
  const handleFileChange = (e, field) => {
    setCourse({ ...course, [field]: e.target.files[0] });
  };
  

  const handleVideoFileChange = (e, index) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(course)
    const fdata = new FormData();
    fdata.append('title', course.title);
    fdata.append('description', course.description);
    fdata.append('pricing', course.price); 
    fdata.append('category', course.category);
    fdata.append('level', course.level);
    console.log(course.image)
    if (course.image) fdata.append('image', course.image); 
  
    // Append video contents
    course.videoContents.forEach((video, index) => {
      if (video.file) {
        console.log(video.label)
        fdata.append(`videoContents`, video.file);
        fdata.append(`videoContents[${index}]`, video.label);
      }
    }
  );
  console.log(fdata)
  
    try {
      const response = await fetch('http://localhost:8000/instructor/newcourse', {
        method: 'POST',
        credentials:'include',
        body: fdata,
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to create course');
      }
      const data = await response.json();
      console.log(data.lectures); 

      console.log('Data:', data);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  

  return (
    <div className="create-course-page">
      <h1 id="abc"> <b>Create a New Course</b></h1>
      <form className="create-course-form" onSubmit={handleSubmit}>

       
        <label>Course Title</label>
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleInputChange}
          placeholder="Enter course title"
          required
        />

        
        <label>Course Description</label>
        <textarea
          name="description"
          value={course.description}
          onChange={handleInputChange}
          placeholder="Describe the course"
          required
        ></textarea>

       
        <label>Course Price ($)</label>
        <input
          type="number"
          name="price"
          value={course.price}
          onChange={handleInputChange}
          placeholder="Enter course price"
          required
        />

       
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
                onChange={(e) => handleVideoFileChange(e, index)}
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


        
        <label>Course Thumbnail</label>
<input
  type="file"
  name="image"
  onChange={(e) => handleFileChange(e, 'image')}
  accept="image/*"
  required
/>


       
        <button type="submit" className="submit-button">
          <FaSave /> Save Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
