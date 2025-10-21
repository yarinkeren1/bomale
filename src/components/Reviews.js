import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';
import { fetchReviewsFromSheets } from '../services/reviewsService';

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Ariel',
      rating: 5,
      item: 'eggplant zaatar Bourekas',
      review: 'as someone who NEVER eats eggplant, it\'s really something that\'s worth the trip'
    },
    {
      id: 2,
      name: 'Yarin',
      rating: 5,
      item: 'limonana',
      review: 'coming from Israel, I always look for limonana and things that remind me of home wherever I go and I found that here'
    },
    {
      id: 3,
      name: 'Matan',
      rating: 5,
      item: 'limonana and cheese bourekas',
      review: 'I grew up eating bourekas all the time and this place really brings me back, will for sure be back'
    },
    {
      id: 4,
      name: 'May',
      rating: 5,
      item: 'bourekas',
      review: 'Like no other Borekas I tried, tastes delicious, not greasy, highly recommend'
    },
    {
      id: 5,
      name: 'Alona',
      rating: 5,
      item: 'bourekas',
      review: 'Boma\'le is the best burekas ! I love the crunch , unique and warm taste of home  , fresh made and baked .  Perfect buffet set up , excellent  service ! Thank you it was a joy !!!'
    },
    {
      id: 6,
      name: 'Amy',
      rating: 5,
      item: 'bourekas and limonana',
      review: 'Such delicious bourekas wow ! Especially with all the sides, the combinations are so good and go very well together. And the Limonana was my favorite drink so refreshing!'
    }
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [openedFromFullGallery, setOpenedFromFullGallery] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});

  // Function to get menu item name from image filename
  const getMenuItemName = (imageSrc) => {
    const filename = imageSrc.split('/').pop().toLowerCase();
    
    if (filename.includes('cheese-boureka')) {
      return 'Double Dairy';
    } else if (filename.includes('baklava-boureka')) {
      return 'Baklava Boureka';
    } else if (filename.includes('potato-boureka')) {
      return 'Golden Mash';
    } else if (filename.includes('eggplant-boureka')) {
      return 'Roasted Za\'atar';
    } else if (filename.includes('nutella-boureka')) {
      return 'Chocolate Crunch';
    } else if (filename.includes('egg')) {
      return 'Hard-Boiled Egg';
    } else if (filename.includes('israeli-salad')) {
      return 'Israeli Salad';
    } else if (filename.includes('pickles') || filename.includes('olives')) {
      return 'Pickles & Olives';
    } else if (filename.includes('resek')) {
      return 'Resek Agvaniyot';
    } else if (filename.includes('schug')) {
      return 'Green Schug';
    } else if (filename.includes('tchina')) {
      return 'Tahini';
    } else if (filename.includes('whipped-cream')) {
      return 'Whipped Cream';
    }
    
    return 'Bourekas';
  };

  // Image data - moved from Gallery component
  const images = [
    // Baklava Boureka
    { src: '/images/food/baklava-boureka-birdseye-closeup.JPG', alt: 'Baklava Boureka Closeup', category: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-birdseye.JPG', alt: 'Baklava Boureka Birdseye', category: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-closeup-1.JPG', alt: 'Baklava Boureka Closeup', category: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-closeup-2.JPG', alt: 'Baklava Boureka Closeup', category: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-regular-1.JPG', alt: 'Baklava Boureka Regular', category: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-regular.JPG', alt: 'Baklava Boureka Regular', category: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-split-1.JPG', alt: 'Baklava Boureka Split', category: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-split-2.JPG', alt: 'Baklava Boureka Split', category: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-split-3.JPG', alt: 'Baklava Boureka Split', category: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-split-birdseye.JPG', alt: 'Baklava Boureka Split Layers', category: 'Baklava Boureka' },
    
    // Double Dairy
    { src: '/images/food/cheese-boureka-birdseye-closeup-1.JPG', alt: 'Double Dairy Closeup', category: 'Double Dairy' },
    { src: '/images/food/cheese-boureka-birdseye.JPG', alt: 'Double Dairy Birdseye', category: 'Double Dairy' },
    { src: '/images/food/cheese-boureka-regular-1.JPG', alt: 'Double Dairy Regular', category: 'Double Dairy' },
    { src: '/images/food/cheese-boureka-regular-2.JPG', alt: 'Double Dairy Regular', category: 'Double Dairy' },
    { src: '/images/food/cheese-boureka-split-1.JPG', alt: 'Double Dairy Split', category: 'Double Dairy' },
    { src: '/images/food/cheese-boureka-split-2.JPG', alt: 'Double Dairy Split', category: 'Double Dairy' },
    { src: '/images/food/cheese-boureka-split-birdseye-1.JPG', alt: 'Double Dairy Split Layers', category: 'Double Dairy' },
    
    // Golden Mash
    { src: '/images/food/potato-boureka-birdseye.JPG', alt: 'Golden Mash Birdseye', category: 'Golden Mash' },
    { src: '/images/food/potato-boureka-regular-1.JPG', alt: 'Golden Mash Regular', category: 'Golden Mash' },
    { src: '/images/food/potato-boureka-regular-2.JPG', alt: 'Golden Mash Regular', category: 'Golden Mash' },
    
    // Roasted Za'atar
    { src: '/images/food/eggplant-boureka-1-birdseye.JPG', alt: 'Roasted Za\'atar Birdseye', category: 'Roasted Za\'atar' },
    { src: '/images/food/eggplant-boureka-regular-1.JPG', alt: 'Roasted Za\'atar Regular', category: 'Roasted Za\'atar' },
    { src: '/images/food/eggplant-boureka-regular-2.JPG', alt: 'Roasted Za\'atar Regular', category: 'Roasted Za\'atar' },
    { src: '/images/food/eggplant-boureka-split.JPG', alt: 'Roasted Za\'atar Split', category: 'Roasted Za\'atar' },
    
    // Chocolate Crunch
    { src: '/images/food/nutella-boureka-birdseye-closeup.JPG', alt: 'Chocolate Crunch Closeup', category: 'Chocolate Crunch' },
    { src: '/images/food/nutella-boureka-birdseye.JPG', alt: 'Chocolate Crunch Birdseye', category: 'Chocolate Crunch' },
    { src: '/images/food/nutella-boureka-closeup-1.JPG', alt: 'Chocolate Crunch Closeup', category: 'Chocolate Crunch' },
    { src: '/images/food/nutella-boureka-closeup-2.JPG', alt: 'Chocolate Crunch Closeup', category: 'Chocolate Crunch' },
    { src: '/images/food/nutella-boureka-regular-1.JPG', alt: 'Chocolate Crunch Regular', category: 'Chocolate Crunch' },
    { src: '/images/food/nutella-boureka-split-1.JPG', alt: 'Chocolate Crunch Split', category: 'Chocolate Crunch' },
    { src: '/images/food/nutella-boureka-split-birdseye.JPG', alt: 'Chocolate Crunch Split Layers', category: 'Chocolate Crunch' },
    { src: '/images/food/nutella-boureka-split-whippedcream-birdseye.JPG', alt: 'Chocolate Crunch with Whipped Cream', category: 'Chocolate Crunch' },
    
    // Packaging
    { src: '/images/food/cheese-boureka-packaging-birdseye.JPG', alt: 'Cheese Boureka Packaging', category: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-closeup-1.JPG', alt: 'Cheese Boureka Packaging Closeup', category: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-closeup-2.JPG', alt: 'Cheese Boureka Packaging Closeup', category: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-closeup-3.JPG', alt: 'Cheese Boureka Packaging Closeup', category: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-regular.JPG', alt: 'Cheese Boureka Packaging Regular', category: 'Packaging' },
    { src: '/images/food/eggplant-boureka-packaging-birdseye.JPG', alt: 'Eggplant Boureka Packaging', category: 'Packaging' },
    { src: '/images/food/eggplant-boureka-packaging-closeup.JPG', alt: 'Eggplant Boureka Packaging Closeup', category: 'Packaging' },
    { src: '/images/food/eggplant-boureka-pacakging-1.JPG', alt: 'Eggplant Boureka Packaging', category: 'Packaging' },
    { src: '/images/food/potato-boureka-packaging-birdseye.JPG', alt: 'Potato Boureka Packaging', category: 'Packaging' },
    { src: '/images/food/potato-boureka-packaging-regular.JPG', alt: 'Potato Boureka Packaging Regular', category: 'Packaging' },
    
    // Sides & Complements
    { src: '/images/food/israeli-salad.JPG', alt: 'Israeli Salad', category: 'Sides' },
    { src: '/images/food/pickles&olives.JPG', alt: 'Pickles & Olives', category: 'Sides' },
    { src: '/images/food/resek.JPG', alt: 'Resek', category: 'Sides' },
    { src: '/images/food/schug.JPG', alt: 'Schug', category: 'Sides' },
    { src: '/images/food/tchina.JPG', alt: 'Tchina', category: 'Sides' },
    { src: '/images/food/whipped-cream.JPG', alt: 'Whipped Cream', category: 'Sides' },
    { src: '/images/food/egg.JPG', alt: 'Egg', category: 'Sides' }
  ];

  // Function to shuffle array and get random selection
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get first 8 randomly selected images - memoized to prevent reshuffling on every render
  const featuredImages = useMemo(() => {
    return shuffleArray(images).slice(0, 8);
  }, []);

  // Load reviews from Google Sheets on component mount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        // Try to fetch reviews from Google Sheets
        const sheetsReviews = await fetchReviewsFromSheets(6, 5); // Get 6 latest 5-star reviews
        
        if (sheetsReviews && sheetsReviews.length > 0) {
          console.log('Loaded reviews from Google Sheets:', sheetsReviews);
          setReviews(sheetsReviews);
        } else {
          // Fallback: Try to load from localStorage
          const savedReviews = localStorage.getItem('bomale-reviews');
          if (savedReviews) {
            const parsedReviews = JSON.parse(savedReviews);
            setReviews(prevReviews => [...parsedReviews, ...prevReviews]);
          }
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        // Fallback to default reviews already in state
      }
    };

    loadReviews();
  }, []);

  // Gallery functions
  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const openFullGallery = () => {
    setShowFullGallery(true);
  };

  const closeFullGallery = () => {
    setShowFullGallery(false);
  };

  const getCurrentImageIndex = () => {
    return images.findIndex(img => img.src === selectedImage.src);
  };

  const goToPreviousImage = () => {
    const currentIndex = getCurrentImageIndex();
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setSelectedImage(images[previousIndex]);
  };

  const goToNextImage = () => {
    const currentIndex = getCurrentImageIndex();
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
  };

  const closeLightboxFromFullGallery = () => {
    setSelectedImage(null);
    setOpenedFromFullGallery(false);
    setShowFullGallery(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (selectedImage) {
        if (openedFromFullGallery) {
          closeLightboxFromFullGallery();
        } else {
          closeLightbox();
        }
      } else if (showFullGallery) {
        closeFullGallery();
      }
    } else if (selectedImage) {
      if (e.key === 'ArrowLeft') {
        goToPreviousImage();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      }
    }
  };

  React.useEffect(() => {
    if (selectedImage || showFullGallery) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage, showFullGallery]);

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

  // Function to check if review needs truncation (we'll use CSS for the actual truncation)
  const isReviewTruncated = (text) => {
    if (!text) return false;
    // Estimate if text is long enough to need truncation (roughly 4 lines)
    return text.length > 160;
  };

  // Function to toggle review expansion
  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  return (
    <div className="reviews-container">
      <div className="reviews-cta">
        <h2>Love Our Food?</h2>
        <p>We'd love to hear from you! Leave us a review or visit us at our next location!</p>
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
            {reviews.map((review) => {
              const isExpanded = expandedReviews[review.id];
              const isTruncated = isReviewTruncated(review.review);
              
              return (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <h3>{review.name}</h3>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                  <div className="review-text">
                    <p className={isTruncated && !isExpanded ? 'review-text-truncated' : ''}>"{review.review}"</p>
                    {isTruncated && (
                      <button 
                        className="read-more-btn"
                        onClick={() => toggleReviewExpansion(review.id)}
                      >
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="reviews-placeholder"></div>
        )}
      </div>
      
      {/* Image Gallery Section */}
      <div className="gallery-section">
        <h2>Gallery</h2>
        <p className="gallery-subtitle">Explore our delicious bourekas and fresh sides</p>
        
        <div className="gallery-grid featured-grid">
          {/* First 8 featured images */}
          {featuredImages.map((image, index) => (
            <div 
              key={`featured-${index}`} 
              className="gallery-item"
              onClick={() => openLightbox(image)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="gallery-overlay" style={{display: 'none'}}>
                <span className="gallery-category">{image.category}</span>
              </div>
              <div className="gallery-placeholder" style={{display: 'none', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f5f5f5', color: '#666'}}>
                <div style={{textAlign: 'center'}}>
                  <h4>{image.category}</h4>
                  <p>Image unavailable</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* 9th position - More Images button */}
          <div 
            className="gallery-item more-images-button"
            onClick={openFullGallery}
          >
            <div className="more-images-content">
              <div className="more-images-text">
                <div className="more-images-plus">+</div>
                <div className="more-images-label">more images</div>
              </div>
            </div>
          </div>
        </div>

        {selectedImage && (
          <div className="lightbox" onClick={openedFromFullGallery ? closeLightboxFromFullGallery : closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={openedFromFullGallery ? closeLightboxFromFullGallery : closeLightbox}>×</button>
              <button className="lightbox-nav lightbox-prev" onClick={goToPreviousImage}>‹</button>
              <button className="lightbox-nav lightbox-next" onClick={goToNextImage}>›</button>
              <img src={selectedImage.src} alt={selectedImage.alt} />
              <div className="lightbox-menu-item">
                {getMenuItemName(selectedImage.src)}
              </div>
            </div>
          </div>
        )}

        {showFullGallery && (
          <div className="full-gallery-modal" onClick={closeFullGallery}>
            <button className="full-gallery-close" onClick={closeFullGallery}>×</button>
            <div className="full-gallery-content" onClick={(e) => e.stopPropagation()}>
              <div className="full-gallery-grid">
                {images.map((image, index) => (
                  <div 
                    key={`full-${index}`} 
                    className="full-gallery-item"
                    onClick={() => {
                      setOpenedFromFullGallery(true);
                      closeFullGallery();
                      openLightbox(image);
                    }}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="full-gallery-overlay" style={{display: 'none'}}>
                      <span className="full-gallery-category">{image.category}</span>
                    </div>
                    <div className="full-gallery-placeholder" style={{display: 'none', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f5f5f5', color: '#666'}}>
                      <div style={{textAlign: 'center'}}>
                        <h4>{image.category}</h4>
                        <p>Image unavailable</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
