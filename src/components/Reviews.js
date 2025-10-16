import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([
    // Sample review data - you can replace this with real reviews later
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      text: "The spinach and feta boureka is absolutely incredible! Perfectly crispy on the outside and deliciously cheesy inside. A must-try!",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "David K.",
      rating: 5,
      text: "Best food truck in the area! The baklava is heavenly and the service is always friendly. Highly recommend!",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Maria L.",
      rating: 4,
      text: "Love the variety of flavors. The potato boureka was amazing. Will definitely be back for more!",
      date: "2 weeks ago"
    },
    {
      id: 4,
      name: "James R.",
      rating: 5,
      text: "Authentic flavors that remind me of my grandmother's cooking. The cheese boureka is out of this world!",
      date: "3 weeks ago"
    },
    {
      id: 5,
      name: "Lisa T.",
      rating: 5,
      text: "Found this gem while walking downtown. The chocolate boureka is a perfect sweet treat. Amazing quality!",
      date: "1 month ago"
    },
    {
      id: 6,
      name: "Mike C.",
      rating: 4,
      text: "Great food and reasonable prices. The eggplant boureka is my favorite. Friendly staff too!",
      date: "1 month ago"
    }
  ]);

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
      <div className="reviews-header">
        <h1>Customer Reviews</h1>
        <p>See what our amazing customers are saying about BOMA'LE</p>
      </div>
      
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
            <p className="review-text">"{review.text}"</p>
          </div>
        ))}
      </div>
      
      <div className="reviews-cta">
        <h2>Love Our Food?</h2>
        <p>We'd love to hear from you! Leave us a review or visit us at our food truck.</p>
        <button 
          className="leave-review-button"
          onClick={() => navigate('/leave-review')}
        >
          Leave a Review
        </button>
      </div>
    </div>
  );
};

export default Reviews;
