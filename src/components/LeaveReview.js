import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import './LeaveReview.css';

const LeaveReview = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = async (newReview) => {
    // Add the new review to the beginning of the reviews array
    setReviews(prevReviews => [newReview, ...prevReviews]);
    
    // In a real application, you would send this to your backend
    console.log('New review submitted:', newReview);
    
    // Save to localStorage for persistence
    const existingReviews = JSON.parse(localStorage.getItem('bomale-reviews') || '[]');
    const updatedReviews = [newReview, ...existingReviews];
    localStorage.setItem('bomale-reviews', JSON.stringify(updatedReviews));
    
    // Navigate back to reviews page after successful submission
    setTimeout(() => {
      navigate('/reviews');
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/reviews');
  };

  return (
    <div className="leave-review-page">
      <div className="page-header">
        <button 
          className="back-button"
          onClick={() => navigate('/reviews')}
        >
          ← Back to Reviews
        </button>
      </div>
      
      <div className="review-form-wrapper">
        <ReviewForm 
          onReviewSubmit={handleReviewSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default LeaveReview;
