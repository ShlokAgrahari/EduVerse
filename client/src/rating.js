import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import './rating.css';

const RatingPage = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    console.log('Submitted:', { rating, review });
    onClose();
  };

  return (
    <div className="rating-modal-overlay">
      <div className="rating-modal-container">
        <button 
          className="rating-close-button" 
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="rating-section">
          <h2>Rate Your Experience</h2>
          <div className="star-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={36}
                fill={star <= (hoveredRating || rating) ? '#6366f1' : 'none'}

                className={`star-icon ${star <= (hoveredRating || rating) ? 'active' : ''}`}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div className="review-section">
          <h3>Share Your Thoughts</h3>
          <textarea
            placeholder="What did you like or dislike about this course?"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="button-section">
        
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
            </button>
        </div>
        
        
      </div>
    </div>
  );
};

export default RatingPage;
