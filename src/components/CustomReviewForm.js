import React, { useState } from 'react';
import './CustomReviewForm.css';

const CustomReviewForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rating: 0,
    review: '',
    foodItem: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const foodItems = [
    'Cheese Boureka',
    'Spinach & Feta Boureka', 
    'Potato Boureka',
    'Eggplant Boureka',
    'Chocolate Boureka',
    'Baklava',
    'Other'
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Please enter your name';
        }
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        if (!nameRegex.test(value)) {
          return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return '';
      
      case 'email':
        // Email is optional, but if provided, it must be valid
        if (value.trim()) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|edu|gov|io|net|co|uk|ca|au|de|fr|jp|in|br|mx|es|it|nl|se|no|dk|fi|pl|ru|cn|kr|tw|hk|sg|my|th|ph|id|vn|za|ng|eg|ma|ke|gh|tz|ug|rw|et|dz|tn|ly|sd|so|dj|km|mg|mu|sc|re|yt|bw|sz|ls|na|zm|mw|ao|mz|zw|il)$/i;
          if (!emailRegex.test(value)) {
            return 'Please enter a valid email address with a recognized domain (.com, .org, .edu, etc.)';
          }
        }
        return '';
      
      case 'phone':
        // Phone is optional, but if provided, must be exactly 10 digits
        if (value.trim()) {
          // Remove all non-digit characters for validation
          const digitsOnly = value.replace(/\D/g, '');
          if (digitsOnly.length === 0 || digitsOnly.length !== 10) {
            return 'Please enter a valid phone number';
          }
        }
        return '';
      
      case 'foodItem':
        if (!value.trim()) {
          return 'Please enter what you tried';
        }
        return '';
      
      case 'review':
        if (!value.trim()) {
          return 'Please write a review';
        } else if (value.trim().length < 10) {
          return 'Review must be at least 10 characters long';
        }
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone number - only allow digits and common formatting characters
    if (name === 'phone') {
      // Only allow digits, spaces, dashes, parentheses, plus sign, and dots
      const phoneValue = value.replace(/[^\d\s\-().+]/g, '');
      
      // Count only the digits
      const digitsOnly = phoneValue.replace(/\D/g, '');
      
      // Don't allow more than 10 digits
      if (digitsOnly.length > 10) {
        return; // Don't update state if more than 10 digits
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: phoneValue
      }));
      
      // Validate immediately for phone
      if (hasAttemptedSubmit) {
        const errorMessage = validateField(name, phoneValue);
        setErrors(prev => ({
          ...prev,
          [name]: errorMessage
        }));
      } else {
        if (errors[name]) {
          setErrors(prev => ({
            ...prev,
            [name]: ''
          }));
        }
      }
    } else {
      // Normal handling for other fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Only show validation errors after user has attempted to submit
      if (hasAttemptedSubmit) {
        const errorMessage = validateField(name, value);
        setErrors(prev => ({
          ...prev,
          [name]: errorMessage
        }));
      } else {
        // Clear error when user starts typing (before any submit attempt)
        if (errors[name]) {
          setErrors(prev => ({
            ...prev,
            [name]: ''
          }));
        }
      }
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
    
    // Only show validation errors after user has attempted to submit
    if (hasAttemptedSubmit) {
      const errorMessage = rating === 0 ? 'Please select a rating' : '';
      setErrors(prev => ({
        ...prev,
        rating: errorMessage
      }));
    } else {
      // Clear error when user selects rating (before any submit attempt)
      if (errors.rating) {
        setErrors(prev => ({
          ...prev,
          rating: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check for empty fields first
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else {
      // Name validation - no numbers allowed (same as contact form)
      const nameRegex = /^[a-zA-Z\s'-]+$/;
      if (!nameRegex.test(formData.name)) {
        newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
      }
    }

    // Email is optional, but if provided, it must be valid
    if (formData.email.trim()) {
      // Email validation - must have valid domain and common extensions (same as contact form)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|edu|gov|io|net|co|uk|ca|au|de|fr|jp|in|br|mx|es|it|nl|se|no|dk|fi|pl|ru|cn|kr|tw|hk|sg|my|th|ph|id|vn|za|ng|eg|ma|ke|gh|tz|ug|rw|et|dz|tn|ly|sd|so|dj|km|mg|mu|sc|re|yt|bw|sz|ls|na|zm|mw|ao|mz|zw|il)$/i;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address with a recognized domain (.com, .org, .edu, etc.)';
      }
    }

    // Phone is optional, but if provided, must be exactly 10 digits
    if (formData.phone.trim()) {
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length === 0 || digitsOnly.length !== 10) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.review.trim()) {
      newErrors.review = 'Please write a review';
    } else if (formData.review.trim().length < 10) {
      newErrors.review = 'Review must be at least 10 characters long';
    }

    if (!formData.foodItem.trim()) {
      newErrors.foodItem = 'Please enter what you tried';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToGoogleForm = async (formData) => {
    try {
      // Google Form submission endpoint
      const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdER-0c0J-8Z_s79AmHetHEgydb_gI56X-mBaAuRDi6leXeiw/formResponse';
      
      // Create form data object with actual entry IDs from your Google Form
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('entry.967507436', formData.name); // Name field
      formDataToSubmit.append('entry.1569958264', formData.email); // Email field
      if (formData.phone) {
        console.log('Phone number being submitted:', formData.phone);
        formDataToSubmit.append('entry.263506034', formData.phone); // Phone field
      }
      formDataToSubmit.append('entry.1897296947', formData.rating); // Rating field
      formDataToSubmit.append('entry.633479757', formData.foodItem); // Food item field
      formDataToSubmit.append('entry.322311345', formData.review); // Review field
      
      console.log('Form data being submitted:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        rating: formData.rating,
        foodItem: formData.foodItem,
        review: formData.review
      });

      // Submit to Google Form
      const response = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Forms
        body: formDataToSubmit
      });

      console.log('Form submitted to Google Forms');
      return true;
    } catch (error) {
      console.error('Error submitting to Google Form:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark that user has attempted to submit
    setHasAttemptedSubmit(true);
    
    // Validate form and get errors
    const newErrors = {};
    
    // Check for empty fields first
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else {
      // Name validation - no numbers allowed (same as contact form)
      const nameRegex = /^[a-zA-Z\s'-]+$/;
      if (!nameRegex.test(formData.name)) {
        newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
      }
    }

    // Email is optional, but if provided, it must be valid
    if (formData.email.trim()) {
      // Email validation - must have valid domain and common extensions (same as contact form)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|edu|gov|io|net|co|uk|ca|au|de|fr|jp|in|br|mx|es|it|nl|se|no|dk|fi|pl|ru|cn|kr|tw|hk|sg|my|th|ph|id|vn|za|ng|eg|ma|ke|gh|tz|ug|rw|et|dz|tn|ly|sd|so|dj|km|mg|mu|sc|re|yt|bw|sz|ls|na|zm|mw|ao|mz|zw|il)$/i;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address with a recognized domain (.com, .org, .edu, etc.)';
      }
    }

    // Phone is optional, but if provided, must be exactly 10 digits
    if (formData.phone.trim()) {
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length === 0 || digitsOnly.length !== 10) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.review.trim()) {
      newErrors.review = 'Please write a review';
    } else if (formData.review.trim().length < 10) {
      newErrors.review = 'Review must be at least 10 characters long';
    }

    if (!formData.foodItem.trim()) {
      newErrors.foodItem = 'Please enter what you tried';
    }

    // Set errors and check if form is valid
    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      console.log('Form has errors, stopping submission');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Google Form
      await submitToGoogleForm(formData);

      // Show success message
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        rating: 0,
        review: '',
        foodItem: ''
      });

      // Hide success message and close form after 3 seconds
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
          >
            ★
          </span>
        ))}
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
    <div className="custom-review-form-container">
      <form onSubmit={handleSubmit} className="custom-review-form">
        {onCancel && (
          <button 
            className="cancel-button"
            onClick={onCancel}
            type="button"
          >
            ✕
          </button>
        )}
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
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
          {/* Debug: {JSON.stringify(errors)} */}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
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

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? 'error' : ''}
            placeholder="Enter your phone number"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Rating</label>
          {renderStars()}
          {errors.rating && <span className="error-message">{errors.rating}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="foodItem">What did you try?</label>
          <input
            type="text"
            id="foodItem"
            name="foodItem"
            value={formData.foodItem}
            onChange={handleInputChange}
            className={errors.foodItem ? 'error' : ''}
            placeholder="e.g cheese boureka, baklava boureka, limonana, etc"
          />
          {errors.foodItem && <span className="error-message">{errors.foodItem}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="review">Your Review</label>
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
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default CustomReviewForm;
