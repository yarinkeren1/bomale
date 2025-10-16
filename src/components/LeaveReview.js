import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomReviewForm from './CustomReviewForm';
import './LeaveReview.css';

const LeaveReview = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/reviews');
  };

  return (
    <div className="leave-review-page">
      <div className="review-form-wrapper">
        <CustomReviewForm onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default LeaveReview;
