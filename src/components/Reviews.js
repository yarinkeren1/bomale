import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from Google Sheets API
  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        
        // Google Apps Script web app URL
        const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbydEmV2Q0h3Q6b8Cxf6poK4NERbNifATj7dbvph4FYZvL0C13RZWTwaz2L8gadTDjP3/exec';
        
        const response = await fetch(GOOGLE_SHEETS_API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform Google Sheets data to match our review format
        const formattedReviews = data.reviews
          .filter(review => review.name && review.review && review.rating) // Filter out empty rows
          .map((review, index) => ({
            id: `google-review-${index}`,
            name: review.name,
            email: review.email || '',
            rating: parseInt(review.rating) || 5,
            review: review.review,
            foodItem: review.foodItem || '',
            date: new Date(review.timestamp || Date.now()).toLocaleDateString()
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
        
        setReviews(formattedReviews);
        setError(null);
        
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
        
        // Fallback to localStorage if API fails
        const savedReviews = localStorage.getItem('bomale-reviews');
        if (savedReviews) {
          const parsedReviews = JSON.parse(savedReviews);
          setReviews(parsedReviews);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
    
    // Refresh reviews every 5 minutes
    const interval = setInterval(fetchReviews, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
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
      {loading && (
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p>Loading reviews...</p>
        </div>
      )}
      
      {error && (
        <div className="error-section">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Try Again
          </button>
        </div>
      )}
      
      {!loading && !error && (
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
      )}
      
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
                <p className="review-text">"{review.text}"</p>
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
