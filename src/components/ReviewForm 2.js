import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ onReviewSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    review: '',
    foodItem: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const foodItems = [
    'Cheese Boureka',
    'Spinach & Feta Boureka',
    'Potato Boureka',
    'Eggplant Boureka',
    'Chocolate Boureka',
    'Baklava',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
    
    if (errors.rating) {
      setErrors(prev => ({
        ...prev,
        rating: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.review.trim()) {
      newErrors.review = 'Please write a review';
    } else if (formData.review.trim().length < 10) {
      newErrors.review = 'Review must be at least 10 characters long';
    }

    if (!formData.foodItem) {
      newErrors.foodItem = 'Please select a food item';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new review object
      const newReview = {
        id: Date.now(), // Simple ID generation
        name: formData.name.trim(),
        rating: parseInt(formData.rating),
        text: formData.review.trim(),
        date: 'Just now',
        foodItem: formData.foodItem
      };

      // Call the parent component's submit handler
      if (onReviewSubmit) {
        await onReviewSubmit(newReview);
      }

      // Show success message
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        rating: 0,
        review: '',
        foodItem: ''
      });

      // Hide success message after 3 seconds and close form
      setTimeout(() => {
        setIsSubmitted(false);
        if (onCancel) {
          onCancel();
        }
      }, 3000);

    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="star-input">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= formData.rating ? 'filled' : ''}`}
            onClick={() => handleRatingChange(star)}
            onMouseEnter={() => handleRatingChange(star)}
          >
            ★
          </span>
        ))}
        <span className="rating-text">
          {formData.rating === 0 ? 'Select rating' : 
           formData.rating === 1 ? 'Poor' :
           formData.rating === 2 ? 'Fair' :
           formData.rating === 3 ? 'Good' :
           formData.rating === 4 ? 'Very Good' : 'Excellent'}
        </span>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="review-form-success">
        <div className="success-icon">✓</div>
        <h3>Thank you for your review!</h3>
        <p>Your feedback helps us serve you better. We appreciate your time!</p>
      </div>
    );
  }

  return (
    <div className="review-form-container">
      <div className="review-form-header">
        <div className="form-header-top">
          <h2>Share Your Experience</h2>
          {onCancel && (
            <button 
              className="cancel-button"
              onClick={onCancel}
              type="button"
            >
              ✕
            </button>
          )}
        </div>
        <p>We'd love to hear about your visit to BOMA'LE!</p>
      </div>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Rating *</label>
          {renderStars()}
          {errors.rating && <span className="error-message">{errors.rating}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="foodItem">What did you try? *</label>
          <select
            id="foodItem"
            name="foodItem"
            value={formData.foodItem}
            onChange={handleInputChange}
            className={errors.foodItem ? 'error' : ''}
          >
            <option value="">Select a food item</option>
            {foodItems.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          {errors.foodItem && <span className="error-message">{errors.foodItem}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="review">Your Review *</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            className={errors.review ? 'error' : ''}
            placeholder="Tell us about your experience at BOMA'LE..."
            rows="5"
          />
          <div className="char-count">{formData.review.length}/500 characters</div>
          {errors.review && <span className="error-message">{errors.review}</span>}
        </div>

        {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
