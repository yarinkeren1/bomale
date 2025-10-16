import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  // Load reviews from localStorage on component mount
  React.useEffect(() => {
    const savedReviews = localStorage.getItem('bomale-reviews');
    if (savedReviews) {
      const parsedReviews = JSON.parse(savedReviews);
      setReviews(prevReviews => [...parsedReviews, ...prevReviews]);
    }
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="reviews-container">
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3>{review.name}</h3>
              <div className="review-rating">
                {renderStars(review.rating)}
                <span className="review-date">{review.date}</span>
              </div>
            </div>
            <p className="review-text">"{review.review}"</p>
          </div>
        ))}
      </div>
      
      <div className="reviews-cta">
        <h2>Love Our Food?</h2>
        <p>We'd love to hear from you! Leave us a review or visit us at our food truck.</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/leave-review')}
        >
          Leave a Review
        </button>
      </div>
      
        <div className="other-reviews-section">
          <h2>What's Everyone Saying?</h2>
        {reviews.length > 0 ? (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <h3>{review.name}</h3>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <p className="review-text">"{review.review}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews-message">Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
